
const mongoose = require('mongoose');

const validation = require('express-validator').validationResult;



let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    access: String,
    img: String,
})




let users = mongoose.model('users',userSchema);



exports.findUserById = async (id) =>
{
    const user = await users.findById(id);
    return user;
}

exports.findEmail = async(email) =>
{
    const user = await users.findOne({email: email})
}


exports.deleteAccount = async(id) =>
{
    await users.findByIdAndDelete(id);
}

exports.findTeacher = async() =>
{
    return await users.find({access: "Teacher"})   
}

exports.updateName = async(id,newName) =>
{
    const user = await users.findByIdAndUpdate(id,{
        name: newName,
    });
}
exports.updatePassword = async(id,newPassword) =>
{
    const user = await users.findByIdAndUpdate(id,{
        password: newPassword,
    });
}

exports.updateImg = async(id,newImg) =>
{
    const user = await users.findByIdAndUpdate(id,{
        img: newImg,
    });
}




exports.createNewUser = async (data) =>
{
    
    let user = await new users(data);
    await user.save();
}

exports.findUser = async (email) =>
{
    let find = await users.findOne({email: email})
    return find;
}


exports.findUserByName = async (name) =>
{
    let find = await users.find({name: name})
    return find;
}