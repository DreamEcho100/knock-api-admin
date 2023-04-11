const { default: validator } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { TOKEN_SECRET, EMAIL_ADMIN, MY_EMAIL_ADMIN } = process.env;
const { prisma } = require("../../prisma/prisma");
const { generateVerificationCode } = require("../utils/generator");
const SibApiV3Sdk = require("../utils/sendinblue");
const { readHTMLFile } = require("../utils/htmlFileFunction");
const path = require("path");
var handlebars = require("handlebars");

exports.login = async (req, res) => {
  try {
    const { email, password, verificationCode } = req.body;

    if ((!email || !password, !verificationCode)) {
      throw new Error("Please check the information entered!");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email address Invalid !");
    }

    let user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not existing!");
    }

    const verificationCodeFound = await prisma.verification_codes.findFirst({
      where: { AND: { email, code: verificationCode } },
    });

    if (!verificationCodeFound) {
      throw new Error("Invalid verification code!");
    }

    const isExpired = moment().isAfter(
      moment(verificationCodeFound.expiration)
    );

    if (isExpired) {
      await prisma.verification_codes.delete({
        where: { id: verificationCodeFound.id },
      });
      throw new Error("Verification code expired!");
    }

    let isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Incorrect credentials!");
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

exports.sendVerificationCode = async (req, res) => {
  try {
    let adminsEmail = await prisma.users.findMany();
    adminsEmail = adminsEmail.map((el) => el.email);

    const { email } = req.body;
    const generatedCode = generateVerificationCode();

    if (!validator.isEmail(email)) {
      throw new Error("Please make sure to put a valid email");
    }

    if (!adminsEmail.includes(email)) {
      throw new Error("Your email is not an admin email");
    }

    let verificationCodeExists = await prisma.verification_codes.findFirst({
      where: { email },
    });

    if (verificationCodeExists) {
      await prisma.verification_codes.update({
        where: { email },
        data: {
          code: generatedCode,
          expiration: moment().add(1, "hours").toDate(),
        },
      });
    } else {
      await prisma.verification_codes.create({
        data: {
          code: generatedCode,
          email,
          expiration: moment().add(1, "hours").toDate(),
        },
      });
    }

    const dirHtml = path.join(
      __dirname,
      "../emails/verificationCodeEmail.html"
    );

    readHTMLFile(dirHtml, async (err, html) => {
      if (err) {
        throw new Error(err);
      }
      let template = handlebars.compile(html);
      let replacements = {
        verificationCode: generatedCode,
      };
      const htmlContent = template(replacements);

      const sendEmail = await new SibApiV3Sdk.TransactionalEmailsApi();
      const isEmailSent = await sendEmail.sendTransacEmail({
        sender: {
          email: EMAIL_ADMIN,
        },
        to: [
          {
            email: email,
          },
        ],
        subject: "Admin verification code",
        htmlContent,
      });

      return res.status(201).json({
        success: true,
        message: "Verification code sent!",
        isEmailSent,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
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
