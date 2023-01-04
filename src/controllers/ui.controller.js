const fs = require("fs");
const path = require("path");
const { prisma } = require("../../prisma/prisma");


// banner
exports.getBanner = async (req, res) => {
  try {
    const banner = await prisma.banner.findUnique({
      where: {
        id: 3,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      banner,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeBanner = async (req, res) => {
  try {
    const data = req.body;

    const update = await prisma.banner.update({
      where: {
        id: 3,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Banner changed Successfully!",
      banner: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// main
exports.getMainSection = async (req, res) => {
  try {
    const main = await prisma.main_section.findUnique({
      where: {
        id: 1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      main,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeMainSection = async (req, res) => {
  try {
    let data = req.body;

    delete data.mainImageUrl;

    const update = await prisma.main_section.update({
      where: {
        id: 1,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Main section changed Successfully!",
      banner: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadImageMainSection = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");

      await prisma.main_section.update({
        where: {
          id: 1,
        },
        data: {
          mainImageUrl: path[1],
        },
      });

      return res.status(200).json({
        success: true,
        message: "Main image uploaded successfully",
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


//

exports.getPopUp = async (req, res) => {
  try {
    const popup = await prisma.popup.findUnique({
      where: {
        id: 3,
      },
    });

    return res.status(200).json({
      success: true,
      message: "",
      popup,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changePopUp = async (req, res) => {
  try {
    let data = req.body;
    
    delete data.mainImageUrl;

    const update = await prisma.popup.update({
      where: {
        id: 3,
      },
      data,
    });
    return res.status(200).json({
      success: true,
      message: "Popup changed Successfully!",
      popup: update,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadImagePopUp = async (req, res) => {
  try {
    if (req.file) {
      const path = req.file.path.split("public");

      await prisma.popup.update({
        where: {
          id: 3,
        },
        data: {
          mainImageUrl: path[1],
        },
      });

      return res.status(200).json({
        success: true,
        message: "Popup image uploaded successfully",
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