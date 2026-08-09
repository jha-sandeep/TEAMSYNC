import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { inviteMemberHandler, acceptInvitationHandler,rejectInvitationHandler,cancelInvitationHandler,getProjectMembersHandler,
    getPendingInvitationsHandler,removeMemberHandler,updateMemberRoleHandler,transferOwnershipHandler
 } from "../controller/collaboration.controller.js";

const router = Router();

router.use(authenticate);

router.post("/invite", inviteMemberHandler);
router.patch("/invitations/:invitationId/accept", acceptInvitationHandler);
router.patch("/invitations/:invitationId/reject",rejectInvitationHandler);
router.patch( "/invitations/:invitationId/cancel",cancelInvitationHandler);
router.get("/members/:projectId",getProjectMembersHandler);
router.get("/invitations",getPendingInvitationsHandler)
router.delete( "/projects/:projectId/members/:memberId",removeMemberHandler);
router.patch("/projects/:projectId/members/:memberId",updateMemberRoleHandler);
router.patch("/projects/:projectId/transfer-owner",transferOwnershipHandler);

export default router;