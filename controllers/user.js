import { v4 as uuidv4 } from "uuid";
import Url from "../models/url.js";
import User from "../models/user.js";
import { setUser } from "../service/auth.js";

async function UserSignup(req, res){
  const {name, email, password} = req.body;
  const user = await User.create({
    name,
    email,
    password
  });

  // return res.status(201).json(user);
  return res.redirect("/login");
}

async function UserLogin(req, res){
  const {email, password} = req.body;
  
  const user = await User.findOne({email: {$eq: email}});
  if(!user) return res.status(400).json({err: "No user found"})
  
  if(user.password !== password)  return res.status(400).json({err: "Wrong password"});

  // const sessionId = uuidv4();
  const token = setUser(user);

  // instead of maintaining session data, we can maintain stateless auth
  // using jwt, match the token with secret key to decode the original user

  // res.cookie("uid", sessionId);
  res.cookie("token", token);

  // handling token to devices that doesnt work with cookies, like mobile phone
  
  // return res.json({token});
  return res.redirect("/");
}

export {
  UserSignup,
  UserLogin
}