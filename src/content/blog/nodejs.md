---
title: "Nodejs"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Nodejs"]
draft: false
description: "Introduction to Nodejs"
---

[ES modules in NodeJS](https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-node-js)

[ES modules in NodeJS](https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-the-browser)

## package.json package-lock.json

- Syntax of package.json.
- package.json contains more than just depenedencies. It has project properties like author, description, scripts etc.
- package.json conatins the minimum version number which is compatible.
- package-lock.json contains just the depenedencies. It has exact version number.
- Difference between tilde (~) and caret (^) in `package.json`.
- `^`: Install the latest minor version. ^1.x.x will match with 1.3.0 but not 2.0.0.
- `~`: Install the latest patch version. ~1.2.3 will match all 1.2.x versions but it will not match 1.3.0 or 1.3.x versions.

### SEE ALL HTTP verbs:

- PUT vs PATCH: PUT replaces the representation whereas PATCH updates patially.

### SQL vs No SQL

- Difference between SQL and NoSQL dbs.
- Various types of NoSQL dbs.

# Node

It is a runtime base on google chrome v8 engine.

## Node process and argv

- process is a built in module.
- process is a global object which gives access to process related features for eg. process.cwd().
- process.argv: gives an array of command line arguments when node.js process was launched.

## Node file system module

- `fs` module: use to work with file system.
- fs is not built in and has to be included using `require('fs')`.

## Node and npm

- `require()` and `module.exports =`
- requiring a directory: Node look for index.js file in a directory and get exports from it.
- You can instal `packages` using npm i package name.
- The package is installed in node_modules folder under the current directory.
- `package-lock.json`: Conent of the node_modules directory. Don't touch it.

## npm, local vs global package installation

- npm installs packages in local folder by default.
- To install a package globall, use `npm i -g packagename`.
- To require global packages in your JS file. Do `npm link packagename`.

## package.json file

- Contains metadata and dependencies about a package.
- It is created using npm init. shortcut is `npm init -y`.
- Whenever we install a package usig npm i, it is added as dependency in package.json.
- In older versions of npm we had to do npm i --save to include package in package.json.
- When we share our package, we don't share node_modules folder, but package.json.
- Whe some use npm install, it will install all packages in the package.json file.

### Update nodejs using nvm (node version manager)

1. Install nvm.

```shell
$ curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

2. Activate env variables, you can also open new terminal.

```shell
$ source ~/.bashrc
```

3. Find available node versions

```shell
$ nvm ls-remote
```

4. Install required node verison. You can install multiple node versions.

```shell
$ nvm install v10.16.2
```

5. To set default node version.

```shell
$ nvm use v10.16.2
```

6. Run Applition with Specific Version

```shell
$ nvm run v10.16.2 app.js
```

7. Remove unused node version

```shell
$ nvm uninstall v10.16.2
```

## npm

- It is a module which installs modules from `npm` repository.
- To install a package globally do `npm i packageName -g`.
- Normally packages are installed locally so that package stay on latest version.
- Build process will create a JS bundle which will be sent to browsers in production.
- Build process: Bundling + transpiling & polyfilling
- Bundling: Combine all files into one, compress the file and eliminate unused code.
- Transpiling & polyfilling: Convert modern JS into ES5 so that older browsers can also work. Babel is used for this.
- Build process tools: Webpack and parcel.

### Parcel

- It is a bundler just like webpack but need less configuration.
- npx parcel index.html
- It creates dist folder which contains the bundled JS files.
- Hot module replacement. No need to reload page when the module code changes.
- Parcel inject the newly built module which reloading the page.

```
  if(module.hot) {
  module.hot.accept()
  }
```

## Invoking parcel using npm scripts

- Under scripts in `package.json`
- "start": "parcel index.html"
- Then do npm run start.
- "build": parcel build index.html
- Then do npm run build.
- The resulting code under dist folder from build command is ready for production can be shipped.

### Using babel

- Parcel use babel by default.
- To polyfill using babel use `import 'core-js/stable'`

## Modern JS development

- Organize code in modules.
- Third party modules can be installed using npm.

## Module in JS

- ES6 has built in support for modules.
- There is only one module per file.
- Top level variables are scoped to the module.
- Modules are executed in strict mode by default, whereas in JS script it is not the case.
- `this` is undefined in module, whereas in JS script it is window object.
- In modules we can import and export variables .
- Import and export should be done at top level, outside of any block.
- Imports are hoisted.
- HTML linking: Use &lt; script type="module" &gt; for modules. They are loaded in async way by default.
- Modules are executed when imported.

### Named exports

- Should have same name in the import statement.
- We can change the name for eg. `import { totalPrice as price } from './shoppingCart'`.
- We can also change the name while exporting, for eg. `export {totalPrice as price}` and then `import price from....`
- Should be enclosed in curly braces in the import statement.
- We can export multiple variables by using curly braces for eg. `export {cartObject, price}`.
- `import * as shoppingCart from` ... This will import vartiables under a namespace.
-

### Default exports

- Normally used when we want to export only one variable from the module.
- We don't need curly braces.
- For eg. `export default function() {}`.

### Module pattern and CommnJS modules

```
- export.addToCart = function() {}
- const { addToCart } = require('./shoppingCart.js')
```

### Polyfilling using Babel

- `Let` and arrow functions can be transpiled to `var` and normal function but `promise` need to be polyfilled.
- Babel uses `core-js/stable` for polyfilling. Install and import core-js/stable.
- `regenerator-runtime/runtime` install and import for polyfilling async functions.
