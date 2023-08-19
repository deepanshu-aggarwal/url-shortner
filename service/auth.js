// const sessionIdToUserMap = new Map();
import jwt from "jsonwebtoken";

const secret = "Deepanshu$123@$";

function setUser(user){
  // sessionIdToUserMap.set(id, user);

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
  // creating token with user data in it
  return jwt.sign(payload, secret);
}

function getUser(token){
  // return sessionIdToUserMap.get(id);

  if(!token)  return null;
  // returns the object, hashed during signing
  // secret key doesnt perform anything to hash the object
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export {
  setUser,
  getUser
}