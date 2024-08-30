import Product from "../models/Product.js";
import ReviewRequest from "../models/Review.js";
import Submission from "../models/Submissions.js";
// es module

import pkg from "lodash";
const { isEqual, uniq } = pkg;
const getUpdatedKeys = (oldData, newData) => {
  const data = uniq([...Object.keys(oldData), ...Object.keys(newData)]);
  const keys = [];
  for (const key of data) {
    if (!isEqual(oldData[key], newData[key])) {
      keys.push(key);
    }
  }

  return keys;
};
export const submitProduct = async (req, res) => {
  try {
    const { productId, userId, updatedFields } = req.body;
    const product = await Product.findById(productId);

    const changes = {};
    Object.keys(updatedFields).forEach((key) => {
      // Check if the key exists in both product and updatedFields
      if (product[key] && updatedFields[key]) {
        if (product[key] !== updatedFields[key]) {
          changes[key] = updatedFields[key];
        }
      }
    });

    const submission = new Submission({
      productId,
      userId,
      updatedFields: changes,
    });
    await submission.save();
    const reviewRequest = new ReviewRequest({
      submissionId: submission._id,
    });
    await reviewRequest.save();
    res.status(201).json({ submission, reviewRequest });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const user = req.user;
    const submissions = await Submission.find({
      userId: user._id,
    });
    const length = submissions.length;
    let approved = 0;
    let rejected = 0;
    let pending = 0;
    submissions.map((item) => {
      if (item.status === "approved") {
        approved++;
      }
      if (item.status === "rejected") {
        rejected++;
      }
      if (item.status === "pending") {
        pending++;
      }
    });
    console.log(submissions);
    res.json({
      length,
      submissions,
      approved,
      rejected,
      pending,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export async function getSubmissionsData(req, res) {
  try {
    const submissions = await Submission.find();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
