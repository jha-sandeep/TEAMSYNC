# ADR-006: Composite Primary Key for ProjectMember

**Status:** Accepted

---

# Context

ProjectMember is a junction table.

We had two choices.

Option A

```
id
projectId
userId
```

Option B

Composite key

```
(projectId,userId)
```

---

# Decision

Use

```
@@id([projectId,userId])
```

---

# Why?

A user should belong to a project only once.

The relationship itself is unique.

No surrogate id is necessary.

---

# Example

Invalid

```
Project Alpha

Rahul

Rahul
```

The database prevents duplicates automatically.

---

# Benefits

Cleaner schema

Natural relationship

Database enforces uniqueness

No extra UNIQUE constraint required