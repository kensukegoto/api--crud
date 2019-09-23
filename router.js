const router = require("express").Router();
const fs = require("fs");

router.get("/get",(req,res)=>{

  const jsonObj = JSON.parse(fs.readFileSync("./data.json","utf-8"));

  res.json(jsonObj)
})

module.exports = router;