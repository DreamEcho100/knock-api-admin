const { prisma } = require("../../prisma/prisma");
const bcrypt = require("bcrypt");
const { default: validator } = require("validator");

exports.getAdmins = async (req, res) => {
  try {
    const admins = await prisma.users.findMany();
    console.log(admins);
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

exports.getAdmin = async (req, res) => {
  try {
    
    let id = req.params.id;
    id = parseInt(id);

    const admin = await prisma.users.findUnique({
      where:{
        id
      }
    })

    if (admin) {
      return res.status(200).json({
        success: true,
        message: "",
        admin,
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

exports.editAdmin = async (req, res) => {

 
  try {

    let { firstName , lastName , email } = req.body;

    if (!validator.default.isEmail(email)) {
      throw new Error("Please put valid email");
    }

    const isEmailFound = await prisma.users.findFirst({
      where:{email}
    })


    if (isEmailFound.email === 'knock@admin.com') {
      throw new Error('Unauthorized!')
    }

    if (isEmailFound) {
      await prisma.users.update({where:{
        id:Number(req.params.id)
      } ,
        data: {
          lastName,
          firstName,
        },
      });
    }
     await prisma.users.update({where:{
      id:Number(req.params.id)
    } ,
      data: {
        lastName,
        firstName,
        email,
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

    await prisma.users.create({
      data: {
        ...req.body,
        password:hashedPassword, 
        roles:['admin']
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

    if (isKnockAdmin.email === 'knock@admin.com' || isKnockAdmin.email === req.user.email) {
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

