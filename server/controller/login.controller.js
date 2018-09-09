var bcrypt = require('bcryptjs');
const UserSchema = require("../model/user.schema")
/**
 * Log a user into their account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
function UserLogin(req, res) {
    var _email=req.body.email||req.query.email;
    var _password=req.body.password||req.query.password;
    UserSchema.User.findOne({ email: _email }, 'firstName lastName email password data', function (err, user) {
        if (!user) {
            //res.render('login.jade', { error: "Incorrect email / password.", csrfToken: req.csrfToken() });
            res.send({ error: "Incorrect email / password." })
        } else {
            if (bcrypt.compareSync(_password, user.password)) {
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                res.send({ error: "Incorrect email / password." })
                //res.render('login.jade', { error: "Incorrect email / password.", csrfToken: req.csrfToken() });
            }
        }
    });
};

/**
 * Create a new user account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
function UserRegister(req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var user = new UserSchema.User({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": hash,
        "isFirstlogin": false,
        "acessgroup": ["manager"],
        "lastlogin": null,
        "isactive": true,
        "createdDate": new Date(),
        "createdBy": "test"
    });
    user.save(function (err) {
        if (err) {
            var error = 'Something bad happened! Please try again.';
            if (err.code === 11000) {
                error = 'That email is already taken, please try another.';
            }
            res.send({ error: error })
            //res.render('register.jade', { error: error });
        } else {
            //utils.createUserSession(req, res, user);
            res.redirect('/dashboard');
        }
    });
};


/**
 * Log a user out of their account, then redirect them to the home page.
 */
function UserLogout(req, res) {
    if (req.session) {
        req.session.reset();
    }
    res.redirect('/');
};

module.exports = {
    UserLogin,
    UserRegister,
    UserLogout

}