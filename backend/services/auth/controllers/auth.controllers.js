import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.mode.js";
import redis from "../../../shared/redis/redis.js";

export const loginUser = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }
    // Storing session ID in a cookie for session management
    // I could use JWT for session management, but for simplicity, I'm using a session ID stored in a cookie.
    const sessionId = crypto.randomUUID();

    await redis.set(
      `user-session-${user?._id}`, // setting session id into redis
      sessionId,
      "EX",
      24 * 60 * 60,
    );

    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      24 * 60 * 60,
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false, // To be true when deployed
      sameSite: "strict", // "none" when deployed
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login error: ${error}` });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    await redis.del(`session-${sessionId}`); // clearing session from redis

    // clearing session from cookie
    res.clearCookie("session");
    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error}` });
  }
};

export const updateUserPayment = async (req, res) => {
  try {
    const { plan, credits, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.plan = plan;
    user.credits += credits;
    user.totalCredits += credits;
    user.planExpiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000);
    await user.save();

    // updating user into redis
    const sessionId = await redis.get(`user-session-${user?._id}`);

    if (!sessionId) {
      return res.status(401).json({ message: "Session cookie is missing" });
    }
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      24 * 60 * 60,
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Update user payment error: ${error}` });
  }
};

export const deductCredits = async(req, res) => {
  try {
    const {userId, agent} = req.body
    const COST = {chat: 2, search: 5, coding: 25, pdf: 10, ppt: 20, vision: 30}
    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({message: "User not found!"})
    }
    const requiredCredits = COST[agent] || 2
    if(user.credits < requiredCredits) {
      return res.status(400).json({message: "Not enough credits!"})
    }
    user.credits -= requiredCredits
    await user.save()

    const sessionId = await redis.get(`user-session-${user?._id}`);

    if (!sessionId) {
      return res.status(401).json({ message: "Session cookie is missing" });
    }
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        credits: user.credits,
        totalCredits: user.totalCredits,
        planExpiresAt: user.planExpiresAt,
      }),
      "EX",
      24 * 60 * 60,
    );
    return res.status(200).json({ success: true, credits: user.credits });
  } catch (error) {
    return res.status(500).json({ message: `Deduction credits error: ${error}` });
  }
}
