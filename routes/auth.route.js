
const router = require('express').Router();
const {check}= require('express-validator');
const authController = require('../controllors/auth.controlloer')
const isAuth = require('./projectRoutes/isAuth')

router.get('/register',isAuth.notAuth,authController.getRegister)

router.post('/register',isAuth.notAuth,check('email').isEmail().withMessage('This Not a Email'),
check('name').isLength({min: 6}).withMessage("The name is less than the required number 6"),
check('password').isLength({min:6}).withMessage("The symbol is less than the required number 6"),authController.postRegister)


router.get('/login',isAuth.notAuth,authController.getLogin)
router.post('/login',isAuth.notAuth,authController.postLogin)

module.exports = router;