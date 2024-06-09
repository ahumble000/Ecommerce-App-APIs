const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.set("view engine", "ejs");
app.use(express.static('./public'));

//REGISTERATION ROUTE
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
    
      let user = await User.findOne({email});
      if(user)  return res.redirect("/login");
  
      let userName = await User.findOne({name});
      if(userName)  return res.render("register",{email : email,errorMessage : "User name is already taken"});
           
      const hashPassword = await bcrypt.hash(password,10);
    
      user = await User.create({ name, email, password : hashPassword, });
    
      const token = jwt.sign({ _id: user._id }, "adghaifbfasdj");
      console.log(token);
    
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 10000),
      });
    
      res.redirect("/");
    }
      
    catch (error) {
      console.error("User creation error : ", error.message);
      res.render("login");
    }
    
  });
  
  //LOGIN ROUTE
  router.post("/login", async (req, res) => {
  
    try {
      const {email, password } = req.body;
  
      let user = await User.findOne({email});
   
      if(!user)   return res.redirect("/register");
  
      const isMatch = await bcrypt.compare(password,user.password);  
           
      if(!isMatch)  return res.render("login",{email : email ,errorMessage : "Please enter correct password!"})
  
      const token = jwt.sign({ _id: user._id }, "adghaifbfasdj");
      console.log(token);
      
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 100000),
      });
      
      res.redirect("/");
    }
    
    catch (error) {
      console.error("User login error : ", error.message);
      return res.render("login");
    }
    
  });
  
  //FORGET PASSWARD ROUTE
  router.post("/forgetpass", async (req, res) => {
    try {
      const { email, password } = req.body;
    
      let user = await User.findOne({email});
      if(!user)  return res.redirect("/register");
      
      const hashPassword = await bcrypt.hash(password,10);
    
      user = await User.findOneAndUpdate({email},{$set : { password : hashPassword, }});
    
      res.redirect("/login");
    } 
  
    catch (error) {
        console.error("Passward Update Error : ", error.message);
        res.render("login");
    }
    
});


router.get("/register",(req, res) => {
    res.render("register");
});

router.get("/login",(req, res) => {
    res.render("login");
});

router.get("/forgetpass",(req, res) => {
    res.render("forgetpass");
});

  
  //MAIN PAGE ROUTE
  
  //   const clearTokenAndRedirect = (req, res, next) => {
//     if (!req.user) {
//       res.cookie("token", "", { expires: new Date(0), httpOnly: true });
//       console.log(req.cookies);
//       return res.redirect('/');
//     }
  
//     next();
//   };
  

// USER AUTHENTICATION ROUTE


const isAuthenticated = async (req, res, next) => {

    try {                 
    
        const { token } = req.cookies;
        if (!token) {
          throw new Error("Token is missing.");
        }
    
        const decoded = jwt.verify(token, "adghaifbfasdj");
        req.user = await User.findById(decoded._id);
    
        next();
      }
      
      catch (error) {
        console.error("Authentication error : ", error.message);
        return res.redirect("/login");
      }

};



  router.get("/", isAuthenticated, (req, res) => {
    res.render("index",{name : req.user.name});
  });
  
  

module.exports = router;