import { C4Model } from '../../domain/model/valueobjects/c4-model';
import { C4Node } from '../../domain/model/valueobjects/c4-node';
import { C4Relation } from '../../domain/model/valueobjects/c4-relation';
import { C4View } from '../../domain/model/valueobjects/c4-view';
import { ContainerInfo } from '../../domain/model/valueobjects/container-info';

export const createC4ModelTransformer = () => {
    return {
        to: (value: C4Model | null): any => {
            if (value === null) {
                return null;
            }
            return {
                title: value.title,
                description: value.description,
                updatedAt: value.updatedAt,
                views: value.views,
            };
        },
        from: (value: C4Model | null): C4Model | null => {
            if (value === null) {
                return null;
            }
            return new C4Model(
                value.title,
                value.description,
                new Date(value.updatedAt),
                value.views.map(
                    (view: C4View) =>
                        new C4View(
                            view.id,
                            view.type,
                            new ContainerInfo(
                                view.container.name,
                                view.container.description,
                                view.container.technology,
                            ),
                            view.name,
                            view.nodes.map(
                                (n: C4Node) =>
                                    new C4Node(
                                        n.id,
                                        n.type,
                                        n.name,
                                        n.description,
                                        n.technology,
                                        n.viewId,
                                        n.x,
                                        n.y,
                                    ),
                            ),
                            view.externalNodes.map(
                                (n: C4Node) =>
                                    new C4Node(
                                        n.id,
                                        n.type,
                                        n.name,
                                        n.description,
                                        n.technology,
                                        n.viewId,
                                        n.x,
                                        n.y,
                                    ),
                            ),
                            view.relations.map(
                                (r: C4Relation) =>
                                    new C4Relation(
                                        r.sourceId,
                                        r.targetId,
                                        r.description,
                                        r.technology,
                                    ),
                            ),
                        ),
                ),
            );
        },
    };
};
