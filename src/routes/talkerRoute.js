const express = require('express');
const file = require('../utils/readAndWriteFiles');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
    const talkers = await file.readTalkerFile();
    if (!talkers) {
      return res.status(200).json({ message: '[]' });
    }
    return res.status(200).json(talkers);
  });

talkerRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await file.getTalkerById(Number(id));

    if (talkers.length !== 0) {
    return res.status(200).json(talkers[0]);
    } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  });

talkerRouter.post('/', async (req, res) => {
    const { name, age, talk } = req.body; 
    const newLogin = await file.createLogin(name, age, talk);

    if (name === undefined) {
     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (name.length < 3) {
     return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (Number(age) === undefined) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
     }
    if (!age.isNaN) {
      return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
     }
     
     return res.status(200).json(newLogin);
  });

  module.exports = {
    talkerRouter,
  };