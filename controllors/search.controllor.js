const authModle = require('..//modules/auth.modle')






exports.getSearch = async (req,res) =>
{
    const search = req.query.q;
    let user = await authModle.findUserById(req.session.userId)
    let userSearch = await authModle.findUserByName(search);
    console.log(user)
    res.render('search' ,
    {
         userId: req.session.userId,
           name:  req.session.userName,
           user: user,
           userSearch:userSearch
    }
    )
}