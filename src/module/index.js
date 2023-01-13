const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');

/**
 * returns true if the path exists
 */
const pathExists = (filePath) => {
    return fs.existsSync(filePath, 'utf8');
}

/**
 * returns always an absolute path
 */
const getAbsolutePath = (filePath) => (path.isAbsolute(filePath)) ? filePath : path.resolve(filePath);

/**
 * returns if the path is a file, a directory or an invalid path
 */
const isFileOrDirectory = (filePath) => {
    if (fs.statSync(filePath).isFile()) {
        return 'file';
    } else if (fs.statSync(filePath).isDirectory()) {
        return 'directory';
    } else {
        return 'invalid path';
    }
};
/**
 * returns true if the file is a markdown file 
*/
const isMarkdown = (filePath) => path.extname(filePath) === '.md';

/**
 * returns an array of objects with the following properties:
 * href, text, file
 */
const getLinks = (markdown, filePath) => {
  const links = [];
  const regex = /(\[(.*?)\])(\((.*?)\))/gim;
  let match = regex.exec(markdown);
  for (let i = 0; i < markdown.length; i++) {
      if (match !== null) {
          links.push({
              href: match[4],
              text: match[2],
              file: filePath,
          })
          match = regex.exec(markdown);
      }
  }
  return links;
};

/**
* returns the same array of objects as readFile, but pushes the new
* properties (status and ok) to the array
*/
const getLinksValidated = (markdown, filePath) => {
  const promises = [];
  const regex = /(\[(.*?)\])(\((.*?)\))/gim;
  let match = regex.exec(markdown);
  for (let i = 0; i < markdown.length; i++) {
      if (match !== null) {
          let thisMatch = match;
          promises.push(fetch(match[4]).then((response) => {
              return {
                  href: thisMatch[4],
                  text: thisMatch[2],
                  file: filePath,
                  status: response.status,
                  ok: (response.ok) ? 'ok' : 'fail',
              }
          }))
          match = regex.exec(markdown);
      }
  }
  return Promise.all(promises);
};

/**
* read asynchronous file and returns the Buffer value as an object (with href, text and file properties) when the promise is resolved
*/
const readFile = (filePath) => fsp.readFile(filePath, 'utf8')
  .then((data) => {
      return getLinks(data, filePath);
  })
  .catch((error) => {
      console.error(error + 'Error: file not found');
  });

/**
* read asynchronous file and returns the Buffer value as an object (with href, text, file, status and ok properties) when the promise is resolved
*/
const readFileValidated = (filePath) => fsp.readFile(filePath, 'utf8')
  .then((data) => {
     return getLinksValidated(data, filePath);
  })
  .catch((error) => {
     console.error(error + 'Error: file not found');
  });



module.exports = {
  pathExists,
  getAbsolutePath,
  isFileOrDirectory,
  isMarkdown,
  getLinks,
  getLinksValidated,
  readFile,
  readFileValidated,
};