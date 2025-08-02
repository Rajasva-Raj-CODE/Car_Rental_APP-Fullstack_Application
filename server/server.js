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



app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);






app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});