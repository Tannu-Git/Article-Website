const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require("passport");
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const cookie_seesion = require('cookie-session');
const { log } = require('console');
const app = express()

// Add client id and secret and add your email in authorized.json

app.use(cookie_seesion({
    name:'session',
    keys:['cyybs'],
    maxAge:24*60*60*100
}))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


passport.use(new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(request, accessToken, refreshToken, profile, done) {
    done(null,profile);
  }
));


passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
app.use(passport.initialize())
app.use(passport.session())
app.get('/auth/google',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  
  app.get( '/auth/google/callback',
      passport.authenticate( 'google', {
          successRedirect: 'http://localhost:3000/#',
          failureRedirect: '/auth/google/failure'
  }));
  

app.get('/api',(req,res)=>{
    var text = fs.readFileSync('data.json','utf8')
    // console.log(text)
    res.send(text)
})

app.get('/authorized',(req,res)=>{
  if(req.isAuthenticated()){
    // console.log(req.user.email);
    const mails = JSON.parse( fs.readFileSync('authorized.json','utf8'));
    // console.log(typeof mails);
    mails.forEach(mail => {
      if(req.user.email == mail){
        res.status(200).json({ authenticated: true});
      }
    });
  }

})

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function(_, __, cb) {
    cb(null, '../client/public/'); // Corrected the destination to a specific folder
  },
  filename: function(_, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/addBlog', upload.single('file'), (req, res) => {
  if(req.isAuthenticated()){
      const mails = JSON.parse(fs.readFileSync('authorized.json','utf8'));
      let isAuthorized = mails.includes(req.user.email); // Simplified authorization check
      if(isAuthorized){
          const parcel = req.body;
          console.log(parcel);
          // Accessing the file
          var file;
          if (req.file) {
            file = req.file.originalname;
          }
          var data =   {
            "image": file,
            "heading": parcel.heading,
            "outer": parcel.outer,
            "tagline":parcel.tagline,
            "text":parcel.text,
            "comment": [
            ]
          }
          var text = JSON.parse(fs.readFileSync('data.json','utf8')); 
          text.push(data)
    fs.writeFileSync('data.json',JSON.stringify(text,null,2))
    return res.status(200).send('Done'); // Handling unauthorized access

      } else {
          return res.status(403).send('Unauthorized access.'); // Handling unauthorized access
      }
  } else {
      return res.status(401).send('User is not authenticated.'); // Handling unauthenticated access
  }
});

app.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    } else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
  });
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('http://localhost:3000')
})

app.post('/deleteBlog',(req,res)=>{
  const {parcel} = req.body
  var text = JSON.parse(fs.readFileSync('data.json','utf8')); 
  text.forEach((item, index) => {
    if (item.heading == parcel.heading) {
      text.splice(index, 1);
    }
  });
  // console.log(text);
  // console.log(parcel.heading);
  fs.writeFileSync('data.json',JSON.stringify(text,null,2))
  res.json({ text:text });
})


app.post('/comments',(req,res)=>{
  if(req.isAuthenticated()){
    const {parcel} = req.body
    dataEntry = {
      "img": req.user.picture,
      "person": req.user.displayName,
      "comments": parcel.comment
    }
    var text = JSON.parse(fs.readFileSync('data.json','utf8')); 
    // console.log(text[0].comment);
    text.forEach(item => {
      if (item.heading === parcel.heading) {
        for (let i = 0; i < item.comment.length; i++) {
          if (item.comment[i].person === req.user.displayName) {
            item.comment[i] = dataEntry;
            var flag = 1;
            break;
          } else {
            var flag = 0;
          }
        }
    if(flag === 0){
      item.comment.push(dataEntry)
      }
    }});
    // console.log(text[0].comment);
    // console.log(typeof text.toString())
    fs.writeFileSync('data.json',JSON.stringify(text,null,2))
    // console.log(parcel.heading,parcel.comment)
    // console.log('parcel')
    // res.redirect('http://localhost:3000/'+parcel.heading)
		res.json({ text:text });
  }
  // console.log('sdsd');

})

app.listen(5000, ()=>{
    console.log('Server started on port 5000');
})