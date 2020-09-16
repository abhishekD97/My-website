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
app.get("/:loc",function(req,res){
  let a = req.params.loc;
  if (a==="home") {
  res.render("home");
  }else if (a==="education") {
  res.render("education");
  }else if(a==="contact"){
  res.render("contact");
}else{
  res.render("home")
}

})
app.listen(3000,function(req,res){
  console.log("server up at 3000 local");
})
