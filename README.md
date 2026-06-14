# ReexzyChatai - Notion AI Chat v2

> An intelligent chat application with login/signup (Netlify Identity) and cloud synchronization to Notion database.

![JavaScript](https://img.shields.io/badge/JavaScript-71.6%25-yellow)
![CSS](https://img.shields.io/badge/CSS-17.5%25-blue)
![HTML](https://img.shields.io/badge/HTML-10.9%25-red)
![License](https://img.shields.io/badge/License-Apache%202.0-green)

## 🎯 Features

✅ **User Authentication** - Secure login/signup via Netlify Identity
✅ **Cloud Sync** - Chat history saved to Notion database
✅ **AI-Powered** - OpenAI integration for intelligent responses
✅ **Multi-Language** - Responds in user's language
✅ **Session Management** - Persistent session tracking
✅ **Responsive Design** - Works on desktop and mobile

## 📋 Prerequisites

- [Netlify Account](https://netlify.com)
- [OpenAI API Key](https://platform.openai.com/api-keys)
- [Notion Account](https://notion.so) with integration access
- Node.js 16+ (for local development)
- Git

## 🚀 Quick Start

### 1. Set Up Notion Database

Create a new Notion database with these properties:

| Property | Type |
|----------|------|
| Name | Title |
| Session ID | Text |
| User | Text |
| Updated | Date |
| Messages | Text |

### 2. Create Notion Integration

1. Go to [My Integrations](https://www.notion.com/my-integrations)
2. Click "Create new integration"
3. Name it "ReexzyChatai"
4. Copy the **Internal Integration Token** → `NOTION_API_KEY`
5. Add the integration to your database (Menu → Connections → Add connection)
6. Copy Database ID from URL (format: `https://notion.so/[DATABASE_ID]?v=...`) → `NOTION_DATABASE_ID`

### 3. Enable Netlify Identity

1. Deploy your site to Netlify (see Deployment section)
2. Go to **Site Settings → Identity → Enable Identity**
3. Configure Registration (Open or Invite only)
4. (Optional) Enable external providers (Google, GitHub, etc.)

### 4. Set Environment Variables

In Netlify dashboard → **Site Settings → Build & deploy → Environment**:

```
OPENAI_API_KEY=sk-...
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=...
```

### 5. Local Development

```bash
# Clone repository
git clone https://github.com/Riskybit23/ReexzyChatai.git
cd ReexzyChatai

# Install dependencies
npm install

# Create .env file (copy from .env.xample)
cp .env.xample .env
# Fill in your API keys

# Start development server
npm run dev
# Open http://localhost:8888
```

### 6. Deploy to Netlify

#### Option A: Git Integration (Recommended)

1. Push code to GitHub
2. Go to Netlify Dashboard
3. Click "New site from Git"
4. Select GitHub repository
5. Set build command: `npm install`
6. Set publish directory: `.` (root)
7. Add environment variables
8. Deploy!

#### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 📁 Project Structure

```
ReexzyChatai/
├── Index.html              # Main HTML template
├── App.js                  # Frontend application logic
├── Style.css               # Styling
├── Package.json            # Dependencies
├── Netlify.toml            # Netlify configuration
├── .netlify/
│   └── functions/          # Netlify serverless functions
│       ├── chat.js         # OpenAI chat endpoint
│       ├── history-load.js # Load chat history from Notion
│       └── history-save.js # Save chat history to Notion
├── .env.xample             # Environment variables template
└── .gitignore              # Git ignore rules
```

## 🔧 API Endpoints (Netlify Functions)

### POST `/.netlify/functions/chat`

Sends a message to OpenAI and returns AI response.

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

**Response:**
```json
{
  "reply": "Hi! How can I help you today?"
}
```

### GET `/.netlify/functions/history-load?sessionId=xyz`

Retrrieves chat history from Notion.

**Response:**
```json
{
  "messages": [
    {"role": "user", "content": "..."}
  ]
}
```

### POST `/.netlify/functions/history-save`

Saves chat history to Notion.

**Request:**
```json
{
  "sessionId": "xyz",
  "messages": [...]
}
```

## 🎨 Customization

### Change AI Model

Edit `App.js` or serverless function:
```javascript
const model = "gpt-4"; // or "gpt-3.5-turbo"
```

### Modify System Prompt

In `App.js`:
```javascript
const SYSTEM_PROMPT = {
  role: "system",
  content: "Your custom system prompt here..."
};
```

### Customize Styling

Edit `Style.css` to match your branding.

## 🐛 Troubleshooting

### "Belum login" error
- Make sure Netlify Identity is enabled
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

### API key errors
- Verify `OPENAI_API_KEY` is set correctly
- Check OpenAI account has available credits
- Ensure `NOTION_API_KEY` and `NOTION_DATABASE_ID` are correct

### Chat history not syncing
- Check Notion integration has database access
- Verify database properties match exactly
- Review Netlify function logs

## 📝 Environment Variables

Create `.env` file in root:

```
OPENAI_API_KEY=sk-your-key-here
NOTION_API_KEY=secret_your-key-here
NOTION_DATABASE_ID=your-database-id
```

## 📚 Learn More

- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Notion API Docs](https://developers.notion.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

## 📄 License

Apache License 2.0 - See [LICENSE](./LICENSE) file

## 👨‍💻 Author

**Riskybit23** - [GitHub Profile](https://github.com/Riskybit23)

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

For issues and questions:
- [GitHub Issues](https://github.com/Riskybit23/ReexzyChatai/issues)
- [GitHub Discussions](https://github.com/Riskybit23/ReexzyChatai/discussions)

---

**Made with ❤️ by Riskybit23**
