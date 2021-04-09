const axios = require('axios')
const fsPromises = require('fs/promises')
const chalk = require('chalk');


// Function vérifie si url est valide
function isValidURL(input) {
  var res = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

if (process.argv.length != 3) {
  console.log(`usage: node my-wget.js url`)
  process.exit(1)
}

// vérifie si url est valide
if (!isValidURL(process.argv[2])) {
  console.log(`Error: ${process.argv[2]} is not a url.`)
  process.exit(1)
}

let urlInput = process.argv[2]

const main = async () => {

  const fileOutput = 'index.html'

  try {
    const response = await axios.get(urlInput)
    await fsPromises.writeFile(fileOutput, response.data) // response.data est une string qui est la page html
    const stats = await fsPromises.stat(fileOutput)

    const fileSize = (`${stats.size/1000} ko`) 
    console.log(`le contenu du site ${chalk.blue(process.argv[2])} a bien été copier dans le fichier ${chalk.blue(fileOutput)} et le fichier pèse environ ${chalk.blue(fileSize)}`)
  } catch (e) {
    console.log(e.message)
  }
}

main()