const express = require('express');
const path = require('path')
const mongoose = require('mongoose');

const flash  = require('connect-flash')
const check = require('express-validator').check
const session = require('express-session');
const app = express();
const MongoCourses = require('connect-mongo');






app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs');

app.set('views','views')

app.use(session({
    secret: "This is a secert key",
    store: MongoCourses.create({
      mongoUrl: "mongodb://localhost:27017/CoursesOnline"
    }),
    saveUninitialized: false,
    resave: false
}))

mongoose.connect('mongodb://localhost:27017/CoursesOnline', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});




app.use(flash())
const homeRouter = require('./routes/home.route')
const authRouter = require('./routes/auth.route');
const courseRouter = require('./routes/courses.route');
const profileRouter = require('./routes/profile.route');
const teacherRouter= require('./routes/teachers.route')
const searchRouter= require('./routes/search.route')

app.use(homeRouter)
app.use(authRouter)
app.use(courseRouter)
app.use(profileRouter)
app.use(teacherRouter)
app.use(searchRouter)

app.listen(3000, () => {
    console.log("Server Listen On Port 3000")
})