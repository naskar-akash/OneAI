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
    await redis.set(`session-${sessionId}`,JSON.stringify({
      userId: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }),"EX",7 * 24 * 60 * 60)

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
