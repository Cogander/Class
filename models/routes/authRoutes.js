const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("landing");
});

router.post("/register", async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
    phone,
    role
  });

  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("User tidak ditemukan");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.send("Password salah");

  req.session.user = user;

  if (user.role === "teacher") {
    res.redirect("/teacher/dashboard");
  } else {
    res.redirect("/student/dashboard");
  }
});

module.exports = router;
