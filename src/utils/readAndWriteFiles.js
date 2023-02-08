const fs = require('fs/promises');
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '../talker.json';
  try {
    const arrayTalker = await fs.readFile(join(__dirname, path), 'utf-8');

    return JSON.parse(arrayTalker);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return null;
  }
};

const createLogin = async () => {
    const arrayTalkerLogin = await readTalkerFile();
    const token = Math.random().toString(36).substring(2, 10) 
    + Math.random().toString(36).substring(2, 10);
    const newLogin = { token };

    await writeFile(arrayTalkerLogin);

    return newLogin;
  };
  
const createTalker = async (name, age, talk) => {
    const arrayTalker = await readTalkerFile();
    const idValue = (await readTalkerFile()).length + 1;
    
    const newTalker = { id: idValue, name, age, talk };

    // console.log(newTalker);
    arrayTalker.push(newTalker);

    await writeFile(arrayTalker);

    return newTalker;
  };

// const editTalker = async (id) => {
//     const arrayTalkerEdit = await getTalkerById.execute(id);
//     // const editTalker = { id, name, age, talk };

//     // await writeFile(arrayTalker);
//     console.log(arrayTalkerEdit);
//     // return 
//   };

module.exports = {
    readTalkerFile,
    getTalkerById,
    writeFile,
    createLogin,
    createTalker,
    // editTalker,
  };