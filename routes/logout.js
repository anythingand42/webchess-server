const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    console.log("log out post");
    if(req.cookies.webchessUser) {
        res.cookie("webchessUser", "", { maxAge: -1 });
    }
    res.sendStatus(200);
});

module.exports = router;