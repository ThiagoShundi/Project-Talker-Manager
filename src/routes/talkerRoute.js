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

  module.exports = {
    talkerRouter,
  };