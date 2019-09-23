const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const upload = multer();

router.get("/get",(req,res)=>{

  const jsonObj = JSON.parse(fs.readFileSync("./data.json","utf-8"));
  res.json(jsonObj)

});

router.get("/get/:id(\\d+)",(req,res)=>{
  const id = req.params.id;
  const jsonObj = JSON.parse(fs.readFileSync("./data.json","utf-8"));
  const item = jsonObj.items.find(item => {
    return +item.id === +id;
  });

  res.json((!item)?{}:item);

});

router.post("/add",upload.single("tmb"),(req,res)=>{
  const {body,file} = {...req};
  console.log(body)
  res.json({
    success: true
  })
})

module.exports = router;