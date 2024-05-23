const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const announcementRoutes = require("./routes/announcementroutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not set

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/announcements", announcementRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
