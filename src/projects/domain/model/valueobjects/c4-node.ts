import { NodeType } from './node-type';

export class C4Node {
    constructor(
        public readonly id: string,
        public readonly type: NodeType,
        public readonly name: string,
        public readonly description: string,
        public readonly technology: string,
        public readonly viewId: string,
        public x: number,
        public y: number,
    ) {}
}
