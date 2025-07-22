
const authModle = require('..//modules/auth.modle')
const courseModle = require('..//modules/courses.modle')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.getProfile = async(req,res) =>
{
   
    let courses = await courseModle.getCourseById(req.session.userId);  
    let user = await authModle.findUserById(req.session.userId)

   console.log(courses)
    res.render('profile',{
           userId: req.session.userId,
           name:  req.session.userName,
           user: user,
           courses: courses
    })
}


exports.deleteAccount = async(req,res) =>
{
    await authModle.deleteAccount(req.session.userId);
    req.session.destroy();
    res.redirect('/login')
}


exports.getSettings = async(req,res) =>
{
     let user = await authModle.findUserById(req.session.userId)
    res.render('settings',
        {
             userId: req.session.userId,
           name:  req.session.userName, 
            errUpdatePassword: req.flash('errUpdatePassword'),
            notMatch: req.flash('notMatch'),
            user: user
        }
    );
}



exports.updateName = async(req,res) =>
{
    let name = req.body.username;
    await authModle.updateName(req.session.userId,name);
    req.session.userName = name;
    return res.redirect('/settings')
}




exports.updatePhoto = async(req,res) =>
{
    await authModle.updateImg(req.session.user,req.file.filename);
    return res.redirect('/settings')
}
exports.updatePass = async(req,res) =>
{
    let errors = validationResult(req);
    if (!errors.isEmpty())
    {
        req.flash("errUpdatePassword",validationResult(req).array())
        console.log(errors)
        return res.redirect('/settings');
    }
    let {newPassword,confirmPassword} = req.body;

        if (newPassword&&confirmPassword&&newPassword !== confirmPassword)
        {
            req.flash('notMatch','Password Not Match');
            return res.redirect('/settings')
        }
        let hashPassword = await bcrypt.hash(req.body.newPassword,10)
        await authModle.updatePassword(req.session.userId,hashPassword);
        return res.redirect('/settings')
    
    
}