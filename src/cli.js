#!/usr/bin/env node
const { mdLinks } = require('./module/index.js')
const { welcome, help } = require('./welcome.js');
const chalk = require('chalk');
// Receive argument via command line
const zero = process.argv[1];
const first = process.argv[2];
const second = process.argv[3];
const third = process.argv[4];

/**
 * returns quantity of unique links (no duplicates)
 */
const uniqueLinks = (data) => {
    const setUnique = new Set(data.map((link) => link.href)).size;
    return setUnique;
};
/**
 * returns quantity of broken links
 */
const brokenLinks = (data) => {
    let brokenLinks = [];
    data.forEach(link => {
        if (link.ok === 'fail') {
            brokenLinks.push(link.href);
        }
    });
    return brokenLinks.length;
}

/**
 * returns total quantity of links
 */
const totalLinks = (links) => {
    return links.length;
}
/**
 * package md-links only
 */
const mdLinksOnly = (zero, first, second, third) => (zero !== undefined && first === undefined && second === undefined && third === undefined);

/**
 * file path only without options
 */
const filePathOnly = (first, second, third) => (first !== undefined && second === undefined && third === undefined);

/**
 * options: --validate only
 */
const validateOnly = (first, second, third) => (first !== undefined && ((second === '--validate' && third === undefined) || (third === '--validate' && second === undefined)));

/**
 * options: --stats only
 */
const statsOnly = (first, second, third) => (first !== undefined && ((second === '--stats' && third === undefined) || (third === '--stats' && second === undefined)));

/**
 * options: --validate && --stats without order
 */
const validateAndStats = (first, second, third) => (first !== undefined && ((second === '--stats' && third === '--validate') || (second === '--validate' && third === '--stats')));

// AGREGAR EL FILEPATH AL CONSOLE.LOG
// Conditionals to check if the user entered a valid command and execute the function mdLinks
if (mdLinksOnly(zero, first, second, third)) {
    return welcome();
} else if (first === '--help') {
    return help();
}
if (filePathOnly(first, second, third)) {
    mdLinks(first).then(data => {
        data.forEach(elem => console.log(elem.href + ' ' + elem.text));
    });
} else if (validateOnly(first, second, third)) {
    mdLinks(first, { validate: true }).then(data => {
        data.forEach(elem => console.log(elem.href + ' ' + elem.ok + ' ' + elem.status + ' ' + elem.text));
    });
} else if (statsOnly(first, second, third)) {
    mdLinks(first).then(data => {
        console.log('Total: ' + totalLinks(data))
        console.log('Unique: ' + uniqueLinks(data));
    });
} else if (validateAndStats(first, second, third)) {
    mdLinks(first, { validate: true }).then(data => {
        console.log('Total: ' + totalLinks(data));
        console.log(chalk.blue('Unique: ' + uniqueLinks(data)));
        console.log(chalk.red('Broken: ' + brokenLinks(data)));
    });
} else {
    console.log('Please enter a valid command');
}