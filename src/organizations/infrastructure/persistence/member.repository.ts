import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../../domain/model/member.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserId } from '../../../shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../../domain/model/valueobjects/organization-id';
import { UserIsNotMemberOfOrganizationException } from '../../domain/exceptions/user-is-not-member-of-organization.exception';
import { MemberId } from '../../domain/model/valueobjects/member-id';
import { MemberNotFoundException } from '../../domain/exceptions/member-not-found.exception';
import { MemberName } from '../../domain/model/valueobjects/member-name';

@Injectable()
export class MemberRepository {
    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
    ) {}

    async save(member: Member): Promise<Member> {
        return await this.memberRepository.save(member);
    }

    async findByUserIdAndOrganizationId(
        userId: UserId,
        organizationId: OrganizationId,
    ): Promise<Member> {
        const member = await this.memberRepository.findOne({
            where: {
                userId: userId,
                organizationId: organizationId,
            },
        });

        if (member === null) {
            throw new UserIsNotMemberOfOrganizationException(
                userId,
                organizationId,
            );
        }

        return member;
    }

    async existsMemberByUserIdAndOrganizationId(
        userId: UserId,
        organizationId: OrganizationId,
    ): Promise<boolean> {
        const member = await this.memberRepository.exists({
            where: {
                userId: userId,
                organizationId: organizationId,
            },
        });

        return member;
    }

    async getMemberById(memberId: MemberId) {
        const member = await this.memberRepository.findOne({
            where: {
                id: memberId,
            },
        });

        if (member === null) {
            throw new MemberNotFoundException(memberId);
        }

        return member;
    }

    async getMembersByOrganizationId(organizationId: OrganizationId) {
        const members = await this.memberRepository.find({
            where: {
                organizationId: organizationId,
            },
        });

        return members;
    }

    async existsMemberByMemberName(
        orgnizationId: OrganizationId,
        name: MemberName,
    ) {
        return await this.memberRepository.exists({
            where: {
                organizationId: orgnizationId,
                name: name,
            },
        });
    }

    async existsMemberByOrganizationIdAndMemberId(
        memberId: MemberId,
        organizationId: OrganizationId,
    ) {
        return await this.memberRepository.exists({
            where: {
                id: memberId,
                organizationId: organizationId,
            },
        });
    }
}
