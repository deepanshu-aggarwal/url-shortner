import { getUser } from "../service/auth.js";

function checkForAuthentication(req, res, next){
  // const authorizationHeaderValue = req.headers?.["authorization"];
  const tokenCookie = req.cookies?.token;
  req.user = null;

  // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer "))
  //   return next();  

  if(!tokenCookie)  return next();

  // const token = authorizationHeaderValue.split("Bearer ")[1];

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles){
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");
    if(!roles.includes(req.user.role))  return res.end("Unauthorized");

    return next();
  }
}


// function restrictToLoggedinUserOnly(req, res, next){
//   // const userUid = req.cookies?.uid;

//   // handling auth without cookies
//   // const userUid = req.headers?.["authorization"].split("Bearer ")[1];

//   if(!userUid)  return res.redirect("/login");
  
//   const user = getUser(userUid);
//   if(!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// function checkAuth(req, res, next){
//   // const userUid = req.cookies?.uid;

//   const userUid = req.headers.authorization.split("Bearer ")[1];
  
//   // header + "." + payload are hashed with secret key to generate the signature
//   // is any changes are done in anything, results in unmatched pairs of above mentioned
//   // if secret key is not known, then the signature can't be matched because the hashed value will always be wrong
//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

export {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
}