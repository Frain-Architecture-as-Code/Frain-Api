import { Column, Entity, PrimaryColumn } from 'typeorm';
import { createValueObjectTransformer } from '../../../shared/infrastructure/persistence/typeorm/transformers';
import { ProjectId } from './valueobjects/project-id';
import { OrganizationId } from './valueobjects/organization-id';
import { ProjectVisibility } from './valueobjects/project-visibility';
import { C4Model } from './valueobjects/c4-model';
import { C4View } from './valueobjects/c4-view';
import { C4Node } from './valueobjects/c4-node';
import { ContainerInfo } from './valueobjects/container-info';
import { ViewType } from './valueobjects/view-type';
import { createC4ModelTransformer } from '../../infrastructure/persistence/transformers';
import { AuditableEntity } from '../../../shared/domain/model/auditable-entity';
import { C4Relation } from './valueobjects/c4-relation';

export interface ViewSummary {
    id: string;
    type: ViewType;
    name: string;
    container: ContainerInfo;
}

@Entity()
export class Project extends AuditableEntity {
    @PrimaryColumn({
        type: 'uuid',
        transformer: createValueObjectTransformer(ProjectId),
    })
    id: ProjectId;

    @Column({
        type: 'uuid',
        transformer: createValueObjectTransformer(OrganizationId),
    })
    organizationId: OrganizationId;

    @Column({
        type: 'enum',
        enum: ProjectVisibility,
        default: ProjectVisibility.PRIVATE,
    })
    visibility: ProjectVisibility;

    @Column({
        type: 'jsonb',
        nullable: true,
        transformer: createC4ModelTransformer(),
    })
    c4Model: C4Model | null;

    static create(props: {
        id: ProjectId;
        organizationId: OrganizationId;
        visibility: ProjectVisibility;
    }) {
        const project = new Project();
        project.id = props.id;
        project.organizationId = props.organizationId;
        project.visibility = props.visibility;
        project.c4Model = null;
        return project;
    }

    public update(props: { visibility: ProjectVisibility }) {
        this.visibility = props.visibility;
    }

    /**
     * Updates the entire C4Model.
     * Used when the SDK sends a complete new model.
     */
    public updateC4Model(incomingModel: C4Model): void {
        // 1. Si el proyecto es nuevo y no tiene modelo previo, aceptamos el payload tal cual
        if (this.c4Model === null) {
            this.c4Model = incomingModel;
            return;
        }

        // 2. Si ya existe un modelo en la Base de Datos, hacemos el MERGE para salvar los IDs
        const updatedViews = incomingModel.views.map((incomingView) => {
            // Buscar la vista vieja
            const existingView = this.c4Model!.views.find(
                (v) =>
                    v.name === incomingView.name &&
                    v.type === incomingView.type,
            );

            const viewId = existingView ? existingView.id : incomingView.id;
            const nodeIdTranslationMap = new Map<string, string>();

            const processNodes = (
                incomingNodes: C4Node[],
                existingNodes: C4Node[] = [],
            ): C4Node[] => {
                return incomingNodes.map((incomingNode) => {
                    const existingNode = existingNodes.find(
                        (n) =>
                            n.name === incomingNode.name &&
                            n.type === incomingNode.type,
                    );

                    let nodeId = incomingNode.id;

                    const finalX = incomingNode.x ?? existingNode?.x ?? 0;
                    const finalY = incomingNode.y ?? existingNode?.y ?? 0;

                    if (existingNode) {
                        nodeId = existingNode.id;
                    }

                    // Mapa de traducción para arreglar las relaciones
                    nodeIdTranslationMap.set(incomingNode.id, nodeId);

                    return new C4Node(
                        nodeId, // ID viejo rescatado de la BD o el nuevo
                        incomingNode.type,
                        incomingNode.name,
                        incomingNode.description,
                        incomingNode.technology,
                        viewId,
                        finalX, // Se guardan las nuevas coordenadas X
                        finalY, // Se guardan las nuevas coordenadas Y
                    );
                });
            };

            const updatedNodes = processNodes(
                incomingView.nodes,
                existingView?.nodes,
            );
            const updatedExternalNodes = processNodes(
                incomingView.externalNodes,
                existingView?.externalNodes,
            );

            const updatedRelations = incomingView.relations.map(
                (incomingRel) => {
                    const resolvedSourceId =
                        nodeIdTranslationMap.get(incomingRel.sourceId) ||
                        incomingRel.sourceId;
                    const resolvedTargetId =
                        nodeIdTranslationMap.get(incomingRel.targetId) ||
                        incomingRel.targetId;

                    return new C4Relation(
                        resolvedSourceId,
                        resolvedTargetId,
                        incomingRel.description,
                        incomingRel.technology,
                    );
                },
            );

            return new C4View(
                viewId,
                incomingView.type,
                incomingView.container,
                incomingView.name,
                updatedNodes,
                updatedExternalNodes,
                updatedRelations,
            );
        });

        // 3. Reemplazamos el modelo del proyecto con el modelo fusionado
        this.c4Model = new C4Model(
            incomingModel.title,
            incomingModel.description,
            incomingModel.updatedAt,
            updatedViews,
        );
    }

    /**
     * Gets a view by its ID.
     */
    public getViewById(viewId: string): C4View | undefined {
        if (!this.c4Model || !this.c4Model.views) {
            return undefined;
        }
        return this.c4Model.views.find((v) => v.id === viewId);
    }

    /**
     * Gets view summaries (basic info without nodes and relations).
     */
    public getViewSummaries(): ViewSummary[] {
        if (!this.c4Model || !this.c4Model.views) {
            return [];
        }
        return this.c4Model.views.map((view) => ({
            id: view.id,
            type: view.type,
            name: view.name,
            container: view.container,
        }));
    }

    /**
     * Updates a node's position within a view.
     * Performs an immutable transformation of the C4 model.
     */
    public updateNodePosition(
        viewId: string,
        nodeId: string,
        x: number,
        y: number,
    ): void {
        if (!this.c4Model || !this.c4Model.views) {
            throw new Error('C4Model or views not initialized');
        }

        const updatedViews = this.c4Model.views.map((view) => {
            if (view.id !== viewId) {
                return view;
            }

            const updatedNodes = this.updateNodeInList(
                view.nodes,
                nodeId,
                x,
                y,
            );
            const updatedExternalNodes = this.updateNodeInList(
                view.externalNodes,
                nodeId,
                x,
                y,
            );

            return new C4View(
                view.id,
                view.type,
                view.container,
                view.name,
                updatedNodes,
                updatedExternalNodes,
                view.relations,
            );
        });

        this.c4Model = new C4Model(
            this.c4Model.title,
            this.c4Model.description,
            new Date(),
            updatedViews,
        );
    }

    private updateNodeInList(
        nodes: C4Node[] | null,
        nodeId: string,
        x: number,
        y: number,
    ): C4Node[] {
        if (!nodes) {
            return [];
        }
        return nodes.map((node) => {
            if (node.id === nodeId) {
                return new C4Node(
                    node.id,
                    node.type,
                    node.name,
                    node.description,
                    node.technology,
                    node.viewId,
                    x,
                    y,
                );
            }
            return node;
        });
    }
}
