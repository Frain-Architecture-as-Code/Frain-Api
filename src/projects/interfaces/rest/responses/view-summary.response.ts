import { ContainerInfo } from '../../../domain/model/valueobjects/container-info';
import { ViewType } from '../../../domain/model/valueobjects/view-type';

export interface ViewSummaryResponse {
    id: string;
    type: ViewType;
    name: string;
    container: ContainerInfo;
}
