const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.login === true) {
    res.redirect("/loggedIn");
  } else {
    res.render("index", {})
  }
});

router.get("/loggedIn", (req, res) => {
  if (req.session.login === true) {
    res.render("welcome", {user: req.session})
  } else {
    res.redirect("/")
  }
})

router.post("/login", (req, res) => {
  if (req.session.login === true) {
    res.redirect("/loggedIn")
  } else {
    res.redirect("/");
  }
});

module.exports = router;
