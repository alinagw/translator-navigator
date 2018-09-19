// when deployed, use locally defined values, otherwise use typical settings for server
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

// use Express as our router
import Express from 'express'
import BodyParser from 'body-parser'
import Cors from 'cors'

// create express app
const app = Express()
// allow requests from any domain, no cross site concerns
app.use(Cors())
// parse form data more easily
app.use(BodyParser.urlencoded({ extended: true }))
// parse JSON form data
app.use(BodyParser.json())

// list of URLs (and their protocols) that this server responds to

import MicrosoftTranslate from "./services/MicrosoftTranslate.js"

app.get("/languages", MicrosoftTranslate.getLanguages);
app.post("/translate", MicrosoftTranslate.translate);

// nothing useful for root URL to do
/*app.get('/', (req, res) => {
    res.json({"message": 'Welcome to Navigator Translator!'});
    res.end();
})*/

app.get('/', function(req, res) {
    res.render("./../index.html");
 });

// start server to listen for requests
app.listen(PORT, function() {
    console.log(`Server is listening on port http://${this.address().address}:${this.address().port}`);
})