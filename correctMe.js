const fsPromises = require("fs/promises");

//ajout du async obligatoire pour un programme asynchrone
const myReadFile = async () => {
  try {
    const txt1 = await fsPromises.readFile("hello.txt", "utf-8");
    console.log(txt1);
  } catch (e) {
    console.log(e.message);
  }
};
myReadFile();
