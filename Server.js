require('dotenv').config();
const express = require("express")
const session = require("express-session");
const mongoose = require("mongoose")
const routes = require("./routes/Route")
const cors = require("cors")
const helmet = require('helmet');

const postRoutesmenu = require('./routes/menu');
const passport = require("passport");
const authRoute = require("./routes/facebook.route")
const app = express()
const PORT = process.env.SERVER_PORT || 8000;
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json())
app.use(session({
    secret: '+XqJcU38f7J1m7MBV8Fq2W5Q5e6uF4PqzUpZt9A9KCA=', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }));

app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);

// Use Helmet to set the CSP header
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'"],
    styleSrc: ["'self'"],
    connectSrc: ["'self'"],
  },
}));


// MongoDB connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); 
  }
})();


app.use("/api", routes)
app.use(postRoutesmenu);

app.listen(PORT, () => console.log("Listening at " + PORT));
module.exports = app;
