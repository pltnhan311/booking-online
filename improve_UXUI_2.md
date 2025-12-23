Phase 2: Layout Optimization & Information Architecture
Redesign the layout structure and information architecture for a cinema booking website focusing on visual hierarchy, scanability, and user flow:

HOMEPAGE LAYOUT REFINEMENT:

Navigation Bar:
- Height: 72px
- Sticky on scroll with blur backdrop (backdrop-filter: blur(12px))
- Logo left-aligned, 40px height
- Menu items center: 16px spacing, Inter 500
- Search + Login right-aligned
- Subtle bottom border: 1px rgba(245,241,232,0.1)

Hero Section:
- Height: 65vh minimum
- Content max-width: 600px, left-aligned with 80px margin
- Visual hierarchy: Badge (HOT/C18) → Title (48px) → Metadata row → Description (max 2 lines) → CTA buttons
- Poster image: right side, slight parallax effect on scroll
- Gradient overlay ensures text readability
- Add subtle grain texture overlay on dark areas for depth

Movie Sections:
- Section header: "PHIM ĐANG CHIẾU" 32px, with "Xem tất cả" link right-aligned
- 24px margin below header
- Grid: 4 columns with 24px gap
- Each card aspect ratio locked at 2:3
- Minimum 80px between sections

Movie Card Hierarchy:
- Poster: dominant visual (100% width)
- Badge: absolute positioned, top-right, 8px margins
- Title: 16px, 600 weight, 8px margin top, max 2 lines
- Metadata row: 14px, 400 weight, 4px margin top
  - Rating star icon + number | Genre | Duration
  - Use middot separator (•) with 8px spacing

MOVIE DETAILS PAGE LAYOUT:

Information Architecture:
- Split layout: 40% poster (sticky) | 60% content
- Content flow: Title → Metadata bar → Synopsis → Director/Cast → CTAs → Showtimes preview
- Maximum content width: 640px for readability

Metadata Bar Design:
- Height: 48px
- Display: Rating | Duration | Release Date | Genre tags
- All inline with 16px spacing between elements
- Genre tags: chip style, slightly elevated

Synopsis Section:
- 18px line height for comfortable reading
- Max 4 lines preview with "Đọc thêm" expansion
- Margin: 32px top and bottom

Cast/Crew Section:
- Two columns: "Đạo diễn" and "Diễn viên"
- Labels: 14px, muted slate
- Names: 16px, soft cream, comma-separated
- 24px margin between columns

CTA Section:
- Fixed positioning option on mobile
- Two buttons side-by-side on desktop (60/40 split)
- 16px gap between buttons
- 48px margin from content above

THEATER SELECTION PAGE LAYOUT:

Progress Indicator:
- Top of page, centered
- Three steps: numbered circles connected by lines
- Active step: gold fill, larger (40px diameter)
- Completed: gold border with checkmark
- Upcoming: gray border (32px diameter)
- 64px margin below

Filter Bar:
- Sticky below progress indicator
- Height: 56px
- Elements: "Sắp xếp theo" dropdown | "Định dạng" multi-select | Distance slider
- All inline with 16px separation
- Subtle background: rgba(45,45,45,0.95) with backdrop blur

Theater Card Layout:
- Horizontal card design
- Left: Theater logo (80x80px) + Name + Address
- Center: Available formats as badge row
- Right: Distance + "Chọn suất" CTA
- Height: 120px, 16px padding
- 16px margin between cards

Theater Format Badges:
- Inline display with 8px gaps
- 32px height, auto width
- Bold text, 12px
- Different subtle background colors per format:
  - 2D: rgba(212,165,116,0.15)
  - 3D: rgba(184,125,75,0.15)
  - IMAX: rgba(200,90,84,0.15)
  - 4DX: rgba(74,155,127,0.15)

SPACING HIERARCHY:
- Between sections: 80px
- Between related groups: 32px
- Between elements: 16px
- Between inline elements: 8px
- Card internal padding: 24px

VISUAL FLOW IMPROVEMENTS:
- Clear reading order: F-pattern for scanning
- Consistent alignment: all text left-aligned within containers
- White space usage: minimum 32px breathing room around focused content
- Visual weight: poster/images 50%, text 35%, CTAs 15%
- Progressive disclosure: show essential info first, details on interaction

FOOTER REDESIGN:
- Height: auto with 64px padding vertical
- Three columns layout
- Column 1: Logo + tagline (maximum 2 lines)
- Column 2: Quick links in single column list (24px spacing)
- Column 3: Contact info with icons (phone, email, location)
- Social icons: 40px size, 16px spacing, bottom-aligned
- Copyright: centered, 12px, absolute bottom with 24px margin

Create a scannable, organized layout that guides users naturally through the booking flow while maintaining visual breathing room and clear content hierarchy.