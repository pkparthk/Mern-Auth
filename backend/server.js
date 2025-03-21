const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("API is running");
});

// SSL Configuration
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "../ssl/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../ssl/cert.pem")),
};

// Start the server
const PORT = process.env.PORT || 5000;

// Create HTTP server
app.listen(PORT, () => console.log(`HTTP Server running on port ${PORT}`));

// Create HTTPS server
https
  .createServer(sslOptions, app)
  .listen(process.env.HTTPS_PORT || 5001, () => {
    console.log(
      `HTTPS Server running on port ${process.env.HTTPS_PORT || 5001}`
    );
  });
