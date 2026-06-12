import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// rich_text Notion dibatasi ~2000 char per item, jadi JSON dipecah.
function toRichText(str) {
  const chunks = str.match(/[\s\S]{1,1900}/g) || [""];
  return chunks.map((c) => ({ type: "text", text: { content: c } }));
}

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { user } = context.clientContext || {};
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }
  try {
    const userId = user.sub; // id unik pengguna Netlify Identity
    const { sessionId, title, messages } = JSON.parse(event.body || "{}");
    const json = JSON.stringify(messages);

    const firstUser = messages.find((m) => m.role === "user");
    const autoTitle =
      title || (firstUser ? firstUser.content.slice(0, 60) : "Chat " + sessionId.slice(0, 8));

    const props = {
      Name: { title: [{ text: { content: autoTitle } }] },
      "Session ID": { rich_text: [{ text: { content: sessionId } }] },
      User: { rich_text: [{ text: { content: userId } }] },
      Updated: { date: { start: new Date().toISOString() } },
      Messages: { rich_text: toRichText(json) },
    };

    const existing = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: "Session ID", rich_text: { equals: sessionId } },
          { property: "User", rich_text: { equals: userId } },
        ],
      },
    });

    if (existing.results.length) {
      await notion.pages.update({ page_id: existing.results[0].id, properties: props });
    } else {
      await notion.pages.create({
        parent: { database_id: databaseId },
        properties: props,
      });
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
