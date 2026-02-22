import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../domain/model/member.entity';
import { GetMemberByUserIdAndOrganizationIdQuery } from '../domain/model/queries/get-member-by-user-id-and-organization-id.query';
import { ExistsUserInOrganizationQuery } from '../domain/model/queries/exists-user-in-organization.query';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
    ) {}

    async getMemberByUserIdAndOrganizationId(
        query: GetMemberByUserIdAndOrganizationIdQuery,
    ): Promise<Member> {
        return await this.memberRepository.findOneOrFail({
            where: {
                userId: query.userId,
                organizationId: query.organizationId,
            },
        });
    }

    async existsUserInOrganization(
        query: ExistsUserInOrganizationQuery,
    ): Promise<boolean> {
        const member = await this.memberRepository.findOne({
            where: {
                userId: query.userId,
                organizationId: query.organizationId,
            },
        });

        return !!member;
    }
}
