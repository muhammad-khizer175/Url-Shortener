// token based
const jwt = require("jsonwebtoken");
const secret = "Galaxy$20";

let setUser = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    secret
  );
};

let getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};

// for session based

//  const sessionIdToUserMap = new Map()

//  let setUser = (id , user) =>{
//     sessionIdToUserMap.set(id , user)
//  }

//  let getUser = (id) =>{
//     return sessionIdToUserMap.get(id)
//  }
