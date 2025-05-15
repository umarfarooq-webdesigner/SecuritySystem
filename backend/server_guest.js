const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const guestRoutes = require("./routes/guest"); // ✅ CORRECT

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI_GUEST)
  .then(() => console.log("Connected to guest MongoDB"))
  .catch((err) => console.error("MongoDB guest connection error:", err));

// Use guest routes
app.use("/api/guests", guestRoutes);

const PORT = process.env.PORT_GUEST || 5001;
app.listen(PORT, () => {
  console.log(`Guest server running on port ${PORT}`);
});
