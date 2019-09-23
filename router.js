const router = require("express").Router();
const fs = require("fs");

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

module.exports = router;