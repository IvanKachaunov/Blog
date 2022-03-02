const express = require('express');
const Article = require('./models/article');
const app = express();
const articleRouter = require('./routes/articles');
// const method = require('method-override');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true})    
//new mongoDB update useCreateIndex and more will always behave as true!

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 5000)
