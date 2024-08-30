import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewRequest = new Schema({
  submissionId: {
    type: Schema.Types.ObjectId,
    ref: "Submission",
    required: true,
  },
  adminId: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to admin user
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reviewedAt: { type: Date },
});

const ReviewRequest = mongoose.model("ReviewRequest", reviewRequest);
export default ReviewRequest;
