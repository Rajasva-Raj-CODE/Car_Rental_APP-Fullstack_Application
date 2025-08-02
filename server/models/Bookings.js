import mogoose from "mongoose";

const { ObjectId } = mogoose.Schema;

const bookingSchema = new mogoose.Schema(
  {
    car: {
      type: ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Booking = mogoose.model("Booking", bookingSchema);

export default Booking;
