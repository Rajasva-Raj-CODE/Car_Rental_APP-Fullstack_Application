import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js"
import userRouter from "./routes/UserRoutes.js";
import ownerRouter from "./routes/OwnerRoute.js";
import bookingRouter from "./routes/BookingRoute.js";

const app = express();

// Connect to database
try {
  await connectDB();
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ message: "Car Rental API is running successfully!" });
});

app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});