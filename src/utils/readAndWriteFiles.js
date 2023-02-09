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
     await fs.writeFile(join(__dirname, path), JSON.stringify(content));
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

const editTalker = async (id, name, age, talk) => {
    const arrayTalker = await readTalkerFile();
    console.log(id, name, age, talk);
    const arrayTalkerEdit = arrayTalker.map((act) => {
        if (act.id !== Number(id)) return act;
        return { ...act, name, age, talk };
    });

    console.log(arrayTalkerEdit);
    await writeFile(arrayTalkerEdit);

    return arrayTalkerEdit;
  };

const deleteTalker = async (id) => {
    const arrayTalker = await readTalkerFile();

    console.log(arrayTalker);
    const talkerExists = arrayTalker.some(
        (tal) => tal.id === Number(id),
      );
      console.log(talkerExists);
    if (talkerExists) {
        const talkerDel = arrayTalker.filter(
          (fil) => fil.id !== Number(id),
        );
      
        console.log(talkerDel);

        await writeFile(talkerDel);

        return talkerDel;
    }
  };

module.exports = {
    readTalkerFile,
    getTalkerById,
    writeFile,
    createLogin,
    createTalker,
    editTalker,
    deleteTalker,
  };