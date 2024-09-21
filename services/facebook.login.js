const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

FACEBOOK_APP_ID = "3797704980470064";
FACEBOOK_APP_SECRET = "6eeaaebd17c288da5a7a32fd23a35b55";

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "https://hotel-gayana-secure.vercel.app/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});