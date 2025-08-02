import express from "express";
import {
  bookCar,
  checkAvailabilityOfCar,
  changeBookingStatus,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/BookingController.js";
import { protect } from "../middleware/Auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", protect, checkAvailabilityOfCar);
bookingRouter.post("/create", protect, bookCar);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;
