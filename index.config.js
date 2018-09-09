var path = require('path');
var express = require('express');
var config = require('./server/config');
var port = process.env.PORT || config.serverport;
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '/dist')));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
var nodeSession = require('node-session');
var session = new nodeSession({
    secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
    'lifetime': 1800000, // 30 minutes 
    'expireOnClose': true,
});
// set the view engine to ejs
app.set('view engine', 'ejs');

var LoginApi = require('./server/router/router');
app.use("/api", LoginApi)
const _Pages = require("./server/config/pages.config")
if (_Pages && _Pages.length > 0) {
    _Pages.map(function (data) {
        app.get('/' + data.link, function (req, res, next) {
            res.render(__dirname + '/views/pages/' + data.page, { title: data.title });
        });
    })
}
else {
    console.log("Error:=====> No pages are define!")
}
app.get("*", function (req, res) {
    res.render(__dirname + '/views/pages/index', { title: 'Express' });
})
app.listen(port, function () {
    console.log("Server is running on port:" + port)
});
