const { getUser } = require("../services/auth");

let checkForAuthentication = (req, res, next) => {
  let tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  let token = tokenCookie;
  let user = getUser(token);
  req.user = user;
  return next();
};

let restrictTo = (roles) => {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("Unauthorized");
    return next();
  };
};

module.exports = {
  checkForAuthentication,
  restrictTo,
};

// let restricToLoggedInUser = (req, res, next) => {

// when not sending token in cookies

// if (!userUid) return res.redirect("/login");
// let userUid = req.headers["authorization"];

// if (!token) return res.redirect("/login");
// let token = userUid.split("Bearer ")[1];

// let user = getUser(token);

// when using cookies

// let userUid = req.cookies?.uid;
// req.cookies?.uid  = means if cookies exist check its uid
// if (!userUid) return res.redirect("/login");

//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// };

// let checkAuth = (req, res, next) => {

//   next();
// };
