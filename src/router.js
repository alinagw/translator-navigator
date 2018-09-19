var express = require('express');
var path = require('path');

var router = express.Router();

const MicrosoftTranslate = require("./src/services/MicrosoftTranslate.js")

router.get("/languages", MicrosoftTranslate.getLanguages)
router.post("/translate", MicrosoftTranslate.translate)

module.exports = router;