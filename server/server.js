// proxy.js
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors"; // Optional, for CORS handling
import { join } from "path";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
const PORT = 3000; // Proxy server port

app.use(express.static(join(process.cwd(), "dist")));

app.use(cors()); // Enable CORS if your React Native app makes requests from a different origin
app.use(express.json()); // Middleware to parse JSON bodies
// app.use((req, res, next) => {
//   res.removeHeader("Content-Security-Policy");
//   //   if (req.query.platform) {
//   //     req.query.platform = "web";
//   //   }
//   next(); // Pass the request to the next middleware or route handler
// });

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
// app.use(
//   "/", // Adjust the path if you want to forward specific routes
//   createProxyMiddleware({
//     target: "http://localhost:3000", // Main server
//     changeOrigin: true,
//     pathRewrite: {
//       "/": "", // Remove '/api' from the request URL if necessary
//     },
//   })
// );

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
