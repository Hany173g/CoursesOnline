const router = require('express').Router();
const coursesControllor = require('../controllors/courses.controllor')
const projectRouter = require('./projectRoutes/isAuth')



router.get('/course/:name',coursesControllor.getProduct)


module.exports = router