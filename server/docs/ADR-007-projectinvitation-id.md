# ADR-007: ProjectInvitation Primary Key

**Status:** Accepted

---

# Context

Unlike ProjectMember, invitations represent events.

Example

Invite Rahul

↓

Rejected

↓

Invite Rahul again

↓

Accepted

---

# Decision

ProjectInvitation will have

```
id String @id @default(cuid())
```

---

# Why?

Every invitation should have its own lifecycle.

Each invitation represents a different business event.

---

# Benefits

Invitation history

Future audit logs

Resend invitation

Analytics

Notification history