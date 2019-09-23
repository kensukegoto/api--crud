const router = require("express").Router();

router.get("/get",(req,res)=>{

  res.json({
    "message":"hello kensuke"
  })
})

module.exports = router;