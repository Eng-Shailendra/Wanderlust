const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/usercontroller.js");

// signup router
router
    .route("/signup")
    .get(usercontroller.signupPage)
    .post(usercontroller.signupUserController)

// login route
router
    .route("/login")
    .get(usercontroller.loginPage)
    .post(saveRedirectUrl, passport
        .authenticate("local",
            { failureRedirect: "/login", failureFlash: true, }
        ),
        usercontroller.loginUserController
    );



// to logOut 
router.get("/logout", usercontroller.logoutController);


module.exports = router;