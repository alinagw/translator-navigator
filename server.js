// when deployed, use locally defined values, otherwise use typical settings for server
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

// use Express as our router
const Express = require('express')
const BodyParser = require('body-parser')
const Cors = require('cors')
const serveStatic = require('serve-static');
const path = require('path')

// create express app
const app = Express()
// allow requests from any domain, no cross site concerns
app.use(Cors())
// parse form data more easily
app.use(BodyParser.urlencoded({ extended: true }))
// parse JSON form data
app.use(BodyParser.json())

const MicrosoftTranslate = require("./src/services/MicrosoftTranslate.js")

var router = Express.Router();
router.get("/languages", MicrosoftTranslate.getLanguages)
router.post("/translate", MicrosoftTranslate.translate)
// list of URLs (and their protocols) that this server responds to

app.use("/api", router);


//app.get("/languages", MicrosoftTranslate.getLanguages);
//app.post("/translate", MicrosoftTranslate.translate);

app.use("/", serveStatic(path.join(__dirname, "/index.html"));

// nothing useful for root URL to do
/*app.get('/', (req, res) => {
    res.json({"message": 'Welcome to Navigator Translator!'});
    res.end();
})*/

// start server to listen for requests
app.listen(PORT, function() {
    console.log(`Server is listening on port http://${this.address().address}:${this.address().port}`);
})