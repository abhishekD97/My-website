const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.get("/",function(req,res){
  res.render("home");
})
app.get("/contact",function(req,res){
  res.render("contact");
})
app.listen(3000,function(req,res){
  console.log("server up at 3000 local");
})
