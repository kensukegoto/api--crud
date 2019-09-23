const fs = require("fs");
const multer = require("multer");
const UPLOADS_DIR = "uploads";

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    if(!fs.existsSync(UPLOADS_DIR)){
      fs.mkdirSync(UPLOADS_DIR);
    }
    cb(null,UPLOADS_DIR)
  },
  filename: (req,file,cb)=>{
    const [filename,mime] = file.originalname.split(".");
    const date = Math.floor((new Date()).getTime() / 1000);
    cb(null,`${filename}-${date}.${mime}`)
  },
});

const upload = multer({
  storage,
  fileFilter: (req,file,cb) => {
    cb(null,true)
  },
  limits:{
    fileSize: 1024 * 1024
  }
})

module.exports = upload;