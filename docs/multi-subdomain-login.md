# Multi-Subdomain Login Architecture

## Context

The login page is shared across all user types — College, Student, University, and Other.  
However, the applications are split across separate repositories and subdomains:

| User Type | Subdomain | Repository |
|-----------|-----------|------------|
| College   | `college.kuhs.edu` | Repo A |
| Student   | `college.kuhs.edu` | Repo A (shared with College) |
| University | `university.kuhs.edu` | Repo B |
| Other     | `other.kuhs.edu` | Repo C |

---

## Current Setup (Single Repo / Single Domain)

All portals live in one Next.js app. Redirects after login are relative paths handled by `router.push()`:

```
/login                  ← shared login page
/college/dashboard      ← college portal
/student/dashboard      ← student portal
/university/dashboard   ← university portal
/dashboard              ← other
```

`router.push()` only works within the same domain. No changes are needed while everything remains in one repo.

---

## When Splitting Into Multiple Repos / Subdomains

Two architectural options are available.

---

### Option 1 — Login Lives in One Repo, Cross-Domain Redirect After Auth

The login page stays in Repo A (`college.kuhs.edu`). After login, same-domain users are redirected with `router.push()` and cross-domain users are redirected with `window.location.href`.

#### Redirect URLs move to environment variables

```env
# .env.local (Repo A)
NEXT_PUBLIC_UNIVERSITY_URL=https://university.kuhs.edu
NEXT_PUBLIC_OTHER_URL=https://other.kuhs.edu
```

#### `userTypesConstants.ts` — redirect values become configurable

```ts
export const USER_TYPES = [
  {
    id: 'student',
    label: 'Student',
    icon: 'ri-graduation-cap-line',
    redirect: '/student/dashboard',                                         // same domain
  },
  {
    id: 'college',
    label: 'College',
    icon: 'ri-building-line',
    redirect: '/college/dashboard',                                         // same domain
  },
  {
    id: 'university',
    label: 'University',
    icon: 'ri-bank-line',
    redirect: `${process.env.NEXT_PUBLIC_UNIVERSITY_URL}/dashboard`,        // cross-domain
  },
  {
    id: 'other',
    label: 'Other',
    icon: 'ri-group-line',
    redirect: `${process.env.NEXT_PUBLIC_OTHER_URL}/dashboard`,             // cross-domain
  },
]
```

#### `LoginForm.tsx` — handle both same-domain and cross-domain redirects

```ts
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const match = USER_TYPES.find(t => t.id === userType)
  const target = match?.redirect ?? '/home'

  if (target.startsWith('http')) {
    window.location.href = target   // cross-subdomain — full page navigation
  } else {
    router.push(target)             // same app — client-side navigation
  }
}
```

#### Each sub-app protects its own routes

Repo B and Repo C should check for a valid session on every protected route. If no session exists, redirect the user back to the login page on Repo A:

```ts
// middleware.ts (Repo B / Repo C)
if (!session) {
  return NextResponse.redirect('https://college.kuhs.edu/login')
}
```

---

### Option 2 — Dedicated Auth Subdomain (SSO-Style)

A separate `auth.kuhs.edu` hosts only the login page. After authentication it issues a token (JWT or session cookie) and redirects to the correct subdomain. Each sub-app validates the token independently before granting access.

```
auth.kuhs.edu/login
  → issues token
  → redirects to college.kuhs.edu/dashboard?token=...
                university.kuhs.edu/dashboard?token=...
                other.kuhs.edu/dashboard?token=...
```

This is the recommended approach when:
- The repos have no shared session infrastructure
- Fine-grained role-based access control is needed per subdomain
- A centralised identity provider (e.g. Keycloak, Auth0, NextAuth with a shared DB) is available

---

## Decision Summary

| Concern | Option 1 | Option 2 |
|---------|----------|----------|
| Complexity | Low | High |
| Shared session store required | No | Yes |
| Login page location | Repo A | Separate repo/subdomain |
| Best for | Early-stage / small teams | Production / enterprise |

---

## Current Codebase Status

No changes are required today — everything is in one repo with relative redirects.  
When the split happens, the minimal changes needed are:

1. Add `NEXT_PUBLIC_*_URL` environment variables to Repo A.
2. Update `USER_TYPES` redirect values to use those env vars.
3. Update `LoginForm.tsx` `handleSubmit` to branch on `http` vs relative path.
4. Add session guard middleware to Repo B and Repo C pointing back to Repo A's login URL.
