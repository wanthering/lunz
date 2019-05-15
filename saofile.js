const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder
      },
      {
        name: 'description',
        message: 'How would you descripe the new project',
        default: `my ${superb()} project`
      },
      {
        name: 'author',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        store: true
      },
      {
        name: 'features',
        message: 'Choose features to install',
        type: 'checkbox',
        choices: [
          {
            name: 'Linter / Formatter',
            value: 'linter'
          },
          {
            name: 'Prettier',
            value: 'prettier'
          }
        ],
        default: ['linter', 'prettier']
      },
      {
        name: 'test',
        message: 'Use jest as test framework?',
        type: 'confirm',
        default: true
      },
      {
        name: 'build',
        message: "How to bundle your Files?",
        choices: ['bili', 'babel'],
        type: 'list',
        default: 'bili'
      },
      {
        name: 'pm',
        message: 'Choose a package manager',
        choices: ['npm', 'yarn'],
        type: 'list',
        default: 'yarn'
      }
    ]
  },
  templateData() {
    const linter = this.answers.features.includes('linter')
    const prettier = this.answers.features.includes('prettier')
    return {
      linter, prettier
    }
  },
  actions() {
    return [{
      type: 'add',
      files: '**',
      filters: {
        '_.babelrc': this.answers.test || this.answers.build === 'babel',
        '_.eslintrc.js': this.answers.features.includes('linter'),
        'test/**': this.answers.test
      }
    }, {
      type: 'move',
      patterns: {
        '_package.json': 'package.json',
        '_gitignore': '.gitignore',
        '_.eslintrc.js': '.eslintrc.js',
        '_.babelrc': '.babelrc'
      }
    }]
  },
  async completed() {
    this.gitInit()
    await this.npmInstall({ npmClient: this.answers.pm })
    this.showProjectTips()
    const isNewFolder = this.outDir !== process.cwd()
    const cd = () => {
      if (isNewFolder) {
        console.log(`\t${this.chalk.cyan('cd')} ${this.outFolder}`)
      }
    }
    console.log()
    if (this.answers.features.includes('linter')) {
      console.log(this.chalk.bold(`  To lint the project:\n`))
      cd()
      if (this.answers.pm === 'yarn') console.log(`\tyarn lint\n`)
      else console.log(`\tnpm run lint\n`)
    }
    if (this.answers.test) {
      console.log(this.chalk.bold(`  launch unit tests:\n`))
      cd()
      if (this.answers.pm === 'yarn') console.log(`\tyarn test\n`)
      else console.log(`\tnpm run test\n`)
    }
    console.log(this.chalk.bold(`\n  To build the project:\n`))
    cd()
    if (this.answers.pm === 'yarn') console.log(`\tyarn build\n`)
    else console.log(`\tnpm run build\n`)
    console.log(this.chalk.bold(`  To publish after built:\n`))
    console.log(`\tnpm publish\n`)
    console.log(this.chalk.grey(`(please make sure you have logged in npm)`))
  }
}
