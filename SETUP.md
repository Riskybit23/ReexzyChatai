# Complete Setup Guide - ReexzyChatai

## Step-by-Step Installation

### Prerequisites Checklist

- [ ] Netlify account created
- [ ] OpenAI API key obtained
- [ ] Notion account with database created
- [ ] Git installed
- [ ] Node.js 16+ installed

---

## Part 1: Notion Setup (10 minutes)

### 1.1 Create Database

1. Open [notion.so](https://notion.so)
2. Create a new page
3. Add a Database → Table
4. Name it "ChatHistory" or similar

### 1.2 Add Database Properties

Delete default properties and add:

**Property 1:**
- Name: `Name`
- Type: `Title`

**Property 2:**
- Name: `Session ID`
- Type: `Text`

**Property 3:**
- Name: `User`
- Type: `Text`

**Property 4:**
- Name: `Updated`
- Type: `Date`

**Property 5:**
- Name: `Messages`
- Type: `Text`

### 1.3 Get Database ID

1. Open your database
2. Click "Copy link"
3. URL format: `https://notion.so/workspace/[DATABASE_ID]?v=...`
4. Extract the long ID before the `?`
5. Save as `NOTION_DATABASE_ID`

### 1.4 Create Integration

1. Visit [My Integrations](https://www.notion.com/my-integrations)
2. Click "+ New Integration"
3. Fill form:
   - Name: "ReexzyChatai"
   - Logo: (optional)
   - Associated workspace: Select your workspace
4. Click "Create integration"
5. Go to "Secrets" tab
6. Copy "Internal Integration Token"
7. Save as `NOTION_API_KEY`

### 1.5 Connect Integration to Database

1. Open your Notion database
2. Click "..." (top right)
3. Select "Add connections"
4. Find and select "ReexzyChatai" integration
5. Click "Confirm"

---

## Part 2: OpenAI Setup (5 minutes)

### 2.1 Create API Key

1. Go to [platform.openai.com](https://platform.openai.com/account/api-keys)
2. Click "Create new secret key"
3. Copy the key (only shown once!)
4. Save as `OPENAI_API_KEY`

### 2.2 Add Billing

1. Go to [Billing Settings](https://platform.openai.com/account/billing/overview)
2. Add payment method
3. Set usage limits (recommended for safety)

---

## Part 3: Local Development (15 minutes)

### 3.1 Clone Repository

```bash
git clone https://github.com/Riskybit23/ReexzyChatai.git
cd ReexzyChatai
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Create Environment File

```bash
cp .env.xample .env
```

### 3.4 Fill Environment Variables

Edit `.env`:

```env
OPENAI_API_KEY=sk-...
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=abc123...
```

### 3.5 Start Development Server

```bash
npm run dev
```

Open `http://localhost:8888` in browser

### 3.6 Test Locally

1. Click "Login / Sign up"
2. Enter test credentials
3. Type a message
4. Verify response from OpenAI
5. Check Notion database for saved messages

---

## Part 4: Deploy to Netlify (10 minutes)

### 4.1 Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 4.2 Create Netlify Site

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Select "Import an existing project"
4. Choose "GitHub"
5. Authorize GitHub
6. Select `ReexzyChatai` repository
7. Click "Deploy site"

### 4.3 Configure Build Settings

Netlify should auto-detect. Verify:
- **Build command**: Leave empty (static site)
- **Publish directory**: `.`
- **Runtime**: Node.js (for functions)

### 4.4 Add Environment Variables

1. Site settings → Build & deploy → Environment
2. Add variables:
   - `OPENAI_API_KEY`: sk-...
   - `NOTION_API_KEY`: secret_...
   - `NOTION_DATABASE_ID`: ...
3. Trigger redeploy

### 4.5 Enable Netlify Identity

1. Site settings → Identity → Enable
2. Invitation settings: Choose "Open" for public signup
3. External providers (optional):
   - Enable Google, GitHub, etc.
   - Configure OAuth apps

### 4.6 Verify Deployment

1. Visit your Netlify domain (e.g., `https://mysite.netlify.app`)
2. Test login/signup
3. Send test message
4. Verify response and Notion sync

---

## Troubleshooting

### Issue: "Notion API Error"

**Solution:**
- [ ] Database ID is correct
- [ ] API key is valid
- [ ] Integration has database access
- [ ] All required properties exist in database

### Issue: "OpenAI API Error"

**Solution:**
- [ ] API key is valid and not expired
- [ ] Account has available credits
- [ ] API is enabled in account settings

### Issue: "Login button not working"

**Solution:**
- [ ] Netlify Identity is enabled
- [ ] Site is deployed (won't work on localhost with Netlify Identity)
- [ ] Clear browser cache
- [ ] Check browser console for errors

### Issue: "Chat history not saving"

**Solution:**
- [ ] Notion integration connected
- [ ] Database properties match exactly
- [ ] User is logged in
- [ ] Check Netlify function logs

---

## Next Steps

1. ✅ Customize system prompt in `App.js`
2. ✅ Update styling in `Style.css`
3. ✅ Configure allowed models in functions
4. ✅ Add custom branding
5. ✅ Set up custom domain in Netlify

---

## Need Help?

- 📖 [Full README](./README.md)
- 🐛 [Report Issues](https://github.com/Riskybit23/ReexzyChatai/issues)
- 💬 [GitHub Discussions](https://github.com/Riskybit23/ReexzyChatai/discussions)
