export class C4Relation {
    constructor(
        public readonly sourceId: string,
        public readonly targetId: string,
        public readonly description: string,
        public readonly technology: string,
    ) {}
}
