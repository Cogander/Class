require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "supersecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}));

app.use("/", require("./routes/authRoutes"));
app.use("/teacher", require("./routes/teacherRoutes"));
app.use("/student", require("./routes/studentRoutes"));

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
