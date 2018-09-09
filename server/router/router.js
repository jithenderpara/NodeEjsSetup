const express = require('express');
const router = express.Router();
router.use('/user', require("./login.route"));

module.exports = router;