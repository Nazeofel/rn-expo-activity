// server.js
const express = require("express");
const cors = require("cors"); // Optional, for CORS handling

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS if your React Native app makes requests from a different origin
app.use(express.json()); // Middleware to parse JSON bodies
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Log the request method and URL
  console.log("Headers:", req.headers); // Log request headers
  console.log("Body:", req.body); // Log request body (for POST, PUT, etc.)
  if (req.query.platform) {
    req.query.platform = "web";
  }
  next(); // Pass the request to the next middleware or route handler
});

app.post("/api/token", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
