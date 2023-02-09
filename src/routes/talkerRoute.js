const express = require('express');
const file = require('../utils/readAndWriteFiles');
const validateTalkerName = require('../middlewares/validateTalkerName');
const validateTalkerAge = require('../middlewares/validateTalkerAge');
const validateTalk = require('../middlewares/validateTalk');
const validateTalkRate = require('../middlewares/validateTalkRate');
const validateToken = require('../middlewares/validateToken');

const talkerRouter = express.Router();
talkerRouter.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await file.readTalkerFile();

  if (q === undefined) {
    return res.status(200).json(talkers);
  }
  const talkerFilter = talkers.filter((tal) => tal.name.includes(q));
  console.log(talkerFilter);
  return res.status(200).json(talkerFilter);
});

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

talkerRouter.post('/', validateToken, validateTalkerName, validateTalkerAge, 
validateTalk, validateTalkRate, async (req, res) => {
    const { name, age, talk } = req.body;

    const newLoginTalker = await file.createTalker(name, age, talk);

     return res.status(201).json(newLoginTalker);
  });

talkerRouter.put('/:id', validateToken, validateTalkerName, validateTalkerAge, 
validateTalk, validateTalkRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  // console.log(talk);
  await file.editTalker(id, name, age, talk);
  const newEdit = { id: Number(id), name, age, talk };

  res.status(200).json(newEdit);
});

talkerRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const del = await file.deleteTalker(id);

  res.status(204).json(del);
});

  module.exports = {
    talkerRouter,
  };