const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {

    initializing() {
        var done = this.async();

        this.log(yosay(
            chalk.gray.bgCyan("Welcome to the Node.js command-line interface Typescript generator!")
        ));

        done();
    }

    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'projectName',
            message: 'What is your project name?',
            default: this.appname // Default to current folder name
        }, {
            type: 'input',
            name: 'authorName',
            message: 'What is your name?',
            default: this.user.git.name()
        }, {
            type: 'input',
            name: 'authorEmail',
            message: 'What is your email address?',
            default: this.user.git.email()
        }]).then((answers) => {
            this.projectName = answers.projectName;
            this.authorName = answers.authorName;
            this.authorEmail = answers.authorEmail;
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                projectName: this.projectName,
                authorName: this.authorName,
                authorEmail: this.authorEmail
            }
        )
        this.fs.copyTpl(
            this.templatePath('_LICENSE'),
            this.destinationPath('LICENSE'), {
                authorName: this.authorName,
                year: new Date().getFullYear().toPrecision(4)
            }
        )
    }

    install() {
        this.npmInstall();
    }

    end() {}

};
