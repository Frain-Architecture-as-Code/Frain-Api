import { Column, Entity, PrimaryColumn } from 'typeorm';
import { createValueObjectTransformer } from '../../../shared/infrastructure/persistence/typeorm/transformers';
import { ProjectId } from './valueobjects/project-id';
import { OrganizationId } from './valueobjects/organization-id';
import { ProjectVisibility } from './valueobjects/project-visibility';
import { C4Model } from './valueobjects/c4-model';
import { createC4ModelTransformer } from '../../infrastructure/persistence/transformers';
import { AuditableEntity } from '../../../shared/domain/model/auditable-entity';

@Entity()
export class Project extends AuditableEntity {
    @PrimaryColumn({
        type: 'uuid',
        transformer: createValueObjectTransformer(ProjectId),
    })
    id: ProjectId;

    @Column({
        type: 'uuid',
        transformer: createValueObjectTransformer(OrganizationId),
    })
    organizationId: OrganizationId;

    @Column({
        type: 'enum',
        enum: ProjectVisibility,
        default: ProjectVisibility.PRIVATE,
    })
    visibility: ProjectVisibility;

    @Column({
        type: 'jsonb',
        nullable: false,
        transformer: createC4ModelTransformer(),
    })
    c4Model: C4Model;
}
