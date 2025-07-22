const mongoose = require('mongoose');





let courseSchema = mongoose.Schema({
    image: String,
    name: String,
    description: String,
    category: String,
    Instructor: String,
    duration: String,
    userId: String,
})



let Courses = mongoose.model('course',courseSchema);




// This Get All Courses In Database
exports.allCourses = async() =>
{
    let course = await Courses.find({});
    return course;
}


exports.getCourseById = async(id) =>
{
    let course = await Courses.find({userId: id})
    return course;
}


exports.getCourseByName = async(name) =>
{
    let course = await Courses.findOne({name: name})
    return course
}

exports.getByCategorey = async(categorey) =>
{
    let course = await Courses.find({Categories:categorey })
    return course;
}