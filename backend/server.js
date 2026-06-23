const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const interviewRoutes = require("./routes/interviewRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database Connected",
      time: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database Error" });
  }
});

app.get(
  "/api/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected Route Accessed",
      user: req.user,
    });
  }
);

const PORT = process.env.PORT || 5200;

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});