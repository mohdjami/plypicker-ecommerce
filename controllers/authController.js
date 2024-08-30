import jwt from "jsonwebtoken";
import sendOneTimeLink from "../utils/emailService.js";
import User from "../models/User.js";
import cookie from "cookie";

import mongoose from "mongoose";

const createTokenAndSendResponse = async (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  const cookieOptions = {
    httpOnly: true,
    sameSite: "Lax", // or "Lax" if you're testing on localhost without HTTPS
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.cookie("jwt", token, cookieOptions);
  res.on("finish", () => {});
  res.json({ user: payload.user, token });
};

export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = new User({ email, password, roles: role });
    await user.save();
    res.status(201).json({ email, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, roles } = req.body;
    const user = new User({ email, password, roles });
    await user.save();

    // Send a one-time link for verification
    await sendOneTimeLink(email);

    res.status(201).json({
      message: "User registered. Please check your email for verification.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export async function isLoggedIn(req, res) {
  try {
    let token;
    const cookies = cookie.parse(req.headers.cookie || "");
    token = req?.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      token = cookies.jwt;
    }
    if (!token) {
      return res.status(401).json({ error: "User is not logged in" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    user.password = undefined;
    const payload = { user };
    await createTokenAndSendResponse(payload, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export async function getUser(req, res) {
  try {
    const user = req.user;
    // const user = await User.findById(req.user.user._id);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
