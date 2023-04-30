---
title: "Vizhub D3js workflow"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["D3JS", "Visualization"]
draft: true
description: "Introduction to Vizhub D3js workflow"
---

### Workflow

- Get the zip file from vizhub.
- npm install: This will install packages under node_modules folder
- npm run build: As per package.json file(See below), this will run "rollup -c"
- `terser.js` module is required to minify the es6 code.
- `rollup.js` module is used to bundle the es6 code with tree shaking.
- **iife** (Immediately Invoked Function Expression) – A self-executing function, suitable for inclusion as a \<script> tag in HTML file.
- `rollup.config.js` defines the bundling process. It makes two bundles(in iife format), viz,
  `bundle.js` and `delhiBundle.js` from inputs `index.js` and `delhiIndex.js` respectively.

`index.js` ------> `bundle.js`  
`delhiIndex.js` -------> `delhiBundle.js`

`rollup.config.js` file:

```js
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "index.js",
    external: ["d3"],
    output: {
      file: "bundle.js",
      format: "iife",
      sourcemap: true, // creates a sourcemap(bundle.js.map) file for debugging
      globals: { d3: "d3" },
    },
    plugins: [terser()],
  },
  {
    input: "delhiIndex.js",
    external: ["d3"],
    output: {
      file: "delhiBundle.js",
      format: "iife",
      sourcemap: true, // creates a sourcemap(delhiBundle.js.map) file for debugging
      globals: { d3: "d3" },
    },
    plugins: [terser()],
  },
];
```

`package.json file`:

```js
{
  "scripts": {
    "build": "rollup -c"
  },
  "devDependencies": {
    "rollup": "latest",
    "rollup-plugin-terser": "^5.1.0"
  }
}
```

### To create a package.json file

```shell
$ npm init
```

### To update npm

```shell
$ npm install npm@latest -g
```
