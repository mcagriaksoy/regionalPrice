# Common Header and Footer Templates

## Purpose
To reduce code duplication across blog posts and pages, we've created common header and footer templates in the `/includes` folder.

## Files
- `includes/header.html` - Common navigation header for blog posts
- `includes/footer.html` - Common footer scripts for blog posts
- `js/common-loader.js` - JavaScript loader (optional, for dynamic loading)

## Usage

### Option 1: Manual Copy/Paste (Current Approach)
When creating or updating blog posts, copy the navigation and script sections from the template files.

**Header Navigation (from `includes/header.html`):**
```html
<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
  <!-- ... navigation content ... -->
</nav>
```

**Footer Scripts (from `includes/footer.html`):**
```html
<script src="../js/jquery.min.js"></script>
<!-- ... other scripts ... -->
```

### Option 2: Server-Side Includes (Recommended for Production)
If you move to a server that supports SSI or PHP:

**PHP Include:**
```php
<?php include 'includes/header.html'; ?>
<!-- Your page content -->
<?php include 'includes/footer.html'; ?>
```

**Apache SSI:**
```html
<!--#include virtual="/includes/header.html" -->
<!-- Your page content -->
<!--#include virtual="/includes/footer.html" -->
```

### Option 3: JavaScript Dynamic Loading
Add to your blog post HTML:
```html
<div id="header-placeholder"></div>
<!-- Your page content -->
<div id="footer-placeholder"></div>
<script src="../js/common-loader.js"></script>
```

## Benefits
1. **Single Source of Truth**: Update navigation in one place
2. **Consistency**: All pages use the same header/footer structure
3. **Maintainability**: Easy to update links, add menu items, or fix bugs
4. **Smaller Files**: Reduces individual file sizes

## Navigation Structure
Current navigation items:
- Home (../index.html#home-section)
- About (../index.html#about-section)
- Calculate (../index.html#calculate-section)
- Premium (../index.html#services-section)
- Blog (../blog.html)
- FAQ (../index.html#faq-section)
- Contact Us (../index.html#contact-section)

## Updating All Blog Posts
When you need to change the navigation:
1. Update `includes/header.html`
2. Copy the updated navigation to all blog post HTML files
3. Or use one of the automated inclusion methods above

## Future Improvements
Consider migrating to:
- Static site generator (Jekyll, Hugo, 11ty)
- Build process with templating (Webpack, Gulp)
- Server-side includes (PHP, SSI)
- Client-side framework (React, Vue) - only if needed
