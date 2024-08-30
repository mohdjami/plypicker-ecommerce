import ReviewRequest from "../models/Review.js";
import Product from "../models/Product.js";
import Submission from "../models/Submissions.js";
export async function getRequests(req, res) {
  try {
    const user = req.user;
    const requests = await ReviewRequest.find().populate("submissionId");
    const Rlength = requests.length;
    let Rapproved = 0;
    let Rrejected = 0;
    let Rpending = 0;
    requests.map((item) => {
      if (item.status === "approved") {
        Rapproved++;
      }
      if (item.status === "rejected") {
        Rrejected++;
      }
      if (item.status === "pending") {
        Rpending++;
      }
    });
    res.json({
      Rlength,
      requests,
      Rapproved,
      Rrejected,
      Rpending,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function getRequestById(req, res) {
  try {
    const { id } = req.params;
    const request = await ReviewRequest.findById(id).populate("submissionId");
    res.json({ request });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function approveRequests(req, res) {
  try {
    const { requestId, adminId } = req.body;
    if (!requestId || !adminId) {
      throw new Error("Data Inefficient");
    }
    const reviewRequest = await ReviewRequest.findById(requestId).populate(
      "submissionId"
    );
    if (!reviewRequest || reviewRequest.status !== "pending")
      throw new Error("Invalid review request");
    let update = {};
    const submission = await Submission.findById(reviewRequest.submissionId);

    // Update product
    const product = await Product.findOneAndUpdate(
      { _id: submission.productId },
      update,
      {
        new: true,
      }
    );
    // Update submission and review request status
    submission.status = "approved";
    await submission.save();

    reviewRequest.status = "approved";
    reviewRequest.adminId = adminId;
    reviewRequest.reviewedAt = Date.now();
    await reviewRequest.save();
    res.json({
      submission,
      reviewRequest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function rejectRequest(req, res) {
  try {
    const { requestId, adminId, submissionId } = req.body;
    const submission = Submission.findById(submissionId);
    if (!submission || submission.status !== "pending")
      throw new Error("Invalid submission");
    await Submission.updateOne({
      _id: submissionId,
      status: "rejected",
    });
    await ReviewRequest.updateOne({
      _id: requestId,
      status: "rejected",
      adminId,
      reviewedAt: Date.now(),
    });
    res.json({ message: "Request rejected" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
