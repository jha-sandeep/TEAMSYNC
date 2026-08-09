import { Request, Response } from "express";
import {
    inviteMember, acceptInvitation, rejectInvitation, cancelInvitation, getProjectMembers, getPendingInvitations,
    removeMember, updateMemberRole, transferOwnership
} from "../services/collaboration.service.js";

export async function inviteMemberHandler(req: Request, res: Response) {
    try {
        const invitation = await inviteMember({
            projectId: req.body.projectId,
            invitedUserEmail: req.body.invitedUserEmail,
            userId: req.user.userId,
        });

        return res.status(201).json({
            success: true,
            data: invitation,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export async function acceptInvitationHandler(req: Request, res: Response) {
    try {
        const invitationId = String(req.params.invitationId);
        const invitation = await acceptInvitation({
            invitationId: invitationId,
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: invitation,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function rejectInvitationHandler(req: Request, res: Response) {
    try {
        const invitationId = String(req.params.invitationId);
        const invitation = await rejectInvitation({
            invitationId: invitationId,
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: invitation,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function cancelInvitationHandler(req: Request, res: Response) {
    try {
        const invitationId = String(req.params.invitationId);
        const invitation = await cancelInvitation({
            invitationId: invitationId,
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: invitation,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getProjectMembersHandler(req: Request, res: Response) {
    try {
        const projectId = String(req.params.projectId);
        const projectMembers = await getProjectMembers({
            projectId: projectId,
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: projectMembers,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function getPendingInvitationsHandler(req: Request, res: Response) {
    try {
        const invitations = await getPendingInvitations(req.user.userId);

        return res.status(200).json({
            success: true,
            data: invitations,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function removeMemberHandler(req: Request, res: Response) {
    try {
        const result = await removeMember({
            projectId: String(req.params.projectId),
            memberId: String(req.params.memberId),
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function updateMemberRoleHandler(req: Request, res: Response) {
    try {

        const member = await updateMemberRole({
            projectId: String(req.params.projectId),
            memberId: String(req.params.memberId),
            role: req.body.role,
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: member,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function transferOwnershipHandler(req: Request, res: Response) {
    try {

        const result = await transferOwnership({
            projectId: String(req.params.projectId),
            newOwnerId: req.body.newOwnerId,
            userId: req.user.userId,
        });

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}