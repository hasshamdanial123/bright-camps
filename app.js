require('dotenv').config()
const express = require('express')
const passport = require('passport')
const app = express()
const cookieSession = require('cookie-session')
require('./passport-setup')
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2'],
    maxAge: 1000* 60 * 60 *24,  //keep the user logged in for 1 day.

  }))

app.set("view engine","ejs")
app.use(passport.initialize())
app.use(passport.session())
app.get('/',(req,res) => {
    res.render("pages/index")
})
app.get('/sucess', (req,res) =>{
    res.render("pages/profile.ejs", {name:req.user.displayName,email:req.user.emails[0].value,pic:req.user.photos[0].value})
    console.log("Congrats")
})
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/sucess');
  }
);
app.get('/logout', (req,res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
app.listen(5000, () => {
    console.log("i am live")
})