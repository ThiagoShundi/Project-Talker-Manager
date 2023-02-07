const express = require('express');
const file = require('../utils/readAndWriteFiles');
const validateEmails = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const loginRouter = express.Router();

loginRouter.post('/', validateEmails, validatePassword, async (req, res) => {
    const { email, password } = req.body; 
    const newLogin = await file.createLogin(email, password);

     return res.status(200).json(newLogin);
  });

module.exports = {
    loginRouter,
  };
