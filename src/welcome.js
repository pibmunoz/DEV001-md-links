const gradient = require('gradient-string');
const chalk = require('chalk');
// Description type md-links only
const welcome = () => {
    console.log(chalk.blue('Hellooo! Welcome to the md-links package!'));
    console.log(chalk.green('If you want to know how to use this npm package, please type md-links --help'));
    console.log(gradient.passion('Made with very much ❤  by pibmunoz'))
}

// Description type md-links --help
const help = () => {
    console.log('\n' + ' md-links <path> for the links in your file or directory');
    console.log(' md-links <path> --validate for the links and their status in your markdown file');
    console.log(' md-links <path> --stats for the total and unique links in your markdown file or directory');
    console.log(' md-links <path> --validate --stats for the total, unique and broken links in your markdown file or directory');
}

module.exports = {
    welcome,
    help,
}