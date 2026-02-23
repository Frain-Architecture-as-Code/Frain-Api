import { Entity, PrimaryColumn } from 'typeorm';
import { createValueObjectTransformer } from '../../../shared/infrastructure/persistence/typeorm/transformers';
import { ProjectId } from './valueobjects/project-id';

@Entity()
export class Project {
    @PrimaryColumn({
        type: 'uuid',
        transformer: createValueObjectTransformer(ProjectId),
    })
    id: ProjectId;
}
