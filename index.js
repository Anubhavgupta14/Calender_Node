const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const getDataRoutes = require("./routes/getDataRoutes");
const authRoutes = require("./routes/authRoutes")
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use("/api/events", getDataRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
