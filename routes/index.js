const util = require('./util')
const book = require('./book')
const app=require('../WebApp');

app.route('/create-db', 'post', util.CreateTable)
app.route('/books/create', 'post', book.Create)