const router = require('express').Router();
const {check} = require('express-validator')
const profileControllor = require('../controllors/profile.controllor')
const multer = require('multer')
const projectRouter = require('./projectRoutes/isAuth')
router.get('/profile',projectRouter.isAuth,profileControllor.getProfile)
router.get('/settings',projectRouter.isAuth,profileControllor.getSettings)
router.post('/settings/update-name',projectRouter.isAuth,profileControllor.updateName)
router.post('/settings/delete-account',projectRouter.isAuth,profileControllor.deleteAccount)
router.post('/settings/update-photo',projectRouter.isAuth,multer({
    storage: multer.diskStorage({
        destination: (req,file,cb) =>
        {
            cb(null,'images')
        },
        filename: (req,file,cb) =>
        {
            cb(null,Date.now() + '_'+file.originalname)
        }
    })}).single('profilePic'),profileControllor.updatePhoto)
router.post('/settings/update-password',projectRouter.isAuth,check('newPassword').isLength({min: 6}).withMessage('Length Letter than 6'),profileControllor.updatePass)




module.exports = router