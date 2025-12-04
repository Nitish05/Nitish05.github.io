# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a static portfolio website for Nitish R. Raveendran, hosted on GitHub Pages. The site showcases robotics and software engineering projects, skills, experience, and contact information. Built with HTML, CSS, and JavaScript using the Colorlib template framework.

## Project Structure

```
/
├── index.html              # Main portfolio page (dark theme)
├── portfolio-single-*.html # Individual project detail pages
├── blog-single.html        # Blog post template
├── main.html              # Alternative main page
├── css/
│   ├── style.css          # Main custom styles
│   ├── vendor/            # Third-party CSS (Bootstrap, AOS, etc.)
│   └── scss/              # SCSS source files
├── js/
│   ├── main.js            # Core JavaScript functionality
│   ├── scripts-dist.js    # Compiled vendor scripts
│   └── vendor/            # Third-party JS libraries
├── images/
│   ├── projects/          # Project screenshots and GIFs
│   ├── skills/            # Technology/skill logos (SVG)
│   └── svg/               # UI icons
├── docs/
│   └── nitish_resume.pdf  # Resume PDF for download
└── light/                 # Light theme variant of the site
```

## Architecture

### Core Technologies

- **HTML5**: Semantic markup with sections for About, Projects, Skills, Experience, Contact
- **CSS3**: Custom styles built on Bootstrap 4 grid system
- **JavaScript/jQuery**: Interactive features and animations
- **GSAP/ScrollMagic**: Advanced scroll-based animations and reveal effects
- **AOS (Animate on Scroll)**: Additional scroll animations
- **Isotope**: Portfolio grid filtering and layout
- **Owl Carousel**: Image/testimonial sliders
- **Jarallax**: Parallax scrolling effects

### Key Components

1. **Navigation System** (`js/main.js`)
   - One-page smooth scrolling navigation
   - Mobile hamburger menu with clone functionality
   - Sticky header with scroll direction detection
   - Responsive menu toggling

2. **Portfolio Section**
   - Isotope grid layout for project filtering
   - AJAX-based project detail loading (optional)
   - Links to GitHub repositories and external resources
   - Project categories: robotics, AI, UAV, embedded systems

3. **Animation System**
   - GSAP-based reveal animations for text and images
   - ScrollMagic scenes triggered at specific scroll positions
   - Custom reveal effects with cover overlays
   - Staggered animations for sequential elements

4. **Contact Form**
   - Form validation using jQuery Validate
   - Integration with Formspree (https://formspree.io/f/mjkgaagp)
   - No backend required - uses Formspree's email forwarding

5. **Skills Display**
   - Icon grid with external links to technology documentation
   - SVG logos in `images/skills/`
   - Waypoint-triggered counter animations (if needed)

## Common Development Tasks

### Updating Content

**Adding a new project:**
1. Add project image/GIF to `images/projects/`
2. Edit `index.html`, find the `#portfolio-section` div
3. Copy an existing project div (class `item`) and modify:
   - Update image source
   - Change project title and description
   - Update GitHub link or create new `portfolio-single-*.html` page
   - Add appropriate category classes (robotics, ai, uav, embedded)

**Updating resume:**
1. Replace `docs/nitish_resume.pdf` with new version
2. Ensure filename matches or update link in `index.html` (line ~142)

**Adding a skill:**
1. Add skill logo SVG to `images/skills/`
2. Edit `index.html`, find `#skills-section`
3. Copy existing skill div (class `col-6 col-sm-6...`) and modify

**Modifying experience/education:**
- Edit the `#experience-section` in `index.html` (lines ~527-568)

### Local Development

```bash
# No build process required - this is a static site

# Serve locally (using Python)
python -m http.server 8000

# Or using Node.js http-server
npx http-server -p 8000

# Open browser to http://localhost:8000
```

### Deployment

```bash
# This repo uses GitHub Pages - changes go live automatically

# Add and commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Site deploys automatically to https://nitish05.github.io
# (or custom domain configured in CNAME file)
```

### Testing

Since this is a static site with no build process:
- Test all navigation links work correctly
- Verify smooth scrolling to all sections
- Check mobile responsiveness (use browser dev tools)
- Test contact form submission
- Verify all external links (GitHub, LinkedIn, resume PDF)
- Test on multiple browsers (Chrome, Firefox, Safari)

## Important Files

- **CNAME**: Contains custom domain configuration for GitHub Pages
- **index.html**: Primary entry point - all content is in this single-page app
- **js/main.js**: All JavaScript initialization and custom functions
- **css/style.css**: Main stylesheet with custom theme overrides
- **light/**: Complete duplicate of the site with light theme variant

## JavaScript Dependencies

The site relies on these vendor libraries (loaded from `js/vendor/`):
- jQuery 3.x
- Bootstrap 4.x
- GSAP (TweenMax)
- ScrollMagic
- AOS (Animate on Scroll)
- Isotope (grid layout)
- Owl Carousel
- Jarallax (parallax)
- ImagesLoaded

All vendor scripts are concatenated in `js/scripts-dist.js`.

## Styling Architecture

- Bootstrap 4 grid system provides responsive layout foundation
- Custom styles in `css/style.css` override and extend Bootstrap
- Vendor styles in `css/vendor/` should not be modified
- SCSS source files in `css/scss/` (if rebuilding CSS)
- Icon font (icomoon) in `css/vendor/icomoon/`

## Template Attribution

This site uses a Colorlib template. The copyright notice in the footer must remain unless a license is purchased. See `readme.txt` for details.

## Contact Form Configuration

The contact form uses Formspree. The endpoint is configured in `index.html`:
```html
<form action="https://formspree.io/f/mjkgaagp" method="POST">
```

To change the recipient email, create a new Formspree endpoint or configure a different form service.

## Performance Considerations

### Image Optimization

**Current Issue**: Project GIFs are very large and impact page load performance:
- `bipedal.gif`: 31MB
- `evade_pursue.gif`: 9MB
- `MCTS.gif`: 8.5MB
- `DexHand.gif`: 8.3MB
- `quadcopter.gif`: 8.2MB

**Recommendations**:
1. Use video formats (MP4/WebM) instead of GIFs for better compression
2. Optimize GIFs using tools like:
   - `gifsicle` for compression
   - `ffmpeg` to convert GIF → MP4
   - Online tools like ezgif.com
3. Consider lazy loading implementation (already using `class="lazyload"`)
4. Target size: Keep images under 2MB when possible

**To optimize a GIF**:
```bash
# Convert to MP4 (much smaller)
ffmpeg -i input.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" output.mp4

# Or compress GIF
gifsicle --optimize=3 --colors 256 input.gif -o output.gif
```

### Lazy Loading

The site uses lazy loading for project images via the `lazyload` class. Ensure all large images include this class:
```html
<img src="images/projects/example.gif" class="lazyload img-fluid" alt="Description" />
```

## Maintaining Dark/Light Themes

The repository contains two theme versions:
- **Root directory**: Dark theme (primary)
- **`light/` directory**: Light theme variant

**Important**: Changes to content must be synchronized between both versions:
1. Update `index.html` (dark theme)
2. Update `light/index.html` with the same content changes
3. Both versions share the same `images/` and `docs/` directories

**To avoid sync issues**: Consider making the dark theme canonical and only updating the light theme before major releases.

## Known Issues & Gotchas

### Animation Performance
- GSAP and ScrollMagic create many scroll listeners
- On slower devices, animations may lag with large GIFs loading
- Test performance on mobile devices regularly

### Mobile Menu Behavior
- The mobile menu clones desktop navigation (see `siteMenuClone()` in `js/main.js`)
- Changes to nav structure require page reload to reflect in mobile menu
- The clone happens with a 1-second delay on page load

### Browser Caching
- After updating resume PDF or images, users may see cached versions
- Consider appending version query strings: `nitish_resume.pdf?v=2`
- Or use cache-busting: rename file to `nitish_resume_2024.pdf`

### Section IDs & Navigation
All navigation links depend on section IDs remaining unchanged:
- `#home-section`
- `#about-section`
- `#services-section` (Expertise)
- `#portfolio-section`
- `#skills-section`
- `#experience-section`
- `#contact-section`

Changing these IDs will break the smooth scroll navigation.

### Commented Code
`js/main.js` contains commented loader code (lines 112-133). This was replaced with the `hideLoader()` function (lines 696-716). The commented code can be safely removed if no longer needed.

## SEO & Metadata

As a single-page application, SEO requires special attention:

**Current meta tags** (in `<head>`):
- Title: "Nitish R. Raveendran — Portfolio"
- Description, keywords, and author tags present
- Ensure these stay updated

**Recommendations**:
- Keep meta description concise and compelling (currently good)
- Add Open Graph tags for social media sharing:
  ```html
  <meta property="og:title" content="Nitish R. Raveendran — Portfolio">
  <meta property="og:description" content="...">
  <meta property="og:image" content="https://nitish05.github.io/images/og-image.jpg">
  ```
- Add Twitter Card tags for Twitter previews

## Accessibility Notes

Current accessibility features:
- Semantic HTML5 elements (`<nav>`, `<section>`, `<footer>`)
- Alt text on images (ensure all new images include descriptive alt text)
- Form labels properly associated with inputs
- Keyboard navigation supported through native elements

**To improve**:
- Add ARIA labels to icon-only links (GitHub, LinkedIn icons)
- Ensure color contrast meets WCAG standards
- Test with screen readers

## External Dependencies & CDN

All vendor libraries are self-hosted in `js/vendor/` and `css/vendor/`. No CDN dependencies means:
- ✅ Site works offline and isn't affected by CDN outages
- ✅ Faster initial load (no DNS lookups to external CDNs)
- ⚠️ Need to manually update libraries for security patches

Check for updates periodically:
- Bootstrap
- jQuery
- GSAP
- Other vendor libraries

## Troubleshooting

**Smooth scrolling not working**:
- Check that section IDs match navigation `href` attributes
- Verify jQuery is loaded before `main.js`
- Check browser console for JavaScript errors

**Contact form not submitting**:
- Verify Formspree endpoint is active
- Check network tab for failed POST requests
- Ensure email and name fields have `required` attribute

**Animations not triggering**:
- ScrollMagic scenes have specific trigger points (offset: "-300%")
- Large images loading can delay scene triggers
- Check that AOS is initialized (line 1 of `main.js`)

**Mobile menu not opening**:
- Verify `offcanvas` class is toggling on `<body>`
- Check that menu clone completed (has 1-second delay)
- Ensure no JavaScript errors blocking execution
