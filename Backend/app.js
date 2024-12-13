const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const MongoStore = require('connect-mongo');


const authRoute = require("./routes/auth");
const donorRoute = require("./routes/donor");
const prospectRoute = require("./routes/prospect");


const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User  = require("./models/User");

const dbUrl = process.env.DB;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    // crypto: {
    //     secret: process.env.SECRET,
    // },
    // touchAfter: 24*3600,       //we want the user to keep logged in till 24hr i.e 24*3600 seconds
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,   // now login Date + milliseconds in 7 days (1 week)
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //     httpOnly: true,    // to prevent from cross scripting attack [for security]
    // },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); //to use static authenticate method of passport-local-mongoose model 

passport.serializeUser(User.serializeUser()); //user se related info ko store krwana
passport.deserializeUser(User.deserializeUser()); //user se related info ko de-store krwana

// JSON
app.use(express.json());

// ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/donors", donorRoute);
app.use("/api/v1/prospects", prospectRoute);



store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE!", err);
});




//CORS
app.use(cors());



module.exports = app;