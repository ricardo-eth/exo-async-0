const axios = require('axios')
const fsPromises = require('fs/promises')
const chalk = require('chalk');


// Function checks if input is URL valid
function isValidURL(input) {
  var res = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

if (process.argv.length != 3) {
  console.log(`usage: node my-wget.js url`)
  process.exit(1)
}

// check if url is valid
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
    console.log(`the content of the site ${chalk.blue(process.argv[2])} has been copied into the ${chalk.blue(fileOutput)} file and the file weighs approximately ${chalk.blue(fileSize)}.`)
  } catch (e) {
    console.log(e.message)
  }
}

main()