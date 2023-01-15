const gradient = require('gradient-string');
const chalk = require('chalk');
// Description type md-links only
const welcome = () => {
    console.log(chalk.blue('Hellooo! Welcome to the md-links package!'));
    console.log(chalk.gray('If you want to know how to use this npm package, please type ' + chalk.bgGrey('md-links --help')));
    console.log(gradient.passion('Made with very much ❤  by pibmunoz'))
}

// Description type md-links --help
const help = () => {
    console.log('\n' + chalk.yellow('With this npm library you can find all the links in your markdown file or directory and their status to validate them :)'));
    console.log('\n' + chalk.bgBlack(' md-links <path> ') + chalk.grey(' for the links in your file or directory'));
    console.log(chalk.bgBlack(' md-links <path> --validate ') + chalk.grey(' for the links and their status in your markdown file'));
    console.log(chalk.bgBlack(' md-links <path> --stats ') + chalk.grey(' for the total and unique links in your markdown file or directory'));
    console.log(chalk.bgBlack(' md-links <path> --validate --stats ') + chalk.grey(' for the total, unique and broken links in your markdown file or directory' + '\n'));
}

module.exports = {
    welcome,
    help,
}