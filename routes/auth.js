const router = require('express').Router()
const User = require("../models/User.model")
const bcrypt = require("bcrypt")

// Register
router.post("/register", async (req,res) => {
  
  try {
//       Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Generate new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
  
//  save user and respond
    const user = await newUser.save(200);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  } 
})

// Login

router.post("/login", async (req,res) => {
  try {
    const user = await User.findOne({email:req.body.email});
  !user && res.status(404).send("user not found")

  const validPassword = await bcrypt.compare(req.body.password , user.password)
  !validPassword && res.status(400).json("wrong password")

  res.status(200).json(user)

  } catch (error) {
    res.status(500).json(error);
  }
})

// router.get("/",(req,res) => {
//   res.send("authPage")
// })

module.exports = router