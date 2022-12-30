const { prisma } = require("../../prisma/prisma");
const bcrypt = require("bcrypt");
const { default: validator } = require("validator");
const SibApiV3Sdk = require("../utils/sendinblue");
const { readHTMLFile } = require("../utils/htmlFileFunction");
const path =require('path')
var handlebars = require("handlebars");
const {   EMAIL_ADMIN  } = process.env;

exports.getAdmins = async (req, res) => {
  try {
    const admins = await prisma.users.findMany();
    return res.status(200).json({
      success: true,
      message: "",
      admins,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.editAdmin = async (req, res) => {

  try {

    let { firstName , lastName , email , password} = req.body;

    let hashedPassword
    if (password) {
      if (password.length < 5) {
        throw new Error('Password is weak!')
      }
      hashedPassword = await bcrypt.hash(password ,10)
    }

    if (!validator.default.isEmail(email)) {
      throw new Error("Please put valid email");
    }

    const isEmailFound = await prisma.users.findFirst({
      where:{email}
    })

    if (isEmailFound) {
      if (isEmailFound.email !== req.user.email) {
        throw new Error('Email already exsist!')
      }
    }

     await prisma.users.update({where:{
      id:req.user.id
    } ,
      data: {
        lastName,
        firstName,
        email,
        password: password ? hashedPassword : req.user.password
      },
    });

    const newList = await prisma.users.findMany();

    if (newList) {
      return res.status(200).json({
        success: true,
        message: "",
        admins: newList,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    let { password, email } = req.body;

    if (password.length < 5) {
      throw new Error("Password is weak!");
    }
    if (!validator.default.isEmail(email)) {
      throw new Error("Please put valid email");
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    const isAlreadyExsist = await prisma.users.findFirst({
      where:{
        email
      }
    })

    if (isAlreadyExsist) {
      throw new Error('User already exist!')
    }

    await prisma.users.create({
      data: {
        ...req.body,
        password:hashedPassword, 
        roles:['admin']
      },
    });


    const dirHtml = path.join(__dirname , '../emails/addNewAdmin.html')

    readHTMLFile(
      dirHtml ,
      async (err, html) => {
        if (err) {
          throw new Error(err);
        }
        let template = handlebars.compile(html);
        let replacements = {
          email,
          password
        };
        const htmlContent = template(replacements);


        const sendEmail = await new SibApiV3Sdk.TransactionalEmailsApi();
        await sendEmail.sendTransacEmail({
          sender:{
             email:EMAIL_ADMIN
          },
          to:[{
            email:email
          }],
          subject:'Admin information access' ,
          htmlContent
        })

      }
    );


    const newList = await prisma.users.findMany();

    if (newList) {
      return res.status(200).json({
        success: true,
        message: "",
        admins: newList,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    let id = req.params.id;
    id = parseInt(id);

    const isKnockAdmin = await prisma.users.findUnique({
      where:{
        id
      }
    })

    if (!isKnockAdmin) {
      throw new Error('Admin not found!')
    }

    if (isKnockAdmin.email === process.env.EMAIL_ADMIN  || isKnockAdmin.email === req.user.email) {
      throw new Error('Unauthorized!')
    }

    const success = await prisma.users.delete({ where: { id } });

    const newList = await prisma.users.findMany();
    if (success) {
      return res.status(200).json({
        success: true,
        message: "Admin deleted successfully!",
        admins: newList,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

