require('dotenv').config();
const express = require("express")
const session = require("express-session");
const mongoose = require("mongoose")
const routes = require("./routes/Route")
const cors = require("cors")
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });

const postRoutesmenu = require('./routes/menu');
const passport = require("passport");
const authRoute = require("./routes/facebook.route")
const googleAuth = require("./routes/google.route")
const app = express()
const PORT = process.env.SERVER_PORT || 8000;
const bodyParser = require('body-parser');

// mark2: put here
app.use(session({
  name: "test",
  secret: "test",
  cookie: { maxAge: 30 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false
}))

// Allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', ,'UPDATE','DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'X-CSRF-TOKEN'], 
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.options('*', cors());


app.use(cookieParser());


app.get('/api/csrf-token', csrfProtection, (req, res) => {
  console.log("Session Info:", req.session);
  res.json({ csrfToken: req.csrfToken() });
});

app.use(express.json())

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use("/googleauth", googleAuth);

// Use Helmet to set the CSP header
app.use(helmet());
app.use(helmet.hsts({
  maxAge: 31536000, // 1 year in seconds
  includeSubDomains: true,
  preload: true
}));
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'"],
    styleSrc: ["'self'"],
    connectSrc: ["'self'"],
  },
}));

app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(helmet.xssFilter());

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

// Middleware to handle CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).send('Invalid CSRF token');
  }
  next();
});

app.listen(PORT, () => console.log("Listening at " + PORT));
module.exports = app;
