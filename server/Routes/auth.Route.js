const express = require("express");
const userModel = require("../model/user.model");
const router = express.Router();

router.post('/register', async(req,res) => {
  const {email,password} = req.body

  const register =await userModel.create({
    email,password
  })

  res.status(201).json({
    mesasage:"register user",
    register
  })

})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    
    if (!user) {
      return res.status(404).json({
        message: "user accund is not found",
      });
    }

    const isPasswordValid = password === user.password

    if (!isPasswordValid) {
      return res.status(401).json({
        mesasage: "invalid password",
      });
    }

    res.status(200).json({
      mesasge: "user is logedin",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
});


module.exports = router;
