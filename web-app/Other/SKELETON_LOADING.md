# Skeleton Loading Implementation

This document describes the skeleton loading states implemented throughout the application for a better user experience.

## Skeleton Components

### 1. JobCardSkeleton
**Location:** `src/components/JobCardSkeleton.jsx`  
**Usage:** Loading state for job cards  
**Features:**
- Mimics the structure of actual job cards
- Animates with pulse effect
- Shows header, description, tags, and footer placeholders

### 2. TableSkeleton
**Location:** `src/components/TableSkeleton.jsx`  
**Usage:** Loading state for data tables  
**Props:**
- `rows` (default: 5) - Number of rows to display
- `columns` (default: 4) - Number of columns to display
**Features:**
- Flexible row and column configuration
- Table header and body placeholders
- Pulse animation

### 3. StatCardSkeleton
**Location:** `src/components/StatCardSkeleton.jsx`  
**Usage:** Loading state for statistics cards  
**Features:**
- Icon placeholder
- Title, value, and description placeholders
- Matches DaisyUI stat component structure

### 4. ContentSkeleton
**Location:** `src/components/ContentSkeleton.jsx`  
**Usage:** General content loading  
**Props:**
- `rows` (default: 3) - Number of content blocks
- `className` - Additional CSS classes
**Features:**
- Flexible text content placeholder
- Multiple rows with varying widths
- Reusable for any text-based content

## Implementation Locations

### Client Components (with useState loading)

#### Jobs Page (`/jobs`)
- **Component:** `src/app/jobs/page.jsx`
- **Loading State:** 6 JobCardSkeleton components in grid
- **Also has:** `src/app/jobs/loading.jsx` for route-level loading

#### Scheduling Page (`/dashboard/scheduling`)
- **Component:** `src/app/dashboard/scheduling/page.jsx`
- **Loading States:**
  - Stats section: 4 StatCardSkeleton components
  - Table section: TableSkeleton with 5 rows, 6 columns

#### Settings Page (`/dashboard/settings`)
- **Component:** `src/app/dashboard/settings/page.jsx`
- **Loading State:** Custom skeleton for Google Calendar integration section

### Server Components (with loading.jsx)

#### Dashboard Overview (`/dashboard`)
- **Loading Component:** `src/app/dashboard/loading.jsx`
- **Features:**
  - Header skeleton
  - 4 recruitment stat cards
  - 6 applicant stat cards
  - 3 scheduling stat cards

#### Recruitment Page (`/dashboard/recruitment`)
- **Loading Component:** `src/app/dashboard/recruitment/loading.jsx`
- **Features:**
  - Header skeleton
  - TableSkeleton with 8 rows, 5 columns

#### Job Applicants Page (`/dashboard/recruitment/[jobId]`)
- **Loading Component:** `src/app/dashboard/recruitment/[jobId]/loading.jsx`
- **Features:**
  - Back button skeleton
  - Job info card skeleton
  - TableSkeleton with 8 rows, 7 columns

## Usage Examples

### Using JobCardSkeleton
```jsx
import JobCardSkeleton from '@/components/JobCardSkeleton';

{loading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <JobCardSkeleton key={i} />
    ))}
  </div>
) : (
  // Actual job cards
)}
```

### Using TableSkeleton
```jsx
import TableSkeleton from '@/components/TableSkeleton';

{loading ? (
  <TableSkeleton rows={5} columns={6} />
) : (
  <YourActualTable />
)}
```

### Using StatCardSkeleton
```jsx
import StatCardSkeleton from '@/components/StatCardSkeleton';

{loading ? (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <StatCardSkeleton key={i} />
    ))}
  </div>
) : (
  // Actual stats
)}
```

### Using ContentSkeleton
```jsx
import ContentSkeleton from '@/components/ContentSkeleton';

{loading ? (
  <ContentSkeleton rows={5} className="p-4" />
) : (
  // Actual content
)}
```

## Design Principles

1. **Consistent Animation**: All skeletons use `animate-pulse` for consistent visual feedback
2. **Structural Matching**: Skeletons mirror the actual component structure
3. **DaisyUI Integration**: Uses DaisyUI's `bg-base-300` for theme-aware coloring
4. **Performance**: Uses pure CSS animations for smooth rendering
5. **Accessibility**: Maintains layout stability to prevent layout shifts

## Best Practices

1. **Match the Structure**: Skeleton should closely resemble the actual content
2. **Use Appropriate Count**: Show realistic number of skeleton items
3. **Combine with Loading States**: Use alongside loading state management
4. **Theme Aware**: Always use `bg-base-300` for theme support
5. **Avoid Over-Animation**: Pulse animation is subtle and performant

## Integration with Framer Motion

Skeleton loading works seamlessly with Framer Motion animations:
- Skeletons show during initial load
- Once data loads, components fade in with motion animations
- No animation conflicts or visual glitches

## Route-Level Loading

Next.js 15 automatically shows `loading.jsx` during navigation:
- Place `loading.jsx` in the same directory as `page.jsx`
- Automatically displayed during server component rendering
- Replaced with actual page once data is fetched
- Perfect for server-side data fetching

## Notes

- Button loading states (form submissions) still use DaisyUI's `loading loading-spinner`
- Modal loading uses inline spinners as they're action-based, not data-loading
- Route transitions between pages are handled by Next.js with loading.jsx files
