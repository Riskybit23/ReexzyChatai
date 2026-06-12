import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function handler(event, context) {
  const { user } = context.clientContext || {};
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }
  try {
    const userId = user.sub;
    const sessionId = event.queryStringParameters?.sessionId;
    if (!sessionId) {
      return { statusCode: 400, body: JSON.stringify({ error: "sessionId required" }) };
    }
    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: "Session ID", rich_text: { equals: sessionId } },
          { property: "User", rich_text: { equals: userId } },
        ],
      },
    });
    if (!res.results.length) {
      return { statusCode: 200, body: JSON.stringify({ messages: [] }) };
    }
    const rt = res.results[0].properties.Messages.rich_text;
    const json = rt.map((t) => t.plain_text).join("");
    const messages = json ? JSON.parse(json) : [];
    return { statusCode: 200, body: JSON.stringify({ messages }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
