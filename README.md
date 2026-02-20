# Dattatreya S Vellal - Personal Website

Personal portfolio and blog website for Dattatreya S Vellal.

## GitHub Pages Deployment

This website is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Automatic Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow is defined in `.github/workflows/deploy.yml`.

### Manual Deployment

You can manually trigger a deployment:
1. Go to the "Actions" tab in the GitHub repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button

### Setup Instructions

To enable GitHub Pages for this repository:

1. Navigate to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
3. Once configured, the site will be available at: `https://dsvellal.github.io/dsvellal-website/`

### Local Development

This is a static HTML/CSS/JS website. To view locally:

1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local web server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Website Structure

- `index.html` - Main homepage
- `preview-dark.html` - Dark theme preview
- `css/` - Stylesheets
- `js/` - JavaScript files
- `images/` - Image assets
- `blog/` - Blog posts

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- GitHub Pages for hosting
- GitHub Actions for CI/CD
