import jwt from "jsonwebtoken";
import User from "../models/User.js";
export default async function authMiddleware(req, res, next) {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
    //validae the token or verification
    //this ensures that the token is not tempered by someone
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    //check if the user exist//
    //this ensures that no one can delete the user and still use the token
    const currentUser = await User.findById(decoded.user._id);
    if (!currentUser) {
      return next(
        res
          .status(401)
          .json({ error: "User belonging to this token does no longer exist" })
      );
    }
    // const token = req.header("Authorization")?.replace("Bearer ", "");

    // let jwt;
    // console.log("auth middleware");
    // // console.log(req);
    // const cookies = cookie.parse(req.headers.cookie || "");
    // console.log("cok", req.cookies.jwt);
    // console.log("token from cookie", cookies.jwt);
    // console.log("token from header bearer", token);
    // if (jwt === null || undefined) {
    //   jwt = cookies.jwt;
    // }
    // console.log("final token", token);

    // if (!token || token === undefined) {
    //   return res.status(401).json({ error: "Access denied" });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
}
