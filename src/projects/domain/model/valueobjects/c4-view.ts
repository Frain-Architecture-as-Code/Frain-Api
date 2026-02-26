import { C4Node } from './c4-node';
import { C4Relation } from './c4-relation';
import { ContainerInfo } from './container-info';
import { ViewType } from './view-type';

export class C4View {
    constructor(
        public readonly id: string,
        public readonly type: ViewType,
        public readonly container: ContainerInfo,
        public readonly name: string,
        public readonly nodes: C4Node[],
        public readonly externalNodes: C4Node[],
        public readonly relations: C4Relation[],
    ) {}
}
