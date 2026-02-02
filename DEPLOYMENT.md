# Deployment Guide - Kamus Milenial

## Quick Deploy to Netlify

### Option 1: Deploy via Netlify UI (Recommended)

1. **Login to Netlify**
   - Go to https://app.netlify.com
   - Login with your GitHub account

2. **Import Repository**
   - Click "Add new site" > "Import an existing project"
   - Choose "GitHub" as your Git provider
   - Select the `kasihtaumamang/kamus-milenial` repository

3. **Configure Build Settings**
   - Build command: Leave empty (or use: `npm run build`)
   - Publish directory: `public`
   - Functions directory: `netlify/functions`

4. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete (usually 1-2 minutes)

5. **Access Your Site**
   - Your site will be available at: `https://[random-name].netlify.app`
   - You can customize the domain in Site settings > Domain management

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site (from project root)
netlify init

# Deploy
netlify deploy --prod
```

## API Endpoints

Once deployed, your API will be available at:

```
https://your-app.netlify.app/api/words
https://your-app.netlify.app/api/search?q=alay
https://your-app.netlify.app/api/word/1
https://your-app.netlify.app/api/random
```

## Environment Variables

No environment variables are required for basic deployment.

## Custom Domain

To use a custom domain:

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS

## Continuous Deployment

Once connected to GitHub:
- Every push to the main branch triggers automatic deployment
- Pull requests create preview deployments
- Build logs are available in the Netlify dashboard

## Troubleshooting

### Functions Not Working
- Check that `netlify.toml` is in the root directory
- Verify the functions directory path is correct
- Check function logs in Netlify dashboard

### API CORS Issues
- CORS headers are already configured in the serverless functions
- If issues persist, check the Netlify dashboard for error logs

### Build Failures
- This project requires Node.js 14+
- No build step is required for the static files
- Functions are automatically built by Netlify

## Performance Optimization

The site is already optimized with:
- Static file hosting on Netlify CDN
- Serverless functions for API endpoints
- Minimal dependencies
- Optimized asset delivery

## Monitoring

Monitor your site via:
- Netlify Analytics (paid feature)
- Google Analytics (add your tracking code to index.html)
- Netlify function logs in the dashboard

## Support

For deployment issues:
- Check Netlify documentation: https://docs.netlify.com
- Review build logs in Netlify dashboard
- Check GitHub repository issues
