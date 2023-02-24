const express = require('express')
const router = express.Router()

router.get('/', async(req, res) =>{
    let books
    try {
        books = await books.find().sort({ createdAt: 'desc' }).limit(20).exec()
    }
     catch{
        books = []
     }

     res.render('index', {books: books})
})

module.exports = router