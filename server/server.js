import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js"
import userRouter from "./routes/UserRoutes.js";
import ownerRouter from "./routes/OwnerRoute.js";
import bookingRouter from "./routes/BookingRoute.js";
const app = express();
await connectDB();

app.use(cors());
app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
    res.json({ message: "Car Rental API is running successfully!" });
});

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);






// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});