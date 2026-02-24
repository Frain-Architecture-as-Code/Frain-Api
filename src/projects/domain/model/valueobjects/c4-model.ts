import { C4View } from './c4-view';

export class C4Model {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly updatedAt: Date,
        public readonly views: C4View[],
    ) {}
}
