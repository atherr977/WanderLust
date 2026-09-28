const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        
        // CRITICAL VERCEL FIX: Force session save after signup
        req.session.save((err) => {
          if (err) return next(err);
          res.redirect("/listings");
        });
      });
    } catch (e) {
      req.flash("error", e.message);
      
      req.session.save((err) => {
          if (err) return next(err);
          res.redirect("/signup");
      });
    }
  })
);

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    
    // CRITICAL VERCEL FIX: Force session save to DB before redirecting
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(redirectUrl);
    });
  }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        
        // CRITICAL VERCEL FIX: Force session save so the flash message appears
        req.session.save((err) => {
            if (err) return next(err);
            res.redirect("/listings");
        });
    });
});

module.exports = router;
