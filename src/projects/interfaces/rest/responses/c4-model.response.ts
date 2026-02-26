import { C4Model } from '../../../domain/model/valueobjects/c4-model';

export interface C4ModelResponse {
    projectId: string;
    c4Model: C4Model | null;
}
