const express = require("express");
const cors = require("cors");
var corsMiddleware = function(req, res, next) {
    console.log("cors");
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization')
    next()
}
const bodyParser = require("body-parser")
require('dotenv').config();

// APP
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(corsMiddleware);
const authMiddlewares = require('./middlewares/auth');
app.use(authMiddlewares.checkTokenSetUser);

const authRouter = require('./routes/auth');
const categoriiRouter = require('./routes/categories');
// const materiiRouter = require('./routes/materii');
// const grileRouter = require('./routes/grile');
const userRouter = require('./routes/user');
const cursRouter = require('./routes/course');
const userCourseRouter = require('./routes/user_courses');
const courseChapterRouter = require('./routes/course_chapters');
const chapterRouter = require('./routes/chapter');

app.use('/api/auth', authRouter);
app.use('/api/categorii/', categoriiRouter);
app.use('/api/user/', userRouter);
app.use('/api/curs', cursRouter);
app.use('/api/user_has_courses', userCourseRouter)
app.use('/api/course_has_chapters', courseChapterRouter)
app.use('/api/capitol', chapterRouter)



app.post('/grile', async (req, res) => {
    let model = req.body;
    model.idMaterie =  await materieIdByName(model.materie);
    delete model.materie;
    model.idCategorie = await categorieIdByName(model.categorie, model.idMaterie);
    delete model.categorie;
    connection.query("insert into Grile set ?", model, (err, results, fields) => {
        if(err) console.log(err);
    })
})



app.listen(5001, () => {

});