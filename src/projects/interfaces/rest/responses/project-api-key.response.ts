export interface ProjectApiKeyResponse {
    id: string;
    projectId: string;
    memberId: string;
    apiKey: string;
    lastUsedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
