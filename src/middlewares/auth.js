const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { prisma } = require("../../prisma/prisma");
const { TOKEN_SECRET } = process.env;

exports.isAuth = async (req, res, next) => {
  
  try {
   
    let {authorization} = req.headers;

    authorization = authorization.split("Bearer ").join('');

    let verifiedToken = jwt.verify(authorization, TOKEN_SECRET);

    let user = await prisma.users.findUnique({where: {id: verifiedToken.userId}});


    if (!user) {
      throw new Error("Unauthorized !");
    }

    if (!user.tokens.includes(authorization)) {
      throw new Error("Unauthorized !");
    }

    if (user.roles.includes('admin')) {

      delete user.password
      delete user.tokens;

      req.user = user;
      

    } else{
      throw new Error("Access only for super admin!");
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Unauthorized !"
    })
  }
}



