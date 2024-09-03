const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

let handleUserSignIn = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

let handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      err: "Invalid email or password",
    });
  }
  let token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");

  //  when not sending token in cookie cookie
  // res.json({token})

  // when sending token in cookie cookie
  // res.cookie("uid" , token)

  // for session

  // const uid = uuidv4();
  // setUser(uid , user)
  // res.cookie("uid" , uid)
};

module.exports = {
  handleUserSignIn,
  handleUserLogin,
};
