# Node.js CLI Typescript Generator

[![npm version](https://badge.fury.io/js/generator-nodejs-cli-typescript.svg)](http://badge.fury.io/js/generator-nodejs-cli-typescript)

A [Yeoman](http://yeoman.io/) generator to setup a __Node.js__ command-line interface app in __Typescript 2.0__

## Usage

Install `generator-nodejs-cli-typescript` globally

```bash
npm i -g generator-nodejs-cli-typescript
```

Create a new project directory and run `yo`

```bash
mkdir your-project && cd &_
yo nodejs-cli-typescript
```

You can use `npm run` to get information about available tasks

```bash
Lifecycle scripts included in your-project:
  test
    npm run build && mocha --compilers ts:ts-node/register --recursive test/**/*-spec.ts

available via `npm run-script`:
  clean
    rimraf dist
  build
    npm run clean && tsc --pretty
  watch
    npm run build -- --watch
  watch:test
    npm run test -- --watch
```


## License

MIT
