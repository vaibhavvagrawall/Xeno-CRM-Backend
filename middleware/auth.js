const isAuthenticated = (req, res, next) => {
  console.log('Session:', req.session);
  console.log('Authentication check:', req.isAuthenticated()); 
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized: Please log in" });
};

module.exports = isAuthenticated;
