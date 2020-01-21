var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var MongoStore = require("connect-mongo");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// connect mongo
mongoose.connect(
  "mongodb://localhost/soloproject1-backend",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    err ? console.log(err) : console.log("Connected to DB");
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({ success: false, err });
});

module.exports = app;
