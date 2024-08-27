import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Active", "Expired"],
    default: "Active",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

subscriptionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  if (!this.endDate) {
    const endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + 30);
    this.endDate = endDate;
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
