const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const common = require('./routes/middleware').common;
const mongoose = require('mongoose');

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://daidabox:daidabox@cluster0.ktvul.mongodb.net/VishalPractice?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

app.use(express.static(path.join(__dirname, './public')));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './view' ));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(common);
// Routes
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
app.use('/', homeRoutes);
app.use('/user', userRoutes);
 
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
