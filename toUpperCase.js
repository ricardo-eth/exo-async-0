const fsPromises = require("fs/promises");

// ajout du async obligatoire pour un programme asynchrone
const myReadFileToUpperCase = async () => {
  // ajout de "fsPromises" et de "await" pour utilise les versions asynchrones de l'api fs
  try {
    let txt1 = await fsPromises.readFile("hello.txt", "utf-8");
    txt1 = txt1.toUpperCase();
    await fsPromises.writeFile("hello.txt", txt1);
    console.log(txt1);
  } catch (e) {
    console.log(e.message);
  }
};

myReadFileToUpperCase();
