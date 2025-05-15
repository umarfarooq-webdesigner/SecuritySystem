require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const diaryRoutes = require("./routes/diary");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using the MONGO_URI_GUEST
mongoose
  .connect(process.env.MONGO_URI_GUEST)
  .then(() => console.log("Connected to smart_security MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/diary", diaryRoutes);

const PORT = process.env.PORT_DIARY || 5002;
app.listen(PORT, () => {
  console.log(`Diary server running on port ${PORT}`);
});
