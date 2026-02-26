export interface InvitationResponse {
    invitationId: string;
    targetEmail: string;
    role: string;
    organizationId: string;
    inviterId: string;
    createdAt: Date;
    updatedAt: Date;
}
