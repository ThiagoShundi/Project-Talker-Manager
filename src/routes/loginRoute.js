const express = require('express');
const file = require('../utils/readAndWriteFiles');
const validateEmails = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const loginRouter = express.Router();

loginRouter.post('/', validateEmails, validatePassword, async (req, res) => {
    const newLogin = await file.createLogin();

     return res.status(200).json(newLogin);
  });

module.exports = {
    loginRouter,
  };
