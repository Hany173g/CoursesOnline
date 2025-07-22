const coursesModle = require('../modules/courses.modle');

const authModle = require('../modules/auth.modle')


exports.getHome = async (req,res) =>
{
       let user = await authModle.findUserById(req.session.userId)
     const category = req.query.categories;

    if ( category&&category!== 'all')
    {
        let courses = await coursesModle.getByCategorey(category);
         res.render('Home',{
         userId: req.session.userId,
            courses: courses,
             name:  req.session.userName,
             user:user
        })
    }
    else
    {
        let courses = await coursesModle.allCourses();
        res.render('Home',{
        userId: req.session.userId,
        courses: courses,
        name:  req.session.userName,
        user:user
        })
    }
}