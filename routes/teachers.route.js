const router = require('express').Router();
const projectRouter = require('./projectRoutes/isAuth');
const teacherControllor = require('../controllors/teacher.controlloer')






router.get('/teachers',projectRouter.isAuth,teacherControllor.getTeachers)



module.exports = router;