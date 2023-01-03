#!/usr/bin/env node
// console.log("Current directory:", __dirname);
// // Current directory: C:\Users\pilar\OneDrive\Escritorio\DEV001-md-links\src\module

// console.log('\x1b[31m%s\x1b[0m', 'Error: invalid path, must be a string')
// // console.log(process.argv[0]);

const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');
/**
 * returns the path of the file to be read
 */
const pathUserInput = (fileInput) => process.argv[fileInput];
console.log('pathUserInput: ' + pathUserInput(process.argv[2]));

/**
 * returns true if the path exists
 */
const pathExists = (filePath) => fs.existsSync(filePath, 'utf8');
console.log('pathExists: ' + pathExists(process.argv[1]));

/**
 * returns if the path is a directory or a file
 */
const isAFile = (filePath) => {
    if (fs.statSync(filePath).isFile()) {
        return 'file';
    } else if (fs.statSync(filePath).isDirectory()) {
        return 'directory'; 
    } else {
        return 'invalid path';
    }
}
/**
 * returns always an absolute path
 */
const getAbsolutePath = (filePath) => (path.isAbsolute(filePath)) ? filePath : path.resolve(filePath);
console.log('getAbsolutePath: ' + getAbsolutePath('src/module/index.js'));
/**
 * read synchronous directory an returns the Buffer value as a string
*/
const readDirectory = (directory) => fs.readdirSync(directory);
console.log('readDirectory: ' + readDirectory('sample_folder'));

/**
 * returns true if the file is a markdown file 
*/
const isMarkdown = (filePath) => path.extname(filePath) === '.md';
console.log('isMarkdown: ' + isMarkdown('src/module/index.md'));

/**
 * returns the path of the file to be read
 * pathJoinDirectory('sample_folder', 'sample_two.md')
 * // returns 'sample_folder/sample_two.md'
 **/
const pathJoinDirectory = (directory, file) => path.join(directory, file);
console.log('pathJoinDirectory: ' + pathJoinDirectory('sample_folder', 'sample_two.md'));


/**
 * returns an array of objects with the following properties:
 * href, text, file
 */
const getLinks = (markdown) => {
    const links = [];
    const regex = /(\[(.*?)\])(\((.*?)\))/gim;
    let match = regex.exec(markdown);
    for (let i = 0; i < markdown.length; i++) {
        if (match !== null) {
            links.push({
                href: match[4],
                text: match[2],
                file: 'sample_folder/sample_two.md',
            });
            match = regex.exec(markdown);
        }
    }
    return links;
};
/**
 * returns the same array of objects as readFile, but pushes the new
 * properties (status and ok) to the array
 */
const getLinksValidated = (markdown) => {
    const links = [];
    const regex = /(\[(.*?)\])(\((.*?)\))/gim;
    let match = regex.exec(markdown);
    for (let i = 0; i < markdown.length; i++) {
        if (match !== null) {
            links.push({
                href: match[4],
                text: match[2],
                file: pathUserInput(1),
                status: fetch(match[4])
                    .then((response) => {
                        console.log(response.status);
                    }),
                ok: fetch(match[4])
                    .then((response) => {
                        (response.ok) ? console.log('ok') : console.log('fail');
                    })
            });
            match = regex.exec(markdown);
        }
    }
    return links;
};

/**
 * read asynchronous file and returns the Buffer value as an object (with href, text and file properties) when the promise is resolved
 */
const readFile = (filePath) => fsp.readFile(filePath, 'utf8')
    .then((data) => {
        console.log(getLinks(data));
    })
    .catch((error) => {
        console.error(error + 'Error: file not found');
    });
// console.log('readFile: ' + readFile('sample_folder/sample_two.md'));
/**
 * read asynchronous file and returns the Buffer value as an object (with href, text, file, status and ok properties) when the promise is resolved
 */
const readFileValidated = (filePath) => fsp.readFile(filePath, 'utf8')
    .then((data) => {
        console.log(getLinksValidated(data));
    })
    .catch((error) => {
        console.error(error + 'Error: file not found');
    });


const callsDirectory = readDirectory('sample_folder');
const traverseDirectory = callsDirectory.forEach(file => {
    // en path join coloca el argv (para rescatar el input del usuario) y el file
    const filePath = getAbsolutePath(pathJoinDirectory('sample_folder', file));
    if (pathExists(filePath) && isMarkdown(filePath)) {
        return readFileValidated(filePath);
    } else {
        throw new Error('Error: file not found');
    }
});

/**
 * returns quantity of unique links (no duplicates)
 */
const uniqueLinks = (links) => {
    let uniqueLinks = [];
    links.forEach(link => {
        if (!uniqueLinks.includes(link.href)) {
            uniqueLinks.push(link.href);
        }
    });
    return uniqueLinks.length;
}

/**
 * returns quantity of broken links
 */
const brokenLinks = (links) => {
    let brokenLinks = [];
    links.forEach(link => {
        if (link.ok === false) {
            brokenLinks.push(link.href);
        }
    });
    return brokenLinks.length;
}
/**
 *  function mdLinks that receives two arguments:
 * 1. path to file or directory
 * 2. options object with the following property:
 * validate: true or false
 * returns a promise that resolves to an array of objects
 */
const mdLinks = (filePath, options) => {
    options = {
        validate: true,
    }
    if (pathExists(filePath)) {
        if (isMarkdown(filePath)) {
            if (options.validate) {
                return readFileValidated(filePath);
            } else {
                return readFile(filePath);
            }
        } else {
            const directory = readDirectory
            directory.forEach(file => {
                if (isMarkdown(file)) {
                    if (options.validate) {
                        return readFileValidated(file);
                    } else {
                        return readFile(file
                        );
                    }
                }
            });
        }
    } else {
        console.log('\x1b[31m%s\x1b[0m', 'Error: file not found');
    }
}

module.exports = {
    pathUserInput,
    pathExists,
    getAbsolutePath,
    readDirectory,
    isMarkdown,
    pathJoinDirectory,
    getLinks,
    getLinksValidated,
    readFile,
    readFileValidated,
    uniqueLinks,
    brokenLinks,
    mdLinks,
};
