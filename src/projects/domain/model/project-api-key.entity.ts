import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ProjectApiKeyId } from './valueobjects/project-api-key-id';
import { createValueObjectTransformer } from '../../../shared/infrastructure/persistence/typeorm/transformers';
import { ProjectId } from './valueobjects/project-id';
import { MemberId } from './valueobjects/member-id';
import { ApiKey } from './valueobjects/api-key';
import { AuditableEntity } from '../../../shared/domain/model/auditable-entity';

@Entity()
export class ProjectApiKeyEntity extends AuditableEntity {
    @PrimaryColumn({
        type: 'uuid',
        nullable: false,
        unique: true,
        transformer: createValueObjectTransformer(ProjectApiKeyId),
    })
    id: ProjectApiKeyId;

    @Column({
        type: 'uuid',
        nullable: false,
        transformer: createValueObjectTransformer(ProjectId),
    })
    projectId: ProjectId;

    @Column({
        type: 'uuid',
        nullable: false,
        transformer: createValueObjectTransformer(MemberId),
    })
    memberId: MemberId;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: false,
        unique: true,
        transformer: createValueObjectTransformer(ApiKey),
    })
    apiKey: ApiKey;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    lastUsedAt: Date;

    static create(params: {
        id: ProjectApiKeyId;
        projectId: ProjectId;
        memberId: MemberId;
        apiKey: ApiKey;
    }) {
        const entity = new ProjectApiKeyEntity();
        entity.id = params.id;
        entity.projectId = params.projectId;
        entity.memberId = params.memberId;
        entity.apiKey = params.apiKey;
        return entity;
    }
}
