const User = require("../model/user.js");
const wrapAsync = require("../utils/warapAsync.js");


module.exports.signupPage = (req, res,) => {
    res.render("users/signup.ejs");
}

module.exports.signupUserController = wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body
        console.log(req.body)
        let newuser = new User({ username, email, password });
        let registeruser = await User.register(newuser, password);
        req.login(registeruser, (err) => {
            if (err) return next(err);
            console.log(registeruser);
            res.redirect("/alllisting");
        })

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }

});

module.exports.loginPage = (req, res, next) => {
    res.render("users/login.ejs");
}

module.exports.loginUserController = async (req, res, next) => {
    // console.log(err)
    req.flash("success", "wellcome tho wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/alllisting"
    res.redirect(redirectUrl);
}

module.exports.logoutController = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "logout successful");
        res.redirect("/alllisting");
    });
}