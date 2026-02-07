const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const baseRoutes = require("./Routes/landingPage.route");
const jewelleryRoutes = require("./Routes/Jewelley.route");
const authRoutes = require("./Routes/auth.Route");
const franchiseRoutes = require("./Routes/franchies.routes");

// Import DB connection
const connectDB = require("./db/database");

// Load environment variables (for local dev only)
dotenv.config();

// Connect to DB (run once when function starts)
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/data", baseRoutes);
app.use("/api/jewellery", jewelleryRoutes);
app.use("/auth", authRoutes);
app.use("/api/form", franchiseRoutes);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})