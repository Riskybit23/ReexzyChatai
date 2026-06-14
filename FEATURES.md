# ReexzyChatai - Feature Documentation

## Core Features

### 1. User Authentication

**Technology:** Netlify Identity

- Secure login/signup
- Email verification
- Password management
- Optional: Social providers (Google, GitHub, etc.)
- JWT token handling

**Usage:**
```javascript
const identity = window.netlifyIdentity;
identity.init();
identity.open(); // Show login modal
```

### 2. Chat Interface

**Features:**
- Clean, responsive UI
- Auto-expanding textarea
- Real-time message rendering
- Typing indicators
- Scroll to latest message

**Keyboard Shortcuts:**
- `Enter` - Send message
- `Shift + Enter` - New line

### 3. AI Integration

**Provider:** OpenAI
**Models:** gpt-3.5-turbo, gpt-4 (configurable)

- System prompt customization
- Multi-language support
- Error handling
- API rate limiting

**Example:**
```javascript
const response = await fetch('/.netlify/functions/chat', {
  method: 'POST',
  body: JSON.stringify({ messages })
});
```

### 4. Cloud Sync

**Storage:** Notion Database

- Automatic save after each message
- Load history on login
- Per-user session tracking
- Timestamp tracking
- Full message context preservation

**Sync Flow:**
1. User sends message
2. Message displayed locally
3. AI response generated
4. Full conversation saved to Notion
5. User sees confirmation

### 5. Session Management

- Unique session IDs (UUID)
- LocalStorage persistence
- "New Chat" functionality
- Session history preservation

**Session Structure:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "messages": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

### 6. Error Handling

**Error Types:**
- Network errors
- API errors
- Authentication errors
- Validation errors

**User Feedback:**
- Status messages
- Error alerts
- Retry mechanisms
- Graceful degradation

### 7. Security

- JWT authentication
- Secure API calls
- Environment variable protection
- CORS handling
- Rate limiting (via OpenAI)
- No sensitive data in localStorage

---

## Advanced Features

### Serverless Functions

#### chat.js
```
POST /.netlify/functions/chat
Input: { messages }
Output: { reply }
Auth: Required (JWT)
```

#### history-load.js
```
GET /.netlify/functions/history-load?sessionId=xyz
Output: { messages }
Auth: Required (JWT)
```

#### history-save.js
```
POST /.netlify/functions/history-save
Input: { sessionId, messages }
Auth: Required (JWT)
```

### Notion Integration

**Database Schema:**
| Property | Type | Purpose |
|----------|------|----------|
| Name | Title | Chat title (auto-generated) |
| Session ID | Text | Unique identifier |
| User | Text | User email |
| Updated | Date | Last update timestamp |
| Messages | Text | JSON string of messages |

**Query Pattern:**
```
Filter: Session ID = "xyz" AND User = "user@email.com"
Sort: Updated DESC
```

### Multi-Language Support

The AI automatically detects and responds in the user's language:
- English
- Indonesian (Bahasa Indonesia)
- Spanish (Español)
- French (Français)
- German (Deutsch)
- Chinese (中文)
- Japanese (日本語)
- And 30+ more...

---

## Customization Options

### 1. System Prompt

**Location:** `App.js` (line 1-4)

```javascript
const SYSTEM_PROMPT = {
  role: "system",
  content: "You are a helpful AI assistant. Reply in the user's language."
};
```

**Examples:**
- "You are a Python coding expert"
- "You are a creative writing assistant"
- "You are a business consultant"

### 2. Styling

**Location:** `Style.css`

Customizable elements:
- Color scheme
- Font family
- Message styles
- Button designs
- Responsive breakpoints

### 3. AI Model

**Location:** Functions (chat.js)

Available models:
- `gpt-3.5-turbo` (fast, cheap)
- `gpt-4` (powerful, expensive)
- `gpt-4-turbo-preview` (latest)

### 4. Temperature & Parameters

**Creativity Control:**
```javascript
{
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,      // 0-2 (higher = more creative)
  "max_tokens": 1024,      // Response length
  "top_p": 1.0,            // Diversity
  "frequency_penalty": 0.0 // Repetition
}
```

---

## Performance Metrics

### Response Times
- Page load: < 2s
- Login: < 3s
- Message send: < 5s (including AI response)
- History load: < 2s

### Cost Estimates (Monthly)
- OpenAI: $5-50 (depending on usage)
- Netlify: Free-$20 (with functions)
- Notion: Free (if < 1000 requests/min)

### Scalability
- Concurrent users: Unlimited (via Netlify)
- Messages per day: Unlimited (via OpenAI limits)
- Storage: Unlimited (via Notion)

---

## Future Enhancements

- [ ] Voice input/output
- [ ] Image generation integration
- [ ] Code syntax highlighting
- [ ] Message reactions
- [ ] Chat sharing
- [ ] Export conversations
- [ ] Custom AI fine-tuning
- [ ] WebSocket for real-time sync
- [ ] Offline mode
- [ ] Plugin system

---

For technical questions, see [README.md](./README.md) and [SETUP.md](./SETUP.md)
