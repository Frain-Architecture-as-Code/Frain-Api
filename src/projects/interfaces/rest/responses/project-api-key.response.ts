export interface ProjectApiKeyResponse {
    id: string;
    projectId: string;
    memberId: string;
    apiKeySecret: string;
    lastUsedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
