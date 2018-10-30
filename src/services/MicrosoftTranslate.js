// **********************************************
// *** Update or verify the following values. ***
// **********************************************

const request = require("request");

// Replace the subscriptionKey string value with your valid subscription key.
const subscriptionKey = "98ea037b28e14ed9ab6faaab2f0bb6a5";

const host = 'api.cognitive.microsofttranslator.com';
const languages_path = '/languages?api-version=3.0';
const translate_path = '/translate?api-version=3.0';

let get_guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

exports.getLanguages = function(req, res) {

        request.get({
            url: "https://" + host + languages_path,
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            }
        }, function (error, languages) {
            if (error) {
                console.log(error);
                res.send("Error: " + error);
                res.end();
            } else {
                res.send(languages);
                res.end();
            }
        });

    }

exports.translate = function(req, res) {

        var langs = JSON.parse(req.body.langs);
        var lang1 = langs[0];
        var lang2 = langs[1];
        var content = req.body.content;
        var params = '&to=' + lang1 + '&to=' + lang2;

        request.post({
            url: "https://" + host + translate_path + params,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'X-ClientTraceId': get_guid(),
            },
            body: content
        }, function (error, translation) {
            if (error) {
                console.log(error);
                res.send("Error: " + error);
                res.end();
            } else {
                res.send(translation);
                res.end();
            }
        });
    }