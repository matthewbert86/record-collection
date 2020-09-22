if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
// require index router to tell our app to use it
const indexRouter = require('./routes/index');

// set up view engine with ejs
app.set('view engine', 'ejs');
// set where views are coming from
app.set('views', __dirname + '/views');
// set up express layouts in layouts folder
app.set('layout', 'layouts/layout');
// tell express to use express layouts
app.use(expressLayouts);
// tell express where public files live
app.use(express.static('public'));

// Database
// get values from Database
// import mongoose
const mongoose = require('mongoose');
// set up connection through .env file
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// log if we are connected to database or if we have error
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// use indexRouter
app.use('/', indexRouter);

// set up server to run on port 3000
app.listen(process.env.PORT || 3000);
