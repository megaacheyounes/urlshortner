// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongoose=require('mongoose');
var Url = require('./url.js');

var bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
 
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.get('/',(req,res)=>{
  res.redirect('/api/shorturl/1');
});
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.post('/api/shorturl/new', function(req,res) {
  var url=  req.body.URL;
  console.log(req.body,req.body.URL);
  
  if(valid(url)){
    saveUrl(url,(i)=>{
      var a={"original_url":url,"short_url":i};
      res.json(a);
    });
    
  }else{
    res.status(400).json( {"error":"invalid URL"});
  }
});
app.get('/api/shorturl/:i',  (req,res)=>{
  
  var i =req.params.i;
  
  connect(); 
  
   Url.findOne({i}).exec((err,docs)=>{
  
       if(err)
           return res.json(err);
     
     return res.redirect(docs.url);
     
     
   });
  
  
  
});


async function saveUrl(url,next){
    connect();
  
    var i =  await 
    Url.count();
    i++;
  
  if(url.indexOf('http')===-1)
    url='http://'+url;
  
  var u=new Url({
       url,
       i
     }) ;
  
  var res = await u.save();
  
  next(i);
}

function connect(){
  
 return mongoose.connect(process.env.DB);
}

var urlRegex= /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

var valid = (url)=>{
  return true;
  return urlRegex.test(url);
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
