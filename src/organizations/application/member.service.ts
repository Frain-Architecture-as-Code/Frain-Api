import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../domain/model/member.entity';
import { GetMemberByUserIdAndOrganizationIdQuery } from '../domain/model/queries/get-member-by-user-id-and-organization-id.query';
import { UserIsNotMemberOfOrganizationException } from '../domain/exceptions/user-is-not-member-of-organization.exception';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
    ) {}

    async getMemberByUserIdAndOrganizationId(
        query: GetMemberByUserIdAndOrganizationIdQuery,
    ): Promise<Member> {
        const member = await this.memberRepository.findOne({
            where: {
                userId: query.userId,
                organizationId: query.organizationId,
            },
        });

        if (member === null) {
            throw new UserIsNotMemberOfOrganizationException(
                query.userId,
                query.organizationId,
            );
        }

        return member;
    }
}
