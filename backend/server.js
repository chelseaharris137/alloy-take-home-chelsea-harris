const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/apiRoutes");

const app = express();

// Configure CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse JSON requests
app.use(express.json());

// Register routes
app.use("/api", apiRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
