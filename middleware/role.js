export default function (roles) {
  return (req, res, next) => {
    try {
      console.log("role middleware called");
      if (!roles.includes(req.user.roles[0])) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Invalid token" });
    }
  };
}
