import express from "express";
import cors from "cors";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
const PORT = 3000;

app.use(express.static(join(process.cwd(), "dist")));

app.use(cors());
app.use(express.json());
app.post("/api/token", async (req, res) => {
  const { code } = await req.body;

  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
    }),
  });
  const { access_token } = await response.json();
  return res.send({ access_token });
});

app.get("*", (req, res) => {
  res.sendFile(join(process.cwd(), "dist", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
