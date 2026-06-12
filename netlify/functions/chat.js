export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { user } = context.clientContext || {};
  if (!user) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }
  try {
    const { messages } = JSON.parse(event.body || "{}");
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || "OpenAI error";
      return { statusCode: res.status, body: JSON.stringify({ error: msg }) };
    }
    const reply = data.choices?.[0]?.message?.content ?? "";
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
