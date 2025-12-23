Phase 3: Interaction Design & Micro-animations
Design the interactive states and micro-animations for a premium cinema booking website, focusing on smooth transitions and user feedback:

TRANSITION SPECIFICATIONS:

Global Animation Settings:
- Default duration: 200ms
- Slow transitions: 300ms (page changes, modals)
- Fast transitions: 150ms (button feedback, tooltips)
- Easing: cubic-bezier(0.4, 0, 0.2, 1) for all movements
- Opacity transitions: ease-in-out

COMPONENT INTERACTION STATES:

Movie Card Animations:
- Default state: shadow 0 4px 24px rgba(0,0,0,0.4)
- Hover state:
  - Transform: translateY(-8px) duration 200ms
  - Shadow: 0 12px 40px rgba(0,0,0,0.6) duration 200ms
  - Overlay appears: gradient from bottom rgba(212,165,116,0.9)
  - "Đặt vé nhanh" button fades in from bottom (translateY(20px) to 0)
  - Poster brightness: increase by 5%
- Active/Click state:
  - Transform: scale(0.98) duration 100ms
  - Shadow decreases briefly

Button Interactions:
- Primary Button (Gold):
  - Hover: background shifts to Copper, subtle scale(1.02)
  - Active: scale(0.98), slight darken
  - Loading state: spinning icon appears left, text "Đang xử lý..."
  - Success: checkmark animation with green flash
  - Ripple effect on click: expanding circle from click point, 600ms fade
  
- Secondary Button (Outlined):
  - Hover: background copper with 0.15 opacity, border brightens
  - Active: background opacity increases to 0.25
  - Border animation: subtle glow pulse on focus

LOADING STATES:

Skeleton Screens:
- Replace content with placeholder shapes
- Shimmer effect: linear gradient animation moving left to right
  - Colors: rgba(45,45,45,1) to rgba(212,165,116,0.2) to rgba(45,45,45,1)
  - Animation duration: 1.5s infinite
- Border-radius matches actual content
- Maintain exact layout dimensions

Progressive Image Loading:
- Initial state: blur(20px) with low-res placeholder
- Load transition: blur(0) over 300ms
- Fade-in: opacity 0 to 1 over 200ms
- Scale: subtle scale(1.05) to scale(1) during load

Spinner for Quick Actions:
- Size: 24px
- Stroke: 3px
- Color: Deep Gold
- Animation: rotate 360deg, 800ms linear infinite
- Appears in button center, pushing text left

PAGE TRANSITIONS:

Route Changes:
- Current page: fade out (opacity 1 to 0, 150ms)
- New page: fade in (opacity 0 to 1, 200ms) with slight translateY(-20px to 0)
- Maintain scroll position on back navigation
- Loading bar at top: gold, 3px height, indeterminate progress animation

Modal Animations:
- Backdrop: fade in (opacity 0 to 0.7, 200ms)
- Modal content: 
  - Scale from 0.9 to 1
  - Opacity 0 to 1
  - Combined duration: 250ms with ease-out
- Close animation: reverse, 200ms
- Click outside: backdrop pulse effect before close

SCROLL INTERACTIONS:

Sticky Navigation:
- Scroll down: nav bar height reduces from 72px to 56px
- Background blur increases (backdrop-filter: blur(12px) to blur(20px))
- Shadow appears: 0 2px 16px rgba(0,0,0,0.3)
- Logo scale: 1 to 0.85
- All transitions: 200ms

Parallax Effects:
- Hero poster: scroll speed 0.5x (moves slower than content)
- Hero content: scroll speed 1x (normal)
- Subtle, maximum 100px displacement

Scroll-triggered Animations:
- Elements fade in as they enter viewport
- Start: opacity 0, translateY(30px)
- End: opacity 1, translateY(0)
- Duration: 400ms, staggered by 100ms per element
- Trigger point: 80% viewport height

FOCUS STATES:

Keyboard Navigation:
- Focus ring: 2px solid Deep Gold, 4px offset
- Smooth ring animation: scale from 0.95 to 1, 150ms
- Skip links: appear on tab, hidden by default
- Ensure all interactive elements have visible focus

Input Fields:
- Default: 1px border rgba(107,107,107,1)
- Focus: 2px border Deep Gold, shadow 0 0 0 4px rgba(212,165,116,0.2)
- Error: 2px border red, shake animation (5px left/right, 3 cycles, 300ms)
- Success: 2px border green, checkmark icon appears right

HOVER MICRO-INTERACTIONS:

Theater Cards:
- Default: border 1px rgba(107,107,107,0.3)
- Hover: 
  - Border: 1px Deep Gold
  - Background: lighten by 3%
  - Distance indicator: gold color
  - CTA button: gold background appears
  - Transition: 200ms all properties

Format Badges:
- Hover: background opacity increases by 0.1
- Scale: 1.05 over 150ms
- Cursor: pointer
- Tooltip appears above: format details, 200ms fade-in with translateY(-8px)

Rating Stars:
- Individual star hover: scale(1.2), gold glow
- Fill animation on interaction: left to right, 150ms per star with 50ms stagger
- Shake animation if trying to rate without login

FEEDBACK ANIMATIONS:

Success Messages:
- Toast notification slides in from top-right
- Icon: animated checkmark (draw path, 300ms)
- Auto-dismiss after 3s with fade-out
- Hover: pause auto-dismiss

Error Messages:
- Shake animation on input (translateX: 0 → 10px → -10px → 0, 300ms)
- Error toast: slides in from top with red accent
- Icon: animated X mark

Adding to Cart/Booking:
- Quick scale pulse on movie card (1 → 1.1 → 1, 400ms)
- Gold ring expands from button (scale 1 to 2, opacity 1 to 0, 500ms)
- Cart icon in nav: bounce animation + badge number increment

CURSOR INTERACTIONS:

Custom Cursor States:
- Hovering links/buttons: scale(1.5), gold border
- Hovering draggable elements: grab cursor
- During drag: grabbing cursor
- Hovering images: zoom icon overlay, image scale(1.05)
- Processing: wait cursor with spinning circle

GESTURE ANIMATIONS (Mobile):

Swipe Interactions:
- Movie carousel: smooth momentum scroll
- Pull-to-refresh: stretch animation with gold spinner
- Swipe to dismiss modals: follow finger with resistance
- Bottom sheet: drag handle animation, bounces at limits

Touch Feedback:
- Tap: circular ripple effect from touch point, 400ms
- Long press: expanding circle 0 to 100% over 500ms, vibration feedback
- Double tap: quick scale pulse

EMPTY STATES:

No Results Animation:
- Icon: gentle float animation (translateY: 0 → -10px → 0, 2s infinite)
- Text: fade in with stagger, 200ms per line
- CTA button: subtle pulse every 3s

Loading States:
- Dots animation: three dots fade in/out sequentially (1.2s loop)
- Card shimmer: continuous wave effect
- Spinner: smooth rotation with ease-in-out

ACCESSIBILITY CONSIDERATIONS:

Reduced Motion:
- Detect prefers-reduced-motion: reduce-motion
- Disable all decorative animations
- Keep functional animations (loading, feedback) but simplify
- Replace parallax with static positioning
- Instant transitions instead of gradual (50ms max)

All animations should feel snappy and responsive, never sluggish or distracting. Every interaction should provide clear visual feedback without overwhelming the user. Test all animations at 60fps for smooth performance.