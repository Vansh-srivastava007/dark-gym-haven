# Big House Gym - Navbar Component

## Overview
Production-ready, accessible, and responsive navbar component for Big House Gym featuring mobile-first design, smooth scrolling, and AI Trainer integration.

## Features
- ✅ Sticky header with elevation on scroll
- ✅ Responsive mobile-first design with hamburger menu
- ✅ Smooth scroll to page sections
- ✅ Active section highlighting
- ✅ Keyboard navigation support (WCAG compliant)
- ✅ Floating AI Trainer button
- ✅ Analytics event tracking
- ✅ Mobile quick actions (Call, WhatsApp, Directions)

## Integration

### Basic Usage
```tsx
import { Navbar } from "@/components/Navbar";
import { AITrainerModal } from "@/components/AITrainerModal";
import { useState } from "react";

function App() {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenAI={() => setAiModalOpen(true)} />
      <AITrainerModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
      {/* Your page content */}
    </>
  );
}
```

### Custom Configuration
```tsx
<Navbar
  logo="/path/to/logo.png"
  links={[
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
  ]}
  onOpenAI={() => console.log("AI Trainer opened")}
/>
```

## Props

### Navbar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `string` | undefined | Custom logo image URL (optional) |
| `links` | `NavLink[]` | Default links | Array of navigation links |
| `onOpenAI` | `() => void` | undefined | Callback for AI Trainer button |

### NavLink Interface
```typescript
interface NavLink {
  label: string;  // Display text
  href: string;   // Anchor link (e.g., "#home")
}
```

## Section IDs Required
The navbar expects these section IDs in your page:
- `#home` - Hero/landing section
- `#programs` - Programs/gallery section
- `#pricing` - Membership plans section
- `#contact` - Contact form section

## Analytics Events

The navbar emits the following custom events:

### nav_click
Fired when a navigation link is clicked.
```javascript
{
  event: 'nav_click',
  link_text: 'Home',
  link_url: '#home'
}
```

### cta_join_click
Fired when the "Join Now" CTA is clicked.
```javascript
{
  event: 'cta_join_click',
  button_location: 'navbar'
}
```

### ai_open
Fired when the AI Trainer button is clicked.
```javascript
{
  event: 'ai_open',
  trigger_location: 'navbar'
}
```

## Accessibility Features
- ✅ Semantic HTML5 `<nav>` element
- ✅ ARIA labels on interactive elements
- ✅ `aria-expanded` and `aria-controls` on mobile menu
- ✅ `aria-current="page"` on active links
- ✅ Keyboard focus visible states
- ✅ 4.5:1 contrast ratio on all text
- ✅ Focus trap in mobile menu

## Responsive Breakpoints
- **Mobile**: < 1024px (hamburger menu)
- **Desktop**: ≥ 1024px (full horizontal navbar)

## Brand Colors
- Background: `#0D0D0D` (Jet Black)
- Accent/CTA: `#E50914` (Crimson Red)
- Text: `#FFFFFF` (White)

## Typography
- Headings: Montserrat (600, 700, 800)
- Body: Poppins (400, 500, 600)

## Mobile Quick Actions
The mobile menu includes:
- 📞 **Call Now** - `tel:+919876543210`
- 💬 **WhatsApp** - Opens WhatsApp chat
- 📍 **Get Directions** - Opens Google Maps

Update these links in `src/components/Navbar.tsx` with your actual contact details.

## Testing

### Manual Testing Checklist
- [ ] Desktop navigation links work
- [ ] Mobile hamburger opens/closes
- [ ] Smooth scrolling to sections
- [ ] Active section highlighting updates on scroll
- [ ] Sticky header appears after scroll
- [ ] AI Trainer modal opens from both buttons
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus visible on interactive elements
- [ ] Mobile quick actions have correct URLs

## Performance
- Minimal DOM elements
- Optimized animations with CSS transforms
- Lazy-loaded mobile menu (Sheet component)
- No layout shift on scroll

## Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari iOS 13+
- Chrome Android (latest)

## License
MIT

## Support
For issues or questions, contact: support@bighousegym.com
