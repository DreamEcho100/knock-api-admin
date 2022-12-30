const multer = require("multer");
const { prisma } = require("../../prisma/prisma");

const storage = multer.diskStorage({

  
    destination(req, file, cb) {
      cb(null, 'public/images/')
    },
    filename(req, file, cb) {
  
      let fileName = file.originalname
        fileName = fileName.split(' ').join('-')
  
      if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|gif)$/)) {
          return cb (new Error('Please select a document type .png/.jpg/.jpeg/.gif'))
      }
  
      
  
      cb(null, `${fileName.toLocaleLowerCase()}`);

    }
  
    
  })
  

  const upload = multer({
    storage,
    limits: {
      fileSize: 2000000
    },
    fileFilter(req, file, cb) {
  
      cb(undefined, true);
    }
    
  });
  

  module.exports = {
     upload,
  }