const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const upload = multer();
const JSON_PATH = "./data.json"; 

const tmpl = {
  "id": "",
  "h4": "",
  "p" : "",
  "time": "",
  "ul": [],
  "tmb": "",
  "url": ""
};

router.get("/get",(req,res)=>{

  const jsonObj = JSON.parse(fs.readFileSync(JSON_PATH,"utf-8"));
  res.json(jsonObj)

});

router.get("/get/:id(\\d+)",(req,res)=>{
  const id = req.params.id;
  const jsonObj = JSON.parse(fs.readFileSync(JSON_PATH,"utf-8"));
  const item = jsonObj.items.find(item => {
    return +item.id === +id;
  });

  res.json((!item)?{}:item);

});

router.post("/add",upload.single("tmb"),(req,res)=>{

  const {body,file} = {...req};
  let jsonObj = JSON.parse(fs.readFileSync(JSON_PATH,"utf-8"));
  const id = +jsonObj.items[jsonObj.items.length -1 ].id + 1;
  // h4のみ必須

  const item = Object.keys(body).reduce((sum,key)=>{

    switch(key){
      case "h4":
      case "p":
      case "time":
      case "url":
        sum[key] = body[key];
        break;
      default:
    }
  
    if(/^li_\d+/.test(key)) sum.ul.push(body[key])
    
    return sum;

  },{...tmpl,id})


   /** file
    * tml
    */

  
  jsonObj.items.push(item);
  
  fs.writeFileSync(JSON_PATH,JSON.stringify(jsonObj))

  res.json(jsonObj)

})

router.put("/update/:id(\\d+)",upload.single("tmb"),(req,res)=>{

  const id = req.params.id;

  const {body,file} = {...req};
  
  const jsonObj = JSON.parse(fs.readFileSync(JSON_PATH,"utf-8"));

  const items__old = jsonObj.items;
  
  const item__old = items__old.find( item => +item.id === +id);

  const item__new = Object.keys(body).reduce((sum,key)=>{

    switch(key){
      case "h4":
      case "p":
      case "time":
      case "url":
        sum[key] = body[key];
        break;
      default:
    }
  
    if(/^li_\d+/.test(key)) sum.ul.push(body[key])
    
    return sum;

  },{...item__old,ul:[]})

  const items_new = items__old.map( item => {
    if(+item.id === +id){
      return item__new;
    }
    return item;
  })

  const jsonObj__new = {...jsonObj,items:items_new}

  fs.writeFileSync(JSON_PATH,JSON.stringify(jsonObj__new))

  res.json(jsonObj__new)

})

module.exports = router;