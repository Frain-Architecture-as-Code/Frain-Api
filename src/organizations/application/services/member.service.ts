import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../../domain/model/member.entity';
import { GetMemberByUserIdAndOrganizationIdQuery } from '../../domain/model/queries/get-member-by-user-id-and-organization-id.query';
import { UserIsNotMemberOfOrganizationException } from '../../domain/exceptions/user-is-not-member-of-organization.exception';
import { GetOrganizationMembersQuery } from '../../domain/model/queries/get-organization-members.query';
import { UpdateMemberCommand } from '../../domain/model/commands/update-member.command';
import { GetMemberByIdQuery } from '../../domain/model/queries/get-member-by-id.query';
import { MemberNotFoundException } from '../../domain/exceptions/member-not-found.exception';
import { InsufficientPermissionException } from '../../../shared/domain/exceptions/insufficient-permission.exception';
import { InvalidUpdateMemberRequestException } from '../../domain/exceptions/invalid-update-member-request.exception';
import { EnrollMemberToOrganizationCommand } from '../../domain/model/commands/enroll-member-to-organization.command';
import { MemberId } from '../../domain/model/valueobjects/member-id';
import { MemberName } from '../../domain/model/valueobjects/member-name';
import { ExistsUserInOrganizationQuery } from '../../domain/model/queries/exists-user-in-organization.query';
import { MemberAlreadyExistsException } from '../../domain/exceptions/member-already-exists.exception';
import { ExistsMemberInOrganizationQuery } from '../../domain/model/queries/exists-member-in-organization.query';

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

    async existsUserInOrganization(
        query: ExistsUserInOrganizationQuery,
    ): Promise<boolean> {
        const member = await this.memberRepository.findOne({
            where: {
                userId: query.userId,
                organizationId: query.organizationId,
            },
        });

        return member !== null;
    }

    async getMemberById(query: GetMemberByIdQuery): Promise<Member> {
        const member = await this.memberRepository.findOne({
            where: {
                id: query.memberId,
            },
        });

        if (member === null) {
            throw new MemberNotFoundException(query.memberId);
        }

        return member;
    }

    async getOrganizationMembers(
        query: GetOrganizationMembersQuery,
    ): Promise<Member[]> {
        // Validates if the current user is a member of the organization
        await this.getMemberByUserIdAndOrganizationId({
            organizationId: query.organizationId,
            userId: query.userId,
        });

        const members = await this.memberRepository.find({
            where: {
                organizationId: query.organizationId,
            },
        });

        return members;
    }

    async updateMember(command: UpdateMemberCommand): Promise<Member> {
        if (
            (command.newMemberName === undefined && command.newMemberRole) ===
            undefined
        ) {
            throw new BadRequestException('Invalid update member request');
        }

        // We make sure that the current user is a member of the organization
        const currentMember = await this.getMemberByUserIdAndOrganizationId({
            organizationId: command.organizationId,
            userId: command.user.id,
        });

        const targetMember = await this.getMemberById({
            memberId: command.toUpdatememberId,
        });

        if (command.newMemberName) {
            const existsAlreadyAMemberWithNewName =
                await this.memberRepository.findOne({
                    where: {
                        organizationId: command.organizationId,
                        name: command.newMemberName,
                    },
                });

            if (existsAlreadyAMemberWithNewName) {
                throw new InvalidUpdateMemberRequestException(
                    command.newMemberName,
                );
            }
        }

        if (currentMember.id.equals(targetMember.id)) {
            // a member only can update their name, even if its the owner.
            targetMember.update(command.newMemberName, undefined);
            await this.memberRepository.save(targetMember);

            if (command.newMemberRole) {
                throw new InsufficientPermissionException(
                    `You cannot update your own role. Updating to: ${command.newMemberRole}.`,
                );
            }
        } else if (currentMember.isOwner()) {
            // a member cannot update their own role, only the owner can
            targetMember.update(command.newMemberName, command.newMemberRole);
            await this.memberRepository.save(targetMember);
        }

        return targetMember;
    }

    async enrollMemberToOrganization(
        command: EnrollMemberToOrganizationCommand,
    ): Promise<MemberId> {
        const currentMember = await this.existsUserInOrganization({
            userId: command.user.id,
            organizationId: command.organizationId,
        });

        if (currentMember) {
            throw new MemberAlreadyExistsException(command.user.id);
        }

        const memberId = MemberId.generate();

        const member = Member.create({
            memberId,
            name: MemberName.fromString(command.user.username.toString()),
            organizationId: command.organizationId,
            picture: command.user.picture,
            role: command.role,
            userId: command.user.id,
        });

        await this.memberRepository.save(member);

        return member.id;
    }

    async existsMemberInOrganization(
        query: ExistsMemberInOrganizationQuery,
    ): Promise<boolean> {
        const member = await this.memberRepository.exists({
            where: {
                id: query.memberId,
                organizationId: query.organizationId,
            },
        });
        return member;
    }
}
