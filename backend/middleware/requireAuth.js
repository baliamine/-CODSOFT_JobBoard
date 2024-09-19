const jwt = require("jsonwebtoken");
const User=require("../models/user");

const requireAuth = async (req, res, next) => {
  // verifiy auth
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this route" });
  }

  const token = authorization.split(" ")[1];
  try{
    const {_id}= jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({_id}).select('_id');
    next();
  }catch(e){
    console.log('error', e)
    return res.status(401).json({ error: "Invalid token" });
  }
};


module.exports=requireAuth;