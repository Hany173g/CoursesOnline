

const authModle = require('../modules/auth.modle')
const { validationResult } = require('express-validator');

const bcyrpt = require('bcrypt');




exports.getRegister = async (req,res) =>
{
    res.render('register',{
        confirmError: req.flash('confirmError'),
        errorRegister: req.flash('errorRegister'),
        userId: req.session.userId,
        name: req.session.userName,
        errEmail: req.flash('errEmail')
    })
}






exports.postRegister = async (req,res) =>
{

    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        req.flash('errorRegister',validationResult(req).array())
        return res.redirect('/register');
    }
    const {name,email,password} = req.body;
    let user = await authModle.findEmail(email);
    if (user)
    {
         req.flash('errEmail',"Sorry This Email is Use")
         return res.redirect('/register')
    }
    else if (req.body.confirmPassword !== password)
    {
        req.flash('confirmError','Passwords do not match')
        return res.redirect('/register')
    }
 let hashPassword = await bcyrpt.hash(password,10);
       await authModle.createNewUser({
        name: name,
        email: email,
        password: hashPassword,
        access: "User"
       }) 
       res.redirect('/login')
}



exports.getLogin = async (req,res) =>
{
    res.render('login',
        {
             errLogin: req.flash('errLogin'),
             userId: req.session.userId,
             name:  req.session.userName
        }
    )
}


exports.postLogin = async(req,res) =>
{
    const {email,password} = req.body;
    let hashPassword = await bcyrpt.hash(password,10);
    let user = await authModle.findUser(email,hashPassword);

    if (!user)
    { 
        req.flash('errLogin',"Sorry, This User Not Found")
        return res.redirect('/login')     
    }
    
    let match = await bcyrpt.compare(password, user.password);

    if (!match) {
        req.flash('errLogin', "كلمة المرور غير صحيحة");
        return res.redirect('/login');
    }

    req.session.userId = user._id;
    req.session.userName = user.name
    res.redirect('/');
}



exports.logout = async(req,res) =>
{
    req.session.destroy();
    res.redirect('/login')
}