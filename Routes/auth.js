/* const express= require('express');
 const router=express.Router;*/

const router = require('express').Router();//above two line is achived in one line
const bcrypt = require('bcryptjs');//website

//load auth schema and Model
// require("../Model/Auth");
// const Auth = mongoose.model("Auth");
const User = require("../Model/Auth"); //mongoose model-----instead of above two line we can achive it in one line

/*-----------Register GET routes starts here---------------------*/
router.get("/register", (req, res) => {
    res.render("./auth/register");
});
/*-----------Register GET routes ends here-----------------------*/

/*-----------Register POST routes ends here----------------------*/
router.post("/register", (req, res) => {
    //Validation
    let errors = [];
    let { username, password, email, password2 } = req.body;
    if (password != password2) {
        errors.push({ text: "Password should match" });
    }
    if (password.length < 6) {
        errors.push({ text: "Password should be minimum 6 character" });
    }
    if (errors.length > 0) {
        res.render('./auth/register', {
            errors,
            username,
            email,
            password,
            password2,
        });
    } else {
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    req.flash(
                        "errors_msg",
                        "Eamil is already ragister please try another email"
                    );
                    res.redirect("/auth/register", 401, {});
                } else {
                    // create an account with valid email address
                    let newUser = new User({
                        username,
                        password,
                        email,
                    });
                    //make password hashed
                    bcrypt.genSalt(12, (err, salt) => {
                        if (err) throw err;
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.passsword = hash
                        })
                        newUser
                            .save()
                            .then((user) => {
                                req.flash("sucess_msg", "successfully Registered");
                                res.redirect("/auth/login,201,(user)");
                            })
                            .catch((err) => console.log(err));
                         })
                    }

            }).catch((err) => console.log(err));

    }
});
/*-----------Register POST routes ends here----------------------*/



module.exports = router;