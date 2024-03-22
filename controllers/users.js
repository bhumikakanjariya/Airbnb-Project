const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try{
        let { username, email, password } = req.body;
        const newUser = new  User({username: username, email:email});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser , (err)=>{
            if(err){ 
                return next(err)
            }
            req.flash('success', 'Account created successfully!');
            res.redirect('/listings');
        });
    } catch(error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success","Welcome to Wanderlust!");
    let redirectUrl  = req.session.redirectUrl || "/listings"; 
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
           return next(err);
        }
        req.flash("succes","Logged out Successfully");
        res.redirect("/listings");
    });
};

