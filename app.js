const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const Mongoose = require("mongoose")
const { default: mongoose } = require("mongoose")
const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")
const bookRouter = require("./routes/books")

require("dotenv").config()

const app = express()

// setting the views engine
app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')

// serving static file
app.use(express.static('public'))

// express middleware
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    limit: '20mb',
    extended: true 
}));



// connect to Mongoose database
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to Database Successfully'))



// routes
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


// CONNECT TO PORT
const port = process.env.PORT || 7070;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


