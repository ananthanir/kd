# KUHS ERP Dashboard — Project Handover

## Project Overview

**Stack:** Next.js 16 App Router + MUI 7 + Tailwind CSS v4  
**Purpose:** Multi-portal ERP for Kerala University of Health Sciences (KUHS)  
**Branch:** `college-dashboard-offer-course`  
**Working directory:** `C:\worlds\kuhs-college-dashboard`

Three portals, each with a distinct layout, triggered by login user-type selection.

---

## Portal Architecture

| Portal | Route | Layout | Layout Component |
|--------|-------|--------|-----------------|
| College | `/college/*` | Hybrid (horizontal top bar + vertical sidebar) | `HybridLayout` (custom) |
| Student | `/student/*` | Vertical (collapsible sidebar) | `VerticalLayout` (template) |
| University | `/university/*` | Horizontal (top nav with sub-menus) | `HorizontalLayout` (template) |

Login at `/login` → user selects type → redirected to portal dashboard.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/configs/themeConfig.ts` | **Single source of truth** for brand colors (`brand`) and per-portal settings (`portals`) |
| `src/app/globals.css` | Mirrors `brand` tokens into Tailwind `@theme` block (`--color-kuhs-primary`, etc.) |
| `src/@core/theme/colorSchemes.ts` | Imports `brand` → MUI palette primary/background |
| `src/configs/primaryColorConfig.ts` | Imports `brand` → template color picker first entry |
| `src/components/PortalSettingsSync.tsx` | Client component; calls `updatePageSettings` (non-cookie) to apply portal-specific overrides |
| `src/components/RoleSwitcher.tsx` | MUI Chip + Popper role switcher (mock — no real permissions) |
| `src/data/roleData.ts` | `collegeRoles` and `universityRoles` arrays |
| `src/data/navigation/collegeMenuData.tsx` | 3-level menu data: `CollegeMenuItem → CollegeSubMenuItem → CollegeLeafItem[]` |
| `src/components/layout/hybrid/HybridLayout.tsx` | College hybrid layout (main custom component) |
| `src/components/layout/hybrid/MobileMenu.tsx` | Mobile drawer accordion for college menus |
| `src/components/layout/university/HorizontalMenu.tsx` | University horizontal menu with SubMenus |
| `src/components/layout/university/NavbarContent.tsx` | University navbar: RoleSwitcher (desktop) + Mode + User dropdowns |
| `src/app/college/layout.tsx` | College layout wrapper: Providers + PortalSettingsSync + HybridLayout |
| `src/app/student/layout.tsx` | Student layout wrapper: Providers + PortalSettingsSync + VerticalLayout |
| `src/app/university/layout.tsx` | University layout wrapper: Providers + PortalSettingsSync + HorizontalLayout |
| `src/views/Login.tsx` (+ login components) | All hardcoded colors replaced with `text-kuhs-primary`, `bg-kuhs-navy`, etc. |
| `next.config.ts` | `devIndicators: false` — removes Next.js dev overlay "N" button |

---

## HybridLayout — Implementation Details

**Constants:** `NAV_BAR_H = 48`, `SIDEBAR_OPEN_W = 260`, `SIDEBAR_CLOSED_W = 52`

### Layout structure

```
<div flex-col h-screen>
  <header h-56>          ← Logo + RoleSwitcher (desktop) + ModeDropdown + UserDropdown
  <MobileMenu Drawer />  ← Mobile only; accordion of all college menus
  {!isMobile && (
    <div flex-1>
      <aside>            ← Vertical sidebar (width animates 52↔260px)
        [Section header: icon + label + collapse toggle]
        [Menu: SubMenu/MenuItem from @menu/vertical-menu]
      </aside>
      <div flex-col>
        <nav h-48>       ← Horizontal menu buttons (top)
        <main>           ← {children}
        <VerticalFooter />
      </div>
    </div>
  )}
  {isMobile && <main>{children}</main>}
</div>
```

### Key behaviours

**Hover-expand overlay:** When sidebar is collapsed and user hovers, `isHoveringCollapsed = true` → sidebar switches to `position: absolute, height: 100%, zIndex: 10` so it overlays content without pushing it. Calls `hoverVerticalNav(true/false)` from `@menu` context.

**Label animation:** `collapseVerticalNav(!sidebarOpen)` syncs `@menu`'s `isCollapsed` so menu labels fade using `@menu`'s built-in transition.

**Clicking active top item** toggles sidebar open/closed. Clicking a different top item switches `activeMenu` and opens the sidebar.

**Mobile detection:** `useMedia('(max-width: 1199px)', false)` from `react-use` — consistent with `@menu` and Tailwind `lg` breakpoint.

### Menu item rendering

- `sub.children.length > 0` → `<SubMenu>` wrapping leaf `<MenuItem>`s
- Leaf items inside SubMenus get `style={{ fontSize: '1.125rem' }}` on the icon element — this overrides `@menu`'s inherited `0.5rem` for level > 0 items
- Top-level sub-items (SubMenu row icons) use `@menu`'s default `1.375rem`

---

## College Menu Data Structure (3 levels)

```
Academic
  ├── Course Offer  (SubMenu)
  │     ├── Add Course            /college/academic/course-offer/add
  │     ├── Course List           /college/academic/course-offer/list
  │     └── Pending Approvals     /college/academic/course-offer/pending
  ├── Timetable     (SubMenu)
  │     ├── View Timetable
  │     └── Manage Schedule
  └── Departments   (SubMenu)
        ├── Department List
        └── Add Department

Students       → Admissions / Attendance / Records
Examinations   → Schedule / Results / Hall Tickets
Finance        → Fee Structure / Payments / Receipts
Reports        → Attendance Report / Analytics
```

Type definitions in `src/data/navigation/collegeMenuData.tsx`:
```ts
type CollegeLeafItem    = { label: string; href: string; icon: string }
type CollegeSubMenuItem = { label: string; icon: string; href?: string; children?: CollegeLeafItem[] }
type CollegeMenuItem    = { id: string; label: string; icon: string; subItems: CollegeSubMenuItem[] }
```

---

## Brand Colors

All tokens live in `src/configs/themeConfig.ts` under `export const brand`:

```ts
primary:          '#5948a7'   // MUI palette primary (user changed from teal #48A6A7 to purple)
primaryLight:     '#6dbcbd'
primaryDark:      '#3d9394'
primarySubtle:    '#f0fafa'
navy:             '#2D336B'
background:       '#f8f7f3'   // light mode page bg
backgroundDark:   '#1f2937'   // dark mode page bg
border:           '#E0DDD6'
tealSubtle:       '#F0FBFB'
tealSubtleBorder: '#B9E7E7'
```

These feed into:
- `colorSchemes.ts` → MUI palette
- `primaryColorConfig.ts` → template color picker
- `globals.css` `@theme` block → Tailwind utilities (`text-kuhs-primary`, `bg-kuhs-navy`, etc.)

---

## PortalSettingsSync Pattern

Each portal's `layout.tsx` applies non-cookie settings overrides via `updatePageSettings`:

```tsx
<PortalSettingsSync settings={{
  primaryColor:       portals.college.primaryColor,
  skin:               themeConfig.skin,          // 'default' | 'bordered'
  semiDark:           themeConfig.semiDark,
  navbarContentWidth: themeConfig.navbar.contentWidth,
  contentWidth:       themeConfig.contentWidth,
  footerContentWidth: themeConfig.footer.contentWidth,
}} />
```

> `mode` is **intentionally excluded** — users control dark/light via the ModeDropdown themselves.

---

## TypeScript Status

All files pass `npx tsc --noEmit` with zero errors.

---

## What Is Complete

- [x] Login page — all user types, redirect on selection, full KUHS branding
- [x] College hybrid layout — desktop + mobile, hover-expand sidebar, 3-level menu, role switcher
- [x] Student vertical layout — template `VerticalLayout` with custom navigation/menu
- [x] University horizontal layout — template `HorizontalLayout` with custom SubMenu nav + role switcher
- [x] Brand token centralization in `themeConfig.ts`
- [x] Per-portal settings sync via `PortalSettingsSync`
- [x] `next.config.ts` dev indicator removed (`devIndicators: false`)

## What Is NOT Done (no requests yet)

- [ ] Actual page content for any dashboard routes (only scaffold pages exist at each route)
- [ ] Real authentication / session management / authorization
- [ ] Nested sub-items for student or university menus (only college has 3-level depth)
- [ ] Any backend / API integration
