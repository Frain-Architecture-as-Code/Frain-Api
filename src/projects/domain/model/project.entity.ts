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
    public updateC4Model(c4Model: C4Model): void {
        this.c4Model = c4Model;
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
