const { default: validator } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const { TOKEN_SECRET } = process.env;

const { prisma } = require("../../prisma/prisma");



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) {
      throw new Error("Please check the information entered!");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email address Invalid !");
    }

    let user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not existing!");
    }

    let isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Identifiants incorrects !");
    }

    delete user.password;
    delete user.tokens;

    const token = jwt.sign({ userId: user.id }, TOKEN_SECRET);

    await prisma.users.update({
      where: { id: user.id },
      data: {
        tokens: [token],
        lastLogin: new Date(),
      },
    });
    console.log('====================================');
    console.log(token);
    console.log('====================================');
    return res.status(200).json({
      success: true,
      message: "Connected successfully!",
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.checkToken = async (req, res) => {
  try {
    if (req.user) {
      await prisma.users.update({
        where: { id: req.user.id },
        data: { lastLogin: new Date() },
      });

      return res.status(200).json({
        success: true,
        message: "",
        user: req.user,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    await prisma.users.update({
      where: { id: req.user.id },
      data: { tokens: [] },
    });

    return res.status(200).json({
      success: true,
      message: "Vous êtes maintenant déconnecté !",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



