const SYSTEM_PROMPT = {
  role: "system",
  content: "You are a helpful AI assistant. Reply in the user's language.",
};

let sessionId = localStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("sessionId", sessionId);
}

let messages = [];

const gate = document.getElementById("gate");
const appEl = document.getElementById("app");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userEmail = document.getElementById("userEmail");
const chatEl = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("input");
const statusEl = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChat");

// ---- Auth (Netlify Identity) ----
const identity = window.netlifyIdentity;
identity.init();

function showApp(user) {
  gate.classList.add("hidden");
  appEl.classList.remove("hidden");
  userEmail.textContent = user.email || "";
  loadHistory();
}

function showGate() {
  appEl.classList.add("hidden");
  gate.classList.remove("hidden");
}

identity.on("init", (user) => (user ? showApp(user) : showGate()));
identity.on("login", (user) => {
  identity.close();
  showApp(user);
});
identity.on("logout", () => {
  messages = [];
  showGate();
});

loginBtn.addEventListener("click", () => identity.open());
logoutBtn.addEventListener("click", () => identity.logout());

// Lampirkan JWT segar ke setiap request ke function.
async function authedFetch(url, options = {}) {
  const user = identity.currentUser();
  if (!user) throw new Error("Belum login");
  const token = await user.jwt(); // otomatis refresh bila perlu
  const headers = Object.assign({}, options.headers, {
    Authorization: "Bearer " + token,
  });
  return fetch(url, Object.assign({}, options, { headers }));
}

// ---- Chat ----
function render() {
  chatEl.innerHTML = "";
  for (const m of messages) {
    if (m.role === "system") continue;
    const div = document.createElement("div");
    div.className = "msg " + m.role;
    div.textContent = m.content;
    chatEl.appendChild(div);
  }
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function loadHistory() {
  statusEl.textContent = "Memuat riwayat…";
  try {
    const res = await authedFetch(
      "/.netlify/functions/history-load?sessionId=" + encodeURIComponent(sessionId)
    );
    const data = await res.json();
    messages = data.messages && data.messages.length ? data.messages : [SYSTEM_PROMPT];
  } catch {
    messages = [SYSTEM_PROMPT];
  }
  render();
  statusEl.textContent = "";
}

async function saveHistory() {
  try {
    await authedFetch("/.netlify/functions/history-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, messages }),
    });
  } catch (err) {
    console.warn("Sync gagal:", err);
  }
}

async function send() {
  const text = input.value.trim();
  if (!text) return;
  messages.push({ role: "user", content: text });
  input.value = "";
  autoResize();
  render();
  statusEl.textContent = "AI sedang mengetik…";
  sendBtn.disabled = true;
  try {
    const res = await authedFetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request gagal");
    messages.push({ role: "assistant", content: data.reply || "(tidak ada balasan)" });
    render();
    await saveHistory();
    statusEl.textContent = "";
  } catch (err) {
    statusEl.textContent = "Error: " + err.message;
  } finally {
    sendBtn.disabled = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  send();
});

// Enter = kirim, Shift+Enter = baris baru
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

function autoResize() {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 160) + "px";
}
input.addEventListener("input", autoResize);

newChatBtn.addEventListener("click", () => {
  sessionId = crypto.randomUUID();
  localStorage.setItem("sessionId", sessionId);
  messages = [SYSTEM_PROMPT];
  render();
});
