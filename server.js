const express = require("express");
const path = require("path");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create();
const session = require("express-sessions");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
//remember to use an env variable to store this data
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    // Stored in milliseconds
    //setting a maximum age for this session
    maxAge: 1 * 60 * 60 * 1000, // expires after 1 hour
  },
  //make sure to set up store with session options in project
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars setup
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Routes
app.use(routes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
