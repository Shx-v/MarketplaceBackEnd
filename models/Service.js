import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Project Management",
      "CRM",
      "HR",
      "Marketing Automation",
      "Analytics and Business Intelligence",
    ],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  features: {
    type: [String],
    default: [],
  },
  noOfRating: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

serviceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
