const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.disable("x-powered-by");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use("/api",require("./router"))

app.listen(3001,()=>{
  console.log("started 3001");
})