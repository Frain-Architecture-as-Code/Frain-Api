import { C4Node } from '../../../domain/model/valueobjects/c4-node';
import { C4Relation } from '../../../domain/model/valueobjects/c4-relation';
import { ContainerInfo } from '../../../domain/model/valueobjects/container-info';
import { ViewType } from '../../../domain/model/valueobjects/view-type';

export interface ViewDetailResponse {
    id: string;
    type: ViewType;
    name: string;
    container: ContainerInfo;
    nodes: C4Node[];
    externalNodes: C4Node[];
    relations: C4Relation[];
}
