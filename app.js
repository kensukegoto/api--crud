const {DOMAIN,PORT} = require("./confg");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const cors = require("cors");


app.disable("x-powered-by");

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use("/uploads",express.static(__dirname + "/uploads"))
app.use("/api",require("./router"))

app.use(function(err, req, res, next) {
  res.json({
    success: false,
    message: err.message
  })
});

app.listen(PORT,()=>{
  console.log("started 3001");
})