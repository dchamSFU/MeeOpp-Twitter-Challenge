var Twit = require('twit');
const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const path = require('path')

app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


const port = 9999;

const CONSUMER_API_KEY="M9sH0OSwidJ3tK2c2Y5gpQa8U"
const CONSUMER_API_SECRET_KEY="HCYTKAUGYiaEVMOG2jj0LLP9RuvOdCUCue98l9N8mkgbdlo3m1"
const ACCESS_TOKEN="7207442-GFHbOBcY9LCkrzQhkcuuwtUULOwbZMoGiAjAFzzdUO"
const ACCESS_TOKEN_SECRET="t21nEWlLuNKh0cvwlcP3dvyPOA6tnM7Dee4hPHF1FDGPS"

var jsonParser = bodyParser.json()

var T = new Twit({
  consumer_key: CONSUMER_API_KEY,
  consumer_secret: CONSUMER_API_SECRET_KEY,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
})


 app.post('/tweetwall', (req, res) => {
     T.get('statuses/user_timeline', {screen_name: req.body.handle, count: 10  }, function(err, data, response) {
      if(typeof err !== 'undefined'){
       res.status(404);
       res.render('tweetwall', {data: [], name: ' '});
       return;
	  }
      else if(req.body.handle.trim().indexOf(' ') >= 0){
       res.status(400);
       res.render('tweetwall', {data: [], name: ' '});
       return;
	  }
      res.render('tweetwall', {data: data, name: req.body.handle});
      res.status(200);
      return;
     })
 })

 app.get("/", (req, res) => {
  res.sendFile(__dirname + "/homepage.html");
});

module.exports = app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});