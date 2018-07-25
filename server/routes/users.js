const express = require("express");


const router = express.Router();

// Log a user out
router.get("/logout", (req, res) => {
  console.log('/logout');
  // req.logout();
  // res.redirect("/");
});


module.exports = router;
