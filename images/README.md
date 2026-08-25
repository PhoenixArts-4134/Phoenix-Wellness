# Phoenix Health & Wellness Centre - Images & Assets

## Image Placeholder Guide

This project uses the following image placeholders. Replace each with actual photography from the Phoenix Health & Wellness Centre.

### Image Files Required

```
images/
├── hero-main.jpg                 # Hero section main image (1200x600px recommended)
├── program-1.jpg                 # Essential Oil × Osteopathic Integrated Care (800x600px)
├── program-2.jpg                 # Pelvic & Spinal Health Management (800x600px)
├── program-3.jpg                 # Personalized Health Management (800x600px)
├── visual-break.jpg              # Full-width dramatic image (1920x500px)
├── about.jpg                      # About section image (600x600px)
├── map-placeholder.jpg           # Location map/placeholder (600x400px)
└── og-image.jpg                  # Social media preview (1200x630px)
```

## Image Specifications

### Quality & Format
- **Format**: Use `.jpg` for photos and `.webp` for modern browsers
- **Optimization**: Compress images to reduce file size while maintaining quality
- **Compression tools**: TinyJPG, ImageOptim, or similar

### Recommended Dimensions

| Image | Dimensions | DPI | Use |
|-------|-----------|-----|-----|
| hero-main.jpg | 1200x600 | 72 | Hero section hero-image div |
| program-1.jpg | 800x600 | 72 | Program block full-width |
| program-2.jpg | 800x600 | 72 | Program block full-width |
| program-3.jpg | 800x600 | 72 | Program block full-width |
| visual-break.jpg | 1920x500 | 72 | Full-width dramatic section |
| about.jpg | 600x600 | 72 | About section right column |
| map-placeholder.jpg | 600x400 | 72 | Contact section (can use actual Google Maps) |
| og-image.jpg | 1200x630 | 72 | Social media sharing preview |

## Photography Direction

### Hero Main Image
- Professional wellness consultation or manual therapy session
- Clean, well-lit environment
- Shows professionalism and trust
- Warm, calming aesthetic
- Suggested: Practitioner working with client in professional setting

### Program Images
- **Program 1**: Essential oils, aromatherapy elements, or integrated therapy
- **Program 2**: Pelvic/spinal assessment or posture consultation
- **Program 3**: Personalized health planning or one-on-one consultation
- All should feel premium and professional

### Visual Break Section
- Large, dramatic, full-width image
- Could be: hands-on assessment, wellness environment, or professional detail shot
- Should convey "listening" or "understanding"
- Needs to support text overlay with 40% dark overlay

### About Section
- Professional environment or team
- Wellness center ambiance
- Can show equipment, consultation area, or aromatherapy setup
- Square format preferred

### Map Placeholder
- Can be replaced with actual Google Maps embed
- Current placeholder for location reference
- Instructions in index.html for Google Maps integration

## Image Optimization Steps

1. **Take/Source Photos**
   - Use professional photography
   - Shoot in good lighting
   - Ensure consistent aesthetic

2. **Crop to Correct Ratio**
   - Use the dimensions above as guide
   - Consider mobile viewing

3. **Compress Images**
   ```bash
   # Using ImageMagick (if installed)
   convert input.jpg -quality 80 -resize 1200x600 output.jpg
   ```

4. **Add to Project**
   - Save in `images/` folder
   - Use exact filenames from list above
   - Verify paths in HTML: `images/filename.jpg`

## Adding WebP for Performance

For better performance on modern browsers, consider creating WebP versions:

1. **Using online converter**: https://cloudconvert.com/
2. **Update HTML** (fallback support):
   ```html
   <picture>
     <source srcset="images/hero-main.webp" type="image/webp">
     <img src="images/hero-main.jpg" alt="Professional wellness consultation">
   </picture>
   ```

## Responsive Image Handling

The CSS already handles responsive images:
- Images scale responsively with `max-width: 100%`
- Use `object-fit: cover` for consistent aspect ratios
- Lazy loading enabled on below-fold images

## Google Maps Integration

To replace map placeholder with actual Google Maps:

1. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Replace in contact section:
   ```html
   <div class="map-placeholder">
     <iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
   </div>
   ```

## SEO & Open Graph

Images are referenced in Open Graph meta tags for social media sharing:
- `og-image.jpg` is used when sharing on social platforms
- Ensure it's 1200x630px for optimal display
- Include relevant branding/location information in image

## File Size Targets

- **Hero images**: < 200KB each
- **Program images**: < 150KB each
- **Visual break**: < 300KB
- **Total images**: < 1.5MB
- **OG image**: < 200KB

## Accessibility

All images have `alt` text descriptions in the HTML:
- Descriptive alt text for all photos
- Screen readers can understand image content
- Update alt text if images change

## Quick Replace Guide

1. **Take new photo** or source professional image
2. **Optimize size** using tool of choice
3. **Save to** `images/` with correct filename
4. **Done!** No HTML changes needed - paths already exist

## Support for Development

If actual images aren't available yet:
- Use placeholder service: https://placeholder.com/
- Generate solid color backgrounds temporarily
- Update all images at once before launch

Example temporary placeholder:
```html
<img src="https://via.placeholder.com/1200x600/8b9e7c/ffffff?text=Hero+Image" alt="Professional wellness consultation">
```

---

**Questions?** Refer to the main README.md for project overview and deployment instructions.

