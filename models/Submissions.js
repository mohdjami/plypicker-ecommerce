import mongoose from "mongoose";
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  updatedFields: { type: Map, of: Schema.Types.Mixed, required: true }, // Stores fields to be updated
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
