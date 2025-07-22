const authModle = require('..//modules/auth.modle')
const courseModle = require('..//modules/courses.modle')








exports.getTeachers = async(req,res) =>
{
    let AllCourses = [];
    let user = await authModle.findUserById(req.session.userId)
    let teachers = await authModle.findTeacher();
    
    for (let teacher of teachers) {
         const idString = teacher._id.toString();
          const teacherCourse = await courseModle.getCourseById(idString);
        AllCourses.push({
            teacher: teacher,
            courses: teacherCourse
        });
        
    }

   
    res.render('teachers', {
         userId: req.session.userId,
        name:  req.session.userName,
        user: user,
        courses: AllCourses
    })
}