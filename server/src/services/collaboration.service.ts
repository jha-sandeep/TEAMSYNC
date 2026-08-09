import { PrismaClient, InvitationStatus, ProjectRole } from "@prisma/client";
import { requireProjectRole } from "./project.service.js";

const prisma = new PrismaClient();

type InviteMemberInput = {
    projectId: string;
    invitedUserEmail: string;
    userId: string;
};
type AcceptInvitationInput = {
    invitationId: string;
    userId: string;
};
type RejectInvitationInput = {
    invitationId: string;
    userId: string;
};
type CancelInvitationInput = {
    invitationId: string;
    userId: string;
};
type GetProjectMembersInput = {
    projectId: string;
    userId: string;
};
type RemoveMemberInput = {
    projectId: string;
    memberId: string;
    userId: string;
};
type UpdateMemberRoleInput = {
    projectId: string;
    memberId: string;
    role: ProjectRole;
    userId: string;
};
type TransferOwnerInput = {
    projectId: string;
    newOwnerId: string;
    userId: string;
};

export async function inviteMember(data: InviteMemberInput) {
    if (!data.projectId || !data.invitedUserEmail) {
        throw new Error("Project ID and invited user email are required");
    }
    await requireProjectRole(data.projectId, data.userId, [ProjectRole.OWNER]);
    const invitedUser = await prisma.user.findUnique({ where: { email: data.invitedUserEmail } });

    if (!invitedUser) {
        throw new Error("User not found");
    }
    if (invitedUser.id === data.userId) {
        throw new Error("You cannot invite yourself");
    }

    const existingMember = await prisma.projectMember.findUnique({
        where: {
            projectId_userId: {
                projectId: data.projectId,
                userId: invitedUser.id,
            },
        },
    });

    if (existingMember) {
        throw new Error("User is already a project member");
    }

    const existingInvitation = await prisma.projectInvitation.findFirst({
        where: {
            projectId: data.projectId,
            invitedUserId: invitedUser.id,
            status: InvitationStatus.PENDING,
        },
    });

    if (existingInvitation) {
        throw new Error("Pending invitation already exists");
    }
    return prisma.projectInvitation.create({
        data: {
            projectId: data.projectId,
            invitedById: data.userId,
            invitedUserId: invitedUser.id,
            status: InvitationStatus.PENDING,
        },
    });
}

export async function acceptInvitation(data: AcceptInvitationInput) {
    if (!data.invitationId) {
        throw new Error("Invitation ID is required");
    }
    const invitation = await prisma.projectInvitation.findUnique({
        where: {
            id: data.invitationId,
        },
    });

    if (!invitation) {
        throw new Error("Invitation not found");
    }
    console.log("JWT User:", data.userId);
    console.log("Invited User:", invitation.invitedUserId);
    if (invitation.invitedUserId !== data.userId) {
        throw new Error("You are not authorized to accept this invitation");
    }
    if (invitation.status !== InvitationStatus.PENDING) {
        throw new Error("Invitation is no longer pending");
    }
    return prisma.$transaction(async (tx) => {

        await tx.projectMember.create({
            data: {
                projectId: invitation.projectId,
                userId: data.userId,
                role: ProjectRole.CONTRIBUTOR,
            },
        });

        return tx.projectInvitation.update({
            where: {
                id: invitation.id,
            },
            data: {
                status: InvitationStatus.ACCEPTED,
            },
        });

    });

}

export async function rejectInvitation(data: RejectInvitationInput) {
    if (!data.invitationId) {
        throw new Error("Invitation ID is required");
    }
    const invitation = await prisma.projectInvitation.findUnique({
        where: {
            id: data.invitationId,
        },
    });

    if (!invitation) {
        throw new Error("Invitation not found");
    }
    if (invitation.invitedUserId !== data.userId) {
        throw new Error("You are not authorized to reject this invitation");
    }
    if (invitation.status !== InvitationStatus.PENDING) {
        throw new Error("Invitation is no longer pending");
    }
    return prisma.projectInvitation.update({
        where: {
            id: invitation.id,
        },
        data: {
            status: InvitationStatus.REJECTED,
        },
    });
}

export async function cancelInvitation(data: CancelInvitationInput) {
    if (!data.invitationId) {
        throw new Error("Invitation ID is required");
    }
    const invitation = await prisma.projectInvitation.findUnique({
        where: {
            id: data.invitationId,
        }
    })

    if (!invitation) {
        throw new Error("Invitation not found");
    }

    if (invitation.invitedById !== data.userId) {
        throw new Error("You are not authorized to cancel this invitation");
    }

    if (invitation.status !== InvitationStatus.PENDING) {
        throw new Error("Invitation is no longer pending");
    }

    return prisma.projectInvitation.update({
        where: {
            id: invitation.id,
        },
        data: {
            status: InvitationStatus.CANCELLED,
        },
    });

}

export async function getProjectMembers(data: GetProjectMembersInput) {
    if (!data.projectId) {
        throw new Error("Project ID is required");
    }
    await requireProjectRole(data.projectId, data.userId, [ProjectRole.OWNER, ProjectRole.MAINTAINER, ProjectRole.CONTRIBUTOR]);

    const members = await prisma.projectMember.findMany({
        where: {
            projectId: data.projectId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return members.map((member) => ({
        id: member.user.id,
        name: member.user.name,
        email: member.user.email,
        role: member.role,
    }));
}

export async function getPendingInvitations(userId: string) {
    return prisma.projectInvitation.findMany({
        where: {
            invitedUserId: userId,
            status: InvitationStatus.PENDING,
        },
        include: {
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
            invitedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function removeMember(data: RemoveMemberInput) {
    await requireProjectRole(data.projectId, data.userId, [ProjectRole.OWNER]);

    if (data.memberId === data.userId) {
        throw new Error("Owner cannot remove themselves");
    }

    const member = await prisma.projectMember.findUnique({
        where: {
            projectId_userId: {
                projectId: data.projectId,
                userId: data.memberId,
            },
        },
    });

    if (!member) {
        throw new Error("Project member not found");
    }

    if (member.role === ProjectRole.OWNER) {
        throw new Error("Cannot remove project owner");
    }

    await prisma.projectMember.delete({
        where: {
            projectId_userId: {
                projectId: data.projectId,
                userId: data.memberId,
            },
        },
    });

    return {
        message: "Member removed successfully",
    };
}

export async function updateMemberRole(data: UpdateMemberRoleInput) {
    await requireProjectRole(data.projectId, data.userId, [ProjectRole.OWNER]);

    const member = await prisma.projectMember.findUnique({
        where: {
            projectId_userId: {
                projectId: data.projectId,
                userId: data.memberId,
            },
        },
    });

    if (!member) {
        throw new Error("Project member not found");
    }

    if (member.role === ProjectRole.OWNER) {
        throw new Error("Cannot change project owner's role");
    }

    if (data.role === ProjectRole.OWNER) {
        throw new Error("Use owner transfer instead");
    }

    return prisma.projectMember.update({
        where: {
            projectId_userId: {
                projectId: data.projectId,
                userId: data.memberId,
            },
        },
        data: {
            role: data.role,
        },
    });
}

export async function transferOwnership(data: TransferOwnerInput) {
    await requireProjectRole(data.projectId, data.userId, [ProjectRole.OWNER]);

    if (data.newOwnerId === data.userId) {
        throw new Error("You are already the owner");
    }

    const newOwner = await prisma.projectMember.findUnique({
        where: {
            projectId_userId: {
                projectId: data.projectId,
                userId: data.newOwnerId,
            },
        },
    });

    if (!newOwner) {
        throw new Error("New owner must be a project member");
    }

    return prisma.$transaction(async (tx) => {

        await tx.projectMember.update({
            where: {
                projectId_userId: {
                    projectId: data.projectId,
                    userId: data.userId,
                },
            },
            data: {
                role: ProjectRole.MAINTAINER,
            },
        });

        await tx.projectMember.update({
            where: {
                projectId_userId: {
                    projectId: data.projectId,
                    userId: data.newOwnerId,
                },
            },
            data: {
                role: ProjectRole.OWNER,
            },
        });

        return {
            message: "Ownership transferred successfully",
        };
    });

}
