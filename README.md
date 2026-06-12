# ReexzyChatai
This Exllent project By me
# Notion AI Chat — Login + Cloud Sync (v2)

Chat AI dengan login/sign up (Netlify Identity) dan riwayat tersimpan di database Notion.

## Prasyarat
- Akun Netlify
- OpenAI API key
- Notion integration + database

## 1. Database Notion (properti, nama harus persis)
- Name      : Title
- Session ID: Text
- User      : Text
- Updated   : Date
- Messages  : Text

## 2. Notion integration
- Buat integration, salin secret -> NOTION_API_KEY
- Hubungkan integration ke database (menu ... -> Connections)
- Salin Database ID dari URL -> NOTION_DATABASE_ID

## 3. Aktifkan Netlify Identity
- Netlify -> Site configuration -> Identity -> Enable Identity
- Registration: pilih Open atau Invite only
- (Opsional) aktifkan provider eksternal (Google, GitHub)

## 4. Environment variables di Netlify
- OPENAI_API_KEY
- NOTION_API_KEY
- NOTION_DATABASE_ID

## 5. Jalankan lokal
- npm install
- cp .env.example .env  (isi nilainya)
- npx netlify dev

## 6. Deploy
- npm install -g netlify-cli
- netlify deploy --prod
- atau import repo Git di dashboard Netlify
