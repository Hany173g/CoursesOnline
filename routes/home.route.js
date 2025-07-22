const router = require('express').Router();

const homeControol = require('../controllors/home.controllor');
const authControloer = require('../controllors/auth.controlloer')
const is_Auth = require('./projectRoutes/isAuth')



router.get('/',is_Auth.isAuth,homeControol.getHome)
router.get('/logout',is_Auth.isAuth,authControloer.logout)


module.exports = router;