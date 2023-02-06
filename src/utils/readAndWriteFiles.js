const fs = require('fs/promises');
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '../talker.json';
  try {
    const arrayTalker = await fs.readFile(join(__dirname, path), 'utf-8');

    return JSON.parse(arrayTalker);
  } catch (error) {
    return null;
  }
};

const getTalkerById = async (id) => {
    const arrayTalkerId = await readTalkerFile();
    return arrayTalkerId.filter((talker) => talker.id === id);
  };

module.exports = {
    readTalkerFile,
    getTalkerById,
  };