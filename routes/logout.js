const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    if(req.cookies.webchessUser) {
        res.cookie("webchessUser", null, { maxAge: -1 });
    }
    res.sendStatus(200);
});

module.exports = router;