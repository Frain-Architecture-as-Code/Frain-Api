import { C4Model } from '../../../domain/model/valueobjects/c4-model';
import { C4Node } from '../../../domain/model/valueobjects/c4-node';
import { C4Relation } from '../../../domain/model/valueobjects/c4-relation';
import { C4View } from '../../../domain/model/valueobjects/c4-view';
import { ContainerInfo } from '../../../domain/model/valueobjects/container-info';
import { SetC4ModelCommand } from '../../../domain/model/commands/set-c4-model.command';
import { UpdateNodePositionCommand } from '../../../domain/model/commands/update-node-position.command';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { ProjectId } from '../../../domain/model/valueobjects/project-id';
import { SetC4ModelRequest } from '../requests/set-c4-model.request';
import { UpdateNodePositionRequest } from '../requests/update-node-position.request';

export class C4ModelCommandAssembler {
    static toSetC4ModelCommand(
        projectId: string,
        body: SetC4ModelRequest,
    ): SetC4ModelCommand {
        const c4Model = new C4Model(
            body.title,
            body.description,
            new Date(body.updatedAt),
            body.views.map(
                (v) =>
                    new C4View(
                        v.id,
                        v.type,
                        v.container
                            ? new ContainerInfo(
                                  v.container.name,
                                  v.container.description,
                                  v.container.technology,
                              )
                            : new ContainerInfo('', '', ''),
                        v.name,
                        v.nodes.map(
                            (n) =>
                                new C4Node(
                                    n.id,
                                    n.type,
                                    n.name,
                                    n.description,
                                    n.technology,
                                    n.viewId ?? '',
                                    n.x,
                                    n.y,
                                ),
                        ),
                        v.externalNodes.map(
                            (n) =>
                                new C4Node(
                                    n.id,
                                    n.type,
                                    n.name,
                                    n.description,
                                    n.technology,
                                    n.viewId ?? '',
                                    n.x,
                                    n.y,
                                ),
                        ),
                        v.relations.map(
                            (r) =>
                                new C4Relation(
                                    r.sourceId,
                                    r.targetId,
                                    r.description,
                                    r.technology ?? '',
                                ),
                        ),
                    ),
            ),
        );

        return new SetC4ModelCommand(
            ProjectId.fromString(projectId),
            OrganizationId.generate(), // Organization ID is not relevant for SDK endpoint
            c4Model,
        );
    }

    static toUpdateNodePositionCommand(
        projectId: string,
        viewId: string,
        nodeId: string,
        body: UpdateNodePositionRequest,
    ): UpdateNodePositionCommand {
        return new UpdateNodePositionCommand(
            ProjectId.fromString(projectId),
            viewId,
            nodeId,
            body.x,
            body.y,
        );
    }
}
