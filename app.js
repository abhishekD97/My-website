const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.get("/", function(req, res) {
  res.render("home");
})

mongoose.connect("mongodb+srv://cyborg:Test123@cluster1.vkfmq.mongodb.net/userDataDB",{useNewUrlParser: true, useUnifiedTopology: true});

const inputsSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:String,
  message:String
})

const Input = mongoose.model("Input", inputsSchema)

// const test = new Input({
//   name:"test",
//   email:"123@gmail.com",
//   message:"ok"
// })
// test.save();



app.get("/:loc", function(req, res) {
  let a = req.params.loc;
  if (a === "home") {
    res.render("home");
  } else if (a === "education") {
    res.render("education");
  } else if (a === "contact") {
    res.render("contact");
  } else if (a === "weatherWithout") {
    res.render("weatherWithout");
  } else {
    res.render("home")
  }
})

app.post("/weather", function(req, response) {
  const cityName = req.body.city
  const APPID = "0de42b4ffa1db3bd38a07b88d3bac75c"
  const uri = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=" + APPID + "&units=metric";

  https.get(uri, function(res) {
    res.on("data", function(data) {
      try {
        const weatherData = JSON.parse(data);
        const temp = weatherData.list[0].main.temp;
        const icon = weatherData.list[0].weather[0].icon;
        const desc = weatherData.list[0].weather[0].description;
        const cloudy = weatherData.list[0].clouds.all;
        const humidity = weatherData.list[0].main.humidity;
        const wind = weatherData.list[0].wind.speed;
        const weatherIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


        response.render('weather', {
          temp: temp,
          weatherIcon: weatherIcon,
          desc: desc,
          cloudy: cloudy,
          humidity: humidity,
          wind: wind
        })
      } catch (err) {
        console.log("error" + err.stack)
      } finally {
        console.log("Weather Reported SuccessFully")
      }

    })
  })

})


app.post("/contact",function(req,res){
  const IName = req.body.Name;
  const IEmail = req.body.Email;
  const Message = req.body.Message;
try{
  const feedback = new Input
  ({
    name: IName,
    email:IEmail,
    message: Message
  })
  feedback.save();
  res.redirect("/");
}catch(err){console.log(err)}
 finally{console.log("Data Collected SuccessFully")}
})



app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("server up at 3000 local");
})
