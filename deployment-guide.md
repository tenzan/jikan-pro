# Deploying Your Jikan Pro

This guide provides instructions for deploying your Jikan Pro to Vercel and setting up your GitHub repository.

## GitHub Repository Setup

1. **Create a new repository on GitHub**:
   - Go to github.com and log in to your account
   - Click on the "+" icon in the top right corner and select "New repository"
   - Name your repository (e.g., "jikan-pro")
   - Choose whether to make it public or private
   - Don't initialize with a README, .gitignore, or license
   - Click "Create repository"

2. **Upload the code to GitHub**:
   - Extract the ZIP file to a local folder on your computer
   - Open a terminal or command prompt
   - Navigate to the extracted folder
   - Run the following commands (replace YOUR_USERNAME with your GitHub username and REPO_NAME with your repository name):

   ```bash
   git init
   git add .
   git commit -m "Initial commit of Jikan Pro"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git push -u origin main
   ```

## Vercel Deployment

1. **Deploy to Vercel from GitHub**:
   - Go to vercel.com and sign in (or create an account)
   - Click "Add New" → "Project"
   - Connect your GitHub account if you haven't already
   - Select the repository you just created
   - Vercel will automatically detect it's a Next.js project
   - Configure your project settings:
     - Set the Environment Variables from the .env file
     - Configure the Neon DB connection
   - Click "Deploy"

2. **Environment Variables to Set in Vercel**:
   - `DATABASE_URL`: Your Neon DB connection string
   - `NEXTAUTH_URL`: Your Vercel deployment URL
   - `NEXTAUTH_SECRET`: A secure random string for NextAuth
   - `MAILGUN_API_KEY`: Your Mailgun API key (if implementing email notifications)
   - `MAILGUN_DOMAIN`: Your Mailgun domain
   - `MAILGUN_FROM_EMAIL`: The email address to send from
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: For Google OAuth
   - `MICROSOFT_CLIENT_ID` and `MICROSOFT_CLIENT_SECRET`: For Microsoft OAuth

## Setting Up Neon DB

1. **Create a Neon DB Account**:
   - Go to neon.tech and sign up
   - Create a new project
   - Create a new database

2. **Get Your Connection String**:
   - In your Neon dashboard, go to the "Connection Details" tab
   - Copy the connection string
   - Add it to your Vercel environment variables as `DATABASE_URL`

3. **Run Database Migrations**:
   - After deployment, you'll need to run the Prisma migrations
   - You can do this from your local machine:
   ```bash
   npx prisma migrate deploy
   ```

## Additional Configuration

1. **Setting Up OAuth Providers**:
   - For Google: Go to the Google Cloud Console, create a project, and set up OAuth credentials
   - For Microsoft: Go to the Microsoft Azure Portal, register an app, and set up OAuth credentials
   - Add the callback URLs to your OAuth providers (e.g., `https://your-vercel-app.vercel.app/api/auth/callback/google`)

2. **Setting Up Mailgun**:
   - Create a Mailgun account
   - Verify your domain
   - Get your API key and add it to your Vercel environment variables

## Troubleshooting

If you encounter any issues during deployment:
- Check your environment variables
- Ensure your database connection string is correct
- Verify that your OAuth credentials are set up correctly
- Check the Vercel deployment logs for any errors
