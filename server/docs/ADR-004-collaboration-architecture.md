# ADR-004: Collaboration Architecture

**Status:** Accepted

## Context

TeamSync is a collaborative project management application where multiple users
work together on the same project.

Before implementing collaboration, we needed to decide how users become
members of a project and how permissions will be managed.

---

# Problem

There were two possible approaches.

## Option 1

Owner directly adds a user into the ProjectMember table.

```
Owner
   │
   ▼
ProjectMember Created
```

Advantages

- Very simple
- Easy implementation

Disadvantages

- No user consent
- No invitation history
- Doesn't represent how production SaaS products work

---

## Option 2 (Chosen)

Use a ProjectInvitation before creating ProjectMember.

```
Owner
   │
   ▼
Create Invitation
   │
   ▼
Invitation (PENDING)
   │
   ▼
User Accepts
   │
   ▼
ProjectMember Created
```

Advantages

- User consent
- Invitation history
- Production workflow
- Easier future enhancements

Examples

- GitHub
- Jira
- Notion
- Linear

---

# Decision

TeamSync will implement an Invitation workflow.

Users are **not** added directly to projects.

A ProjectMember record is created only after an invitation is accepted.

---

# Invitation Lifecycle

```
Owner
   │
   ▼
Invite User
   │
   ▼
PENDING
   │
 ┌─┴───────────────┐
 │                 │
 ▼                 ▼
ACCEPTED       REJECTED
 │
 ▼
Create ProjectMember
```

Additional state

```
PENDING
   │
   ▼
CANCELLED
```

if the owner cancels the invitation.

---

# Benefits

- Clear history
- Better security
- User consent
- Easier notification system
- Easy email integration later