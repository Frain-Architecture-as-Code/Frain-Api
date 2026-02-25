import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ProjectApiKeyId } from './valueobjects/project-api-key-id';
import { createValueObjectTransformer } from '../../../shared/infrastructure/persistence/typeorm/transformers';
import { ProjectId } from './valueobjects/project-id';
import { MemberId } from './valueobjects/member-id';
import { ApiKeySecret } from './valueobjects/api-key-secret';
import { AuditableEntity } from '../../../shared/domain/model/auditable-entity';

@Entity()
export class ProjectApiKey extends AuditableEntity {
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
        transformer: createValueObjectTransformer(ApiKeySecret),
    })
    apiKeySecret: ApiKeySecret;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    lastUsedAt: Date;

    static create(params: {
        id: ProjectApiKeyId;
        projectId: ProjectId;
        memberId: MemberId;
        apiKeySecret: ApiKeySecret;
    }) {
        const entity = new ProjectApiKey();
        entity.id = params.id;
        entity.projectId = params.projectId;
        entity.memberId = params.memberId;
        entity.apiKeySecret = params.apiKeySecret;
        return entity;
    }

    public hideSecret(): ProjectApiKey {
        const entity = ProjectApiKey.create({
            id: this.id,
            projectId: this.projectId,
            memberId: this.memberId,
            apiKeySecret: ApiKeySecret.redacted(),
        });

        entity.lastUsedAt = this.lastUsedAt;
        entity.createdAt = this.createdAt;
        entity.updatedAt = this.updatedAt;

        return entity;
    }
}
