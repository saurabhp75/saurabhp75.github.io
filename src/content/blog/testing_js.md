---
title: "Tesing in JS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Testing"]
draft: false
description: "Introduction to Tesing in JS"
---

### Manual Vs automated testing

## Types of test

- Unit test: testing individual building blocks of code in isolation. There are hundreds of unit tests. Most important.
- Integration test: test combination of multiple building blocks of code. These tests are smaller in number.
- End to end test: test complete scenario in the app as user experience them. Project typically contains only a few e2e tests.

We should test success and error cases.

### Jest

- Used to run unit test.

### React testing library

- Used to render/simulate the react components.

- Both the above tools are installed by create react app.
- For each component create a xxx.test.js file.
- Run npm test.

```javascript
test("description", () => {
  // Test
  render();
  expect().toBeInTheDocument();
});
```

### Test suite Vs test

```javascript
describe("test group description", ()=>{

test1;
test2;
....
}
```

### The three As of testing

- Arrange
- Act
- Assert
