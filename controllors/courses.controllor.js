
const coursesModle = require('../modules/courses.modle');


const authModle = require('../modules/auth.modle')


exports.getProduct = async (req,res) =>
{
     const courseName = req.params.name;
        let user = await authModle.findUserById(req.session.userId)
  console.log('Requested course name:', courseName);
    let course = await coursesModle.getCourseByName(courseName)
    if (!course)
    {
        return res.status(404).send("Course Not found Please return back");
    }
    res.render('course',{
         userId: req.session.userId,
         course: course,
         name:  req.session.userName,
         user: user
    })
}