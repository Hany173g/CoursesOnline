const router = require('express').Router();
const searchControllor = require('../controllors/search.controllor')
const projectRouter = require('./projectRoutes/isAuth')





router.get('/search',projectRouter.isAuth,searchControllor.getSearch)


module.exports = router