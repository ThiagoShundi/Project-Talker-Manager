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

const writeFile = async (content) => {
  const path = '../talker.json';
  try {
     const arrayLogin = await fs.writeFile(join(__dirname, path), JSON.stringify(content));

    return JSON.parse(arrayLogin);
  } catch (error) {
    return null;
  }
};

const createLogin = async (email, password) => {
    const arrayTalker = await readTalkerFile();
    const token = Math.random().toString(36).substring(2, 10) 
    + Math.random().toString(36).substring(2, 10);
    const newLogin = { email, password, token };

    await writeFile(arrayTalker);

    return newLogin;
  };
  
const createTalker = async (name, age, talk) => {
    const arrayTalker = await readTalkerFile();

    const newTalker = { name, age, talk };

    arrayTalker.push(newTalker);

    await writeFile(arrayTalker);

    return newTalker;
  };
 
module.exports = {
    readTalkerFile,
    getTalkerById,
    writeFile,
    createLogin,
    createTalker,
  };