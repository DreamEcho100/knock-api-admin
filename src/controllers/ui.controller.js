
const fs = require("fs");
const path = require("path");
const { prisma } = require("../../prisma/prisma");


exports.addBanner = async (req ,res) => {
  try {
    
    const data = req.body

    const banner = await prisma.banner.create({
      data
    })

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
}

exports.getBanner = async (req, res) => {
    try {
      
      const banner = await prisma.banner.findUnique({where:{
        id:1
      }})
  
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

      const data = req.body
      
      const update = await prisma.banner.update({
        where:{
          id:1
        },data
      })

      return res.status(200).json({
        success: true,
        message: "Banner changed Successfully!",
        banner:update
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  
  exports.getHomePage = async (req, res) => {
    try {
      if (!homePage) {
        throw new Error("Failed to load the page");
      }
  
      return res.status(200).json({
        success: true,
        message: "",
        homePage,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  exports.changeHomePage = async (req, res) => {
    try {
      const dir = path.join(__dirname, "../pages/Home.json");
      const data = req.body;
      const jsonString = JSON.stringify(data);
      fs.writeFileSync(dir, jsonString);
  
      return res.status(200).json({
        success: true,
        message: "Successfully wrote file",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  