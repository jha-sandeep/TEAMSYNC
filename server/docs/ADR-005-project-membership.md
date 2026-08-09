# ADR-005: Project Membership Model

**Status:** Accepted

---

# Context

After introducing invitations we needed to decide how project membership
should be stored.

---

# Decision

Every user with access to a project will exist inside ProjectMember.

This includes

- Owner
- Admin
- Member

---

# Database

```
Project

ownerId
```

stores

Ownership

while

```
ProjectMember
```

stores

Access.

---

Example

Project Alpha

```
ownerId = Rahul
```

ProjectMember

```
Rahul  OWNER

Amit   ADMIN

Priya  MEMBER
```

---

# Why keep ownerId?

ownerId represents

Business ownership.

ProjectMember represents

Authorization.

They solve different problems.

---

# Benefits

Single source of truth for permissions.

Listing project members becomes one query.

Task assignment becomes easier.

Notification system becomes easier.

Socket.IO room membership becomes easier.