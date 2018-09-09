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
var session = require('client-sessions');
app.use(session({
    cookieName: 'session',
    secret: 'keyboard cat',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
// set the view engine to ejs
app.set('view engine', 'ejs');

var LoginApi = require('./server/router/router');
app.use("/api", LoginApi)
const _Pages = require("./server/config/pages.config")
if (_Pages && _Pages.length > 0) {
    _Pages.map(function (data) {
        app.get('/' + data.link, function (req, res, next) {
            if (req.session.user) {
                res.render(__dirname + '/views/pages/' + data.page, { title: data.title });
            }
            else {
                res.redirect('/login');
            }
        });
    })
}
else {
    console.log("Error:=====> No pages are define!")
}
app.get("/login", function (req, res) {
    if(req.session.user)
        res.redirect("/dashboard")    
    else
     res.render(__dirname + '/views/pages/login', { title: 'User Login' });
})
app.get("/logout", function (req, res) {
    req.session.user=null;
    if(req.session.user)
        res.redirect("/dashboard")    
    else
     res.render(__dirname + '/views/pages/login', { title: 'User Login' });
})
app.get("*", function (req, res) {
    res.render(__dirname + '/views/pages/index', { title: "hello" });
})
app.listen(port, function () {
    console.log("Server is running on port:" + port)
});
