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
            name: 'appname',
            message: 'Provide a name for your project',
            default: this.appname // Default to current folder name
        }, {
            type: 'input',
            name: 'execname',
            message: 'Provide a name for your executable',
            default: this.appname.replace(' ', '-').toLowerCase()
        }, {
            type: 'input',
            name: 'authorname',
            message: 'What is your name?',
            default: this.user.git.name()
        }, {
            type: 'input',
            name: 'authoremail',
            message: 'What is your email address?',
            default: this.user.git.email()
        }]).then((answers) => {
            this.appname = answers.appname;
            this.execname = answers.execname.replace(' ', '-').toLowerCase();
            this.authorname = answers.authorname;
            this.authoremail = answers.authoremail;
        });
    }

    writing() {
        this.fs.copy(
            this.templatePath('src'),
            this.destinationPath('src')
        )
        this.fs.copy(
            this.templatePath('bin/app'),
            this.destinationPath('bin/' + this.execname)
        )
        this.fs.copy(
            this.templatePath('bin/app-write'),
            this.destinationPath('bin/' + this.execname + '-write')
        )
        this.fs.copy(
            this.templatePath('test'),
            this.destinationPath('test')
        )
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                appname: this.appname,
                execname: this.execname,
                authorname: this.authorname,
                authoremail: this.authoremail
            }
        )
        this.fs.copyTpl(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'), {
                authorName: this.authorName,
                year: new Date().getFullYear().toPrecision(4)
            }
        )
        this.fs.copy(
            this.templatePath('_tsconfig.json'),
            this.destinationPath('tsconfig.json')
        )
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        )
    }

    install() {
        var generator = this;
        this.npmInstall(null, null, function() {
            generator.spawnCommandSync('npm', ['run', 'build']);
        });
    }

    end() {}

};
