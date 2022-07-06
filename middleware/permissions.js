const User = require("../models/Users");
const jwt = require("jsonwebtoken");
//grab access token from request, verifty cookie using jwt, check if cookie is attached to a user, if it is we know they are authorised
const requiresAuth = async (req, res, next) => {
  
  const token = req.cookies["access-token"];
  let isAuthed = false;
 
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      try {
        const user = await User.findById(userId);
 
        if (user) {
          const userToReturn = { ...user._doc };
          delete userToReturn.password;
          req.user = userToReturn;
          isAuthed = true;
        }
      } catch {
        isAuthed = false;
      }
    } catch {
      isAuthed = false;
    }
  }
 
  if (isAuthed) {
    return next();
  } else {
    return res.status(401).send("Unauthorised");
  }
};
 
module.exports = requiresAuth;
