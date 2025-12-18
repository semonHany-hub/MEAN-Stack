export const verifyAdminRole = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied, admin only!" });
  else {
    next();
  }
};

//note: req content differ from one request to another
