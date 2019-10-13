const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("gameroom get");
    res.redirect("/");
});

module.exports = router;