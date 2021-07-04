---
layout: single
title: "Javascript"
excerpt: "Javascript Language"
---

### VSCode shortcuts

- **Format code**: `shift+alt+f`.
- **Copy line up/down**: `shif+alt+up/down`.
- **Delete a line**: `ctrl+shift+k`.
- `ctrl+shift+up/down`:
- `!`: Gives HTML boilerplate (emmet).
- `lorem`: Gives random text (emmet). use lorem\*n for n times text.
- You can trigger suggestions at any time by pressing Ctrl+Space.
- To format HTML source code, you can use the Format Document command Ctrl+Shift+I to format the entire file or Format Selection Ctrl+K Ctrl+F to just format the selected text.

## strict mode in JS

- Usage: "use strict";
- Used at top of file and function.

## Effect of strict

- Cannot delete an object.
- Doesn't create variable if let/var missed.
- Cannot assign to non existent property.
- No duplicate function arguments or object keys.
- No with clause.

# JS internals

- Everything in JS happens in `Execution context`.
- `Global execution context`:
- `Function execution context`:
- Return statement: goto previous execution context and delete current execution context.
- Variable environment/memory: It has key value pairs of variables and function.
- Thread of execution:
- JS is synchronous single threaded Language.
- `Lexical environment` is created when execution context is created.
- Lexical environment is the local memory plus lexical environment of the parent.
- `Scope chain`: Chain of lexical environment.
- `Temporal dead zone`: Time between when let variable is hoisted and just prior to assignment.
- Shrinking temporal dead zone window: moving all initialisation and declaration to top.
- let and const are also hoisted but differently from var declarations.
- A const has to be initialised when it is declared, otherwise it's a syntax error.
- Let and const are block scoped. Var is global scoped.
- `Block`: defined by curly braces.
- `Block scope`: what all variables and functions are accessible inside a function.
- `Shadowing of a variable`: in case of var the value of shadowed variable is changed on assignment but it's not the case with let.
- `Illegal shadowing`: a var cannot shadow a let variable.
- `Closure`: it is a function bundled with its lexical environment.

### Two phases of JS

- `Memory creation phase`: variables created as undefined and functions created. Exception for arrow function and function expression.
- `Code execution phase`:
- `Call stack`: global context is stored first. Then a function context on invocation, it is removed after return statement.

## Hoisting

- Phenomena which enables to use the variable and function even before initialising them.

### Errors in JS

- `ReferenceError`: when we try to access a variable in temporal dead zone. Or a variable which is not defined.
- `Syntax error`: for eg redefining variable using let. Or declaring const without initialisation.
- `TypeError`: when we try to reassign a const variable.

**Note**: a variable can be redefined using var but not when using let or const.

## JS event loop, call stack, callback queue

- `Web APIs`: Accessible via window object.
- Event loop takes functions from `callback queue` and put them in `call stack` if it's empty(no global execution context). It constantly monitors the two queues and callstack.
- When an element is clicked multiple times, the cb function is put into cb queue multiple times.
- `Microtask queue`: has higher priority than cb queue. It contains callbacks from promises and `mutation observer`.

## JS engine:

- JRE contains:
  - JS engine.
  - callstack and twpo queues.
  - API to communicate with outside world.
  - memory heap.
  - Garbage Collector: Mark and sweep algorithm.
- Js engine follows ECMAscript standard. It is JIT compiler.

## Type conversion vs Coercion.

- Type conversion is manual whereas Coersion is automatic.
- Coercion only happens for strings, numbers and Boolean.
- Plus (+) Operator vs other mathematical operators.

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

### Separation of concern

- Structure: HTML
- Behaviour: JS
- Presentation: CSS

### JavaScript

- Single line comment: //
- Multi line comment: /\* \*/

### 5 primitive data types

1. **Numbers**: Includes ALL numbers, integer and fraction.

- % : remainder
- 1/3= 0.33333 (no type coercion of result)

2. **Strings**:

- Use both `"` and `'`. You can use one inside another.
- Use + to concatenate two strings or a string with a number, the result will be a number, this is called `type coersion`.
- Use '/' to escape quotes in a string.
- Use `length` property for string length.
- Use of index in a string square brackets.
- You can't change/mutate a string.

3. **boolean**: true, false

4. **null**: Explicit null value assigned to variable.

5. **undefined** : No value assigned to variable.

6. Technically there are two others: **Symbol** and **BigInt**.

7. **NaN**: Numeric value that represents something that is...not a number for eg. 0/0, 1 + NaN.

**Note**: null and undefined are values, not types.

### Variable

- Syntax: var variableName = "hi"
- Variable type can be changed after assignment.
- camelCase.
- naming conventions: no spaces, must not begin with number, can contain letters, digits, unicode, `$` and `_`.

```javascript
// Numbers:
1;
-99;
0.345345;

//Making variables with let:
let numberOfFriends = 1;

//Incrementing:
numberOfFriends += 3; //numberOfFriends is now 4

// Variables with const
const minimumAge = 21; //CANNOT REASSIGN!

//Booleans - true or false values
true;
false;
let isHappy = true;

//Naming Conventions
// Use upper camel-cased names:
let numberOfChickens = 6; //GOOD
// NOT THE JS WAY:
// let number_of_chickens = 6;
```

### String built in methods

- We can chain the methods:
- `toUpperCase()/toLowerCase(`): Changes the case of string. Doesn't change the original string.
- `trim()`: Removes leading and trailing whitespaces, doesn't change the string.
- `string1.indexOf("string2")`: Searches within a string. Gives index of str2 (first occurence) in str1 otherwise -1. Used to find if a string contains other string.
- `str.slice(begin[,end])`: Slices the string from begin to end index. begin is included but not the end in the result. If begin is negative it is treated as string.length + begin.
  for eg. slice(-5) will give last 5 characters of the string.
- `str.charAt(index)`
- `str.replace(str1, str2)`: Replacing part of string. Replace first matching instance of str1 with str2 in the string.
- `str.replace(/-/g, "_")`; //replace - by \_ and returns a new string.
- `str.repeat(num)`: Repeat the string num times.

### MATH object

- Contains properties and methods for mathematical constants and funtions.
- `MATH.PI`: A constant.
- `MATH.round(num)`: Rounds a num.
- `MATH.abs(num)`: Absolute value of num.
- `MATH.pow(num, exp)`: Raise num to exp.
- `MATH.floor(num)`: Removes decimal from num.
- `MATH.ceil(num)`: Round `up` the num.
- `MATH.random()`: Gives a random decimal number between 0 and 1n non inclusive.

### Built-in methods

- console object has lot of methods.
- **console.log()**
- **console.warn()**
- **console.error()**
- **clear()**
- **alert()**: Shows dialog to user
- **prompt()**: Takes input from user as a string.
- **type of**:
- `typeof 'saurabh';` // prints "string"
- `typeof 25;` // prints "number"
- **Number("45")**: converts to number, ie 45.
- `parseInt(string)`: Parse a string to a number. The string may contain trailing alphabets along with number.
- **console.dir(document)**

### String literals

- They are strings that allow embedded expressions, which will be evaluated and then turned into a literal string.
- They use backtick and not single quote.
- for eg `hello ${expression}`. Here the expression will be evaluated.

### Including JS files in html

- {% raw %}\<script type="text/Javascript" src="path of us file">\</script>{% endraw %}
- If your JS interacts with HTML element then put script tag at the bottom of body, so that HTML elements are rendered before JS loads.
  This way the JS can interact with the loaded HTML elements.
- The functions declared in JS files can be called from chrome debug console.

### Operators

- +, -, +=, -+, , \*, /, %, \*\*.
- ++, --
- `type of`: for eg type of 4 will give "number".

### Comparison operators

- `>`, `>=` etc: Can also be used with characters or strings, but not much used.
- `==`: Equal in value but can differ in type, eg one can be number and other can be a string. It coerces the type for them to match.
- `!=`: Not equal in value but they can have different types. for eg. 1 != '1' is false.
- `===`: equal in value and type. for eg. 1 === '1' is false.
- `!==`: Not equal in value or type. for eg. 1 !== '1' is true.
- You should mostly use `===` or `!==`.

```javascript
var x = 5;
x == "5"; //is true
x === 5; //is false

//"==" Does 'type coercion', ie make both sides of same type, then compare.

null == undefined; // true
null === undefined; // false

true == "1"; // true
true == "2"; // false
0 == false; // true
NaN == NaN; // false
```

**Note**: NaN is not comparable.

### Logical operators

- connects Boolean expressions.
- `&&`, `||`, `!`
- short circuit of `&&` and `||`.

### Truthy and falsey values

- All JS values that are not true or false are still inherently truthy or falsey, when evaluated in a Boolean context.

- !"hello" //false
- !!"hello" //true
- !null //true
- !"" //true
- !NaN //true
- !-1 // false

### Falsey values

- false
- 0
- "", '': Empty string
- null, undefined, NaN.
- everything else is truthy except above four values.

### Conditionals

```javascript
// the if statement can be used without else if and else
if() { }
else if() {//Notice the space between else and if }
else { }

// Loops
while() { }

for(init; condition; step) { }

// for of loop ( not supported in IE)
arr1 = [1,2,3,4,5];
for (let val of arr1) {
console.log(val);
}

// switch case, not common in JS
switch(expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
    // code block
}
```

## Functions

- Two syntax for defining functions, viz `declaration` and `expression`.

## Function expressions

- Earlier way was `function statement`.

- function expression is about Storing a function in a variable.

- If we fail to pass the arguments, they will be undefined, it will not break the code.

- If a function does not have return statement, it returns undefined.

- Only one value can be returned from a function.

```javascript
// function statement
function funcName(arg1) {
  console.log("Hi " + arg1);
} // Notice no var in arg1, function declaration

// function expression
var funcName = function (arg1) {}; // Function expression

// funcName can be reassigned to a different value,
// in that case function will not be accessible.
```

### Variable scope

- A global variable is accessible inside a function, if we don't use var keyword.
- If we use var keyword inside function, a new local variable is created.
- function scope vs global scope.
- `block scope`: scope in a conditional or loop block.
- `var` variables are scoped to functions but not to blocks. `let` ariables are scoped to both.
- lexical scope: Inner function has acces to variables of outer function but not the other way round.

### Higher order functions

- Takes function as an argument.
- Return function as an argument. Return an anonymous function declared using function expression.
- Useful pattern: Create a factory function which creates and returns a function based on the arguments.

## function vs method

- Method is a function which is property of an object.
- We can use function as a value in key-value property of an object.
- New syntax of defining method in an object: we don't use the key, we just declare a function with a name.

## this keyword in JS

- Mostly used inside a method which is inside of an object.
- Value of `this` depends on the invocation context of the function it is used in.
- When a method is invoked using doe operator, the context is the container object.
- But when a method is invoked without the dot operator, the context may be differet (for eg Window object)

## Exception handlin in JS

- try, catch block.
- Used in async functions and AJAX.

### setInterval(), clearInterval()

- setInterval (func1, interval). interval is in ms. Run func1 after every interval ms.
- clearInterval(return_val_from_setInterval).
- setInterval (function() {
  }, interval); // using anonymous function.

### Invoking an anonymous function:

- An anonymous function is not accesible, after it has been declared.
- You need to store its value in a variable to use it later.

(function() {
console.log("Hello World");
})()

### Iterables in JS

- Arrays, maps and strings.
- Objects are not iterables.
- for loop for iterables: for( let val of iterable) {}
- for loop for object (non iterable): for (let val in obj1) {}
- Object.keys: gives array of keys in the object.
- Object.values: gives array of values in the object.
- Object.entries: gives nested array of key-value arrays.

### JS Arrays

- `Ordered` collection of values.
- Arrays are mutable unlike strings.
- Arrays can be nested, in that case it'll have multiple indexes to access an item.
- Use of == and === for arrays. It actually compares the reference in memory rather than the contents of the array.
- Use of const with array: The contents of the array can change but cannot be reassigned.

## Arrow functions

- It is a compact syntax for function expressions.
- Special syntax for arrow functions with one argument.
- implicit return: Works only if there is one expression in the body of the function

```javascript
// function expression
const add = function (x, y) {
  return x + y;
};

// Arrow function syntax
const add = (x, y) => {
  return x + y;
};

// Arrow function with one argument
// no parentheses
const square = (x) => {
  return x ** 2;
};

// implicit return
const square = (x) => x ** 2;

// implicit return with brackets
const square = (x) => x ** 2;
```

# this pointer

- this: Refers to object that is running current function.
- if function is a method in (or part of) the object, then this referes to object itself.
- if function definition is not part of any user defined object then this points to global object (window, global)

#### constructor function:

- called using the new operator. naming convention is to start it with capital letter.
- When we use new operator, it creates a new object and sets `this` in the constructor function to point to this new object.

#### regular function:

- `this` is governed by how the function is executed (execution context).
- When declared outside any object, `this` points to global (window/global) object.
- When called using a new operator (constructor), the `this` points to the newly created object.
- When used as a callback, then `this` refers to the execution context.

#### Arrow functions:

- In arrow functions, `this` is governed by how the function is created.
- They are not used to define the methods of an object, as `this` will point to global object.
- Don’t have their “own” this. If we reference `this` from such a function, it’s taken from the outer “normal” function.
- `this` referes to the scope (of function/method) it was created in. If it is not created within scope of any method.function then the `this` points to global object.

## Array methods in JS

- These are higher order methods and we need to pass functions in them.
- Mostly anaonymous or arrow functions are passed.

- forEach: Enable to call a function, once for each item of an array.
  forEach is mostly replaced by for of syntax.

- map: creates a new array by calling a function for eah element of the array.

- filter: creates a new array with all the elements which passes the criteria of the callback function.
  The callback function should return true or false.

- find:

- reduce: executes reducer function on each element resulting in a single value.
  Callback function has accumulator and current value. Accumulator has return value of previous iteration.
  We can pass initial value to the accumulator, which is second argument of reduce function.

- some: returns true if any element pass criteria of the callback function.

- every: returns true if every/ALL elements pass criteria of the callback function.

```javascript
// Empty aray
let arr1 = [];
let arr2 = new Array();

typeof arr1;
// "object"

let nums = [1, 2, 3, 4];
// numscopy points to same array object and is equal ==
// modifying one will alter the other
let numscopy = nums;
```

- array can hold non homogeneous values.
- array has a property, length.
- if we assign at index >= length of array, then other non assigned intermediate elements are kept undefined.

### Array methods

- To treat array as stack, use push pop. It modifies the array.
- To treat array as queue, use shift/unshift. It modifies the array.
- arr1.push(element): add element at the end. We can add more than one element to the array.
- arr1.pop(): removes and returns last array element.
- arr1.unshift(element): add element to front of array.
- arr1.shift(): remove and return from front of array.
- arr1.concat(arr2): Concatenate arr2 to end of arr1. Doesn't modify the array, gives a new one.
- arr1.includes(element): Gives true or false, depeneding upon if the element exist in the array.
- arr1.reverse(): Modifies the array.
- arr1.indexOf(item): gives index or -1.
- arr1.slice([[begin][, end]): Returns copy of array. If no args are present then copy entire array.
- arr.slice(): Copies a portion of the array.
- arr.splice(): Remove or replace a portion of the array.
- arr.sort(): Behave in non intutive way.

```javascript
// start: The index at which to start changing the array.
// deleteCount (Optional): An integer indicating the number of elements in the array to remove from start.
// item1, item2, ... Optional: The elements to add to the array, beginning from start.
// returns an array containing the deleted elements.

splice(start);
splice(start, deleteCount);
splice(start, deleteCount, item1);
splice(start, deleteCount, item1, item2, itemN);
```

### Array iteration

- arr1.forEach(function (item, index, arr){
  console.log(item)
  });// note that index and array can also be passed.
- we can also use normal for loop.

### Objects in JS

- Objects are `unordered` unlike arrays and contains properties.
- `Properties` are stored and accessed as `key value pairs`.
- Adding/deleting item can be done directly, no push/pop required as there is no order.
- Similar to Python Dictionaries, key-value pairs.
- eg var obj1={name:"Saurabh", age:45}
- Notice no quotes on key/property names.
- All keys are internally converted to string.
- obj1["name"]: notice quotes in key/property when accessing. This is unlike Python.
- objects can have methods eg:
  {
  func: function(){
  console.log("hi");
  }
  }// The object can be accessed in the method using "this" keyword.
- console.log is an eg of method inside an object.
- this way you can organise your code, by binding method with data. Also avoids name collision as method is accessed using object name.
- Accessing objects:
  bracket notation: person["name"]
  dot notation: person.name

- Brackets notation is used when key is an expression.

### Initialising empty object in JS

- var obj1={};
- var obj1= new Object();

### Accessing objects with brackets and dot notation

- If property name (key) starts with number, you can't use for notation.
- If property name has spaces, you can't use for notation.
- You can use variable in bracket notation, but not in dot notation.
- Array and object can be nested and mixed.

# Newer JS features

### arguments object

- Available inside every function.
- It's an array-like object. Has a length property, but does not have array methods like push/pop.
- Contains all the arguments passed to the function.
- Not available inside of arrow functions!.
- Due to its limitations rest operator is used to collect all arguments.

### default params

- Use `=` in the function definition args for default value.
- Default parameters should come after non default parameters if present.

### spread operator in function calls

- Spread syntax allows an iterable such as an array to be expanded in places where zero or more arguments for function calls are expected.
- Spread can be used for strings in same way as arrays, as they are also iterable.

```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
```

### spread operator in array and object literals

- This gives a new copy of the array or object.
- Spread syntax allows an iterable such as an array to be expanded in places where zero or more array literals are expected.
- Spread syntax allows an object expression to be expanded in places where zero or more key-value pairs(for object literals) are expected.
- If we spread an array in an object, then index becomes the key.

```javascript
let numberStore = [0, 1, 2];
let newNumber = 12;
numberStore = [...numberStore, newNumber];

// pass all key:value pairs from an object
let objClone = { ...obj };
```

### Rest params

- Opposite of spread operator, but have same syntax.
- Collects all remaining arguments into an actual array, with all methods available unlike arguments.
- Rest syntax collects multiple elements and "condenses" them into a single array element.
- Should be declared as last parameter to collect all remaining arguments.

### destructuring arrays and objects

- Use square brackets for arrays.
- Use curly braces for objects.
- A short clean syntax to unpack values from arrays and properties from objects.
- Object destructuring used more often.
- Variable with same name as the key.
- Variable with different name than the key using `:`.
- Variable with default value if the key not present using `=`.

### destructuring params

- Most frequently used with objects.
- While declaring params, use curly braces to catch params.
- we can use default values using `=`.

```javascript
let a, b, rest;

// a=10, b=20
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: Array [30,40,50]
```

### DOM

- Document object model is interface between JS and html-css.
- JS interacts with html using DOM.
- Browser converts html to js objects which can be manipulated using js.
- Everything is stored inside document object.

Document>html (root element)>header and body.

### Dom manipulation workflow

- Select then manipulate.

### NodeList, HTMLCollection, arrays of objects

- TBD

### DOM object

- `document.URL`: URL of the webpage.
- `document.links`: all links on the web page.
- `document.body`
- `document.head`

### Old DOM methods

- `getelementbyid`: return single object or null.
- `getelementsbytagname`: returns html collection and not an array or empty html collection. It contains element objects.
- `getelementsbyclassname`:

### New DOM methods

- **querySelector()**: selects first matching element. returns first element with matching tag, Id, class , attribute. For eg "p", "#red", ".big", a[href="URL"]
- **querySelectorAll()**: selects all matching elements.
- New methods for selecting elements. They take CSS selector type input.

- **Note**: console.dir(tag): displays Dom object in js notation instead of HTML notation.

- Innerhtml:
- Innertext: content between opening and closing tags.
- Textcontent: shows everything even hidden elements.

- `getattribute()`: gets info from html. Using dot notation on Dom gets the attribute from the is object.
- `setAttribute('class', 'purple')`: Used to set the class attribute to change the style of the eelements.

- `window.getcomputedStyle(H1)`: gives the style of the element.
- Using style attribute on the DOM element gives only inline style and not the one in CSS files.

### Dom manipulation

**Separation of concern**: style is defined in CSS file and toggled in js. You should avoid direct style changes in js.

### Change style of element

We can add style manually for eg tag.style.border etc, but we generally use classes.

- Add remove class.
- Change content of a tag.
- Change attributes like href, src etc.

## Classlist

- `h2.classList`: Get the list of classes on the element.
- `h2.classList.add(class1)`: Add a class to list of classes on the element.
- `h2.classList.remove(class1)`: Remove a class from list of classes on the element.
- `h2.classList.contains(class1)`: Check if it contains a class.
- `h2.classList.toglle(class1)`: Toggle (Add/remove) a class from the classlist.

## Node vs element in DOM

- A text in an element is a node.

## Traversing parent, child and sibling in DOM

- `.parentElement()`: gives parent element. An element can have only one parent.
- `childElementCount`: Gives count of the child elements.
- `.children`: Gives html collection (not Array).
- `.children[index]`: Gives child element at the index.
- `nextSibling`: Go to next node
- `previousSibling`: Go to previous node
- `nextElementSibling`: Go to next element sibling.
- `previousElementSibling`: go to previous element sibling.

## Adding and removing element in DOM

- `document.createElement('a')`: Create an anchor element.
- `document.body.appendChild()`: Add a child element to the body.
- `p.append()`: Append a text or element at the end of an element. Not available on IE.
- `p.prepend()`: Append a text or element at the beginning of an element. Not available on IE.
- `insertAdjacentElement(afterend, h2)`: Insert an adjacent element.

## Removing an element in DOM

- `remove()`: Not available in IE.
- `removeChild()`: We need to access parent element to remove.

## DOM events

### Adding event listeners the non optimal way

- Adding `onClick` property to the element in HTML.
- Adding `onClick` property in JS code. It's slightly better than adding directly to HTML.

## Correct way to add event listener (addEventListener)

- element.addEventListener('click', function() {}): We can also use arow functions.
- It is much more flexible and has many options.
- This approach allows us to add more than one callback to an event. In other approach only one function can be added to the `property` (onClick).

## Event Object

- It is passed to event handler callback.
- It is used for handling keyboard events.
- Keyboard relared events: KEYUP, KEYDOWN.
- Keyboard event: two properties, viz `key` and `code`. Key is the char and code is the key on the board.

## Form events and preventDefault

- `submit`: Generated when we click submit button.
- On clicking the submit button we are taken to another page (action url) by default.
- To prevent default behaviour of submit event, call `preventDefault()` on the submit event passed to the callback function.

## Input and change events

- For an input element KEYDOWN/UP are not sufficient for reading input as one can paste from clipboard, or use arrow keys etc.
- `change` event: triggered on focus is changed (blur) from the input and the input has changed from previous.
- `input` event: triggered when ever the input is changed. not triggered for shift, ctrl or arrow keys.

## Event bubbling

- The event propogates from child element to the parent element.
- To prevent the above behaviour call `.stopPropogation()` on the event object in the child event handler callback.

## Event delegation

- TO add event to non existent element, add listenet to their parents.
- This way a when a newly created child is clicked it triggers the parent's event handler.

## Async Javascript

### call stack

- Mechanism JS interpreter uses to kepp track of its place in a script that calls multiple functions.

### Web API and single thread

- Browsers come with web API to handle certain tasks in bakcground like making request and setTimeout.
- JS recognises these WEB API functions and pass them to browser to take care.
- Once browser finishes the tasks, they return and are pushed to the stack as callback
- JS is single threaded: At any point of time single JS thread is running at most one line of code.
- One way for asynchronous programming is callback functions, but it leads to callback hell.
- For eg when we use setTimeout(), it doesn't blocks the execution.

## Callback hell

- Caused by using callback functions to handle async code.
- Leads to ugly code.

### Promises

- Promise lets asynchronous methods return values like synchronous methods.
- Promises helps write the asynchronous code in a synchronous way and prevents callback hell.
- Instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.
- Promises are object representing eventual completion or failure of an async operation.
- A pending promise can either be fulfilled with a value or rejected with a reason (error).
- A promise is a returned object to which you attach callbacks/handlers, instead of passing callbacks into a function.
- Add callback to `then(success)` and `catch(error)`.
- Promise either completes successfully with a value or fails with a reason/error.
- A Promise is in one of these states:
  - `pending`: initial state, neither fulfilled nor rejected.
  - `fulfilled`: meaning that the operation was completed successfully.
  - `rejected`: meaning that the operation failed.

## Creating our own promises

```javascript
// Creating a promise
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const rand = MATH.random();
    setTimeout(() => {
      if (rand < 0.7) {
        resolve("your fake data here");
      }
      reject("request error");
    }, 1000);
  });
};

// Using the promise
fakeRequest("/dogs/1")
  .then((data) => {
    console.log("done with request");
  })
  .catch((err) => {
    console.log("there is error", err);
  });
```

## Async functions

- Newer and cleaner syntax to work with async code.
- Better syntax than promise.
- async function always return a promise.
- If a function rteturns a value the promise will be resolved with that value.
- If the function throws an exception, the promise will be rejected.
- `await` keyword can only be used inside the functions declared with `async` keyword.
- `await` will pause the execution of the function, waiting for a promise to be resolved. When the promise is resolved, a value is returned.
- When awaiting for an async function, if promise is rejected then exception is thrown, which can be caught by try catch statement.

```javascript
// declaring an async arrow function
const login = async () => {
  console.log("Hi There");
};

// declaring a normal async function expression
const login = async function () {
  console.log("Hi There");
};

// declaring a normal async function
async function login() {
  console.log("Hi There");
}
```

## AJAX

- Stands for Async Javascript And Xml.
- Usig AJAX we can send a request without refreshing the page.
- AJAX fetches the info from API and refreshes the page with the recieved information.

## API and JSON

- APIs send info in the JSON format.
- APIs return a string of JSON.
- Use JSON.parse(data) to return a JS object.
- Use JSON.stringify(object) to convert to JSON string.
- JSON is similar to JS object, but the key is a double quoted string.

## HTTP status code

- 2xx: OK response, no error.
- 3xx: Redirects.
- 4xx: CLient side errors (more common error).
- 5xx: Server side errors (less common error).

## Quyery string and HTTP headers

- Query string starts with `?` and the parameters are seperated by `&`.
- It s appended as a part of get request to API end point.

## XHR (old way of sending request in JS code)

- Old way of sending request via JS.
- Does not support promise, so lots of callbacks.
- Clunky syntax.
- Wierd capitalization.

## fetch API

- Better than XHR way.
- Supports promises.
- fetch(url).then( res => {}).catch(err => {}).

## axios (latest)

- Library for making http requests.
- Built upon fetch API.
- Better than fetch.

1. Define a class in CSS file. eg
   .my- class {
   color: blue;
   border: 10px solid red;
   }

2. Select an element/tag in js file.
   tag=document.querySelector("h1")

3. tag.classList.add("my-class").

classList.remove()
classList.toggle() // used for mouse clicks
Note: classList us not an array. You can't use push/pop etc.

### Change content of element

tag.textContent : get/set text content inside an element, it ignores tags and recurse to get all text. You can't set html tags with this, they will appear as strings on webpage.

text.innerHTML: get/set text + html tags. You can set html tags with this.

### Change attribute of element

- tag.getAttrubute("src").
- tag.setAttribute("src", "me.png").

### DOM events

- Events: clicking a button, hover, dragging and dropping, pressing a button etc.

-Select an element then add event listener.

element.addEventListener('type', function)

### To add event listener to nodeList(HTMLCollection)

```javascript
for (i = 0; i < tagList.length; ++i) {
  tagList[i].addEventListener(click, function () {
    this.style;
  });
}
```

### Difference between input and change event

- `input`: on any user input to text or select.
- `change`: when value changes or focus changes.

### Types of events

- `mouseover`: when mouse comes over an element
- `mouseout`: when mouse hover out of element.

### Jquery

In jQuery, you don't need for loop when manipulating a selection, unlike vanilla js.

- use $(), to select element(s) using CSS selectors. It works like document.quesrySelectorAll().
- use .css(property, value) to style them. We can also pass CSS object directly to css().

### Psuedo selectors

- div: first-of-type , selects first div.

### Common jQuery methods(getters and setters)

- text(): gets text of element and it's descendents.
- val(): get/set value of an input element.
- attr(): get/set attr of an element
- html(): works like innerHTML()
- addClass():
- removeClass():
- toggleClass():

### To select first or last element from a selection

- $("li").first()
- $("li").last()

### jQuery events

- click(func1)
- keypress(func1(event)): keyup(), keydown()
- on(event, func1): similar to addEventListener(). Used most often.

### Keypress Vs keydown:

- keydown is also fired in case of modifier and non printable keys.
- Keypress gives the character, for eg shift+a='A'.

### .click(func1) Vs .on("click", func1):

- on("click") also adds listener to future elements, whereas on() does not.

**Note**: use $(this) in jQuery, when adding an event listener.

### jQuery effects

- `fadeOut(intervalMs, func1)`: both arguments are optional. The element is not removed, only display is set to none. Func1 is called after interval. Func1 is generally $(this). remove().

- `fadeIn()`: same arguments as fadeOut().

- `fadeToggle(intervalMs)`:

- `slideDown()`: animates the height(increasing)

- `slideUp()`: animates the height(decreasing)

- `slideToggle()`:

### Intermediate js

### this keyword

- Global context: when this is not inside of a declared object. this refers to global object(window in case of browser). Any vat declared in global scope is attached to window object.

```javascript
this.person = "Ellie"; // person is now a global variable.
```

- Global with strict: if we type "use strict" at top of js file then, value is this inside a function is undefined.

- Object/implicit context: when this is inside of a declared object. Then value of this is closest parent object.

- Explicit context: change the context of this by using call(), apply() or bind() methods.

- New context: when an object is created using new, then this attaches to the newly created object.

### call(), apply() and bind()

- They can only be called on functions. They are used to explicitly set the value of `this`.

- call(thisArg, a, b, c, ....): It is called immediately. thisArg is the object to which this should refer to inside the function.

- apply(thisArgs, [a, b, c, ....]): It is called immediately.

- bind(thisArg, a, b, c, .....): It is not called immediately. It returns a function definition.

```javascript
var pokemon = {
  firstname: "Pika",
  lastname: "Chu ",
  // this method is bound to the pokemonn object.
  getPokeName: function () {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  },
};

var pokemonName = function () {
  console.log(this.getPokeName() + "I choose you!");
};

// Bind this to pokemon object
var logPokemon = pokemonName.bind(pokemon);

logPokemon(); // 'Pika Chu I choose you!'
```

## Polyfill for bind() method

-

```javascript
// object to be bound
let name = {
  firstname: "Saurabh",
  lastname: "Prakash",
};

// Function to be bound
let printName = function (hometown, state) {
  console.log(`${this.firstname} ${this.lastname} ${hometown} ${state}`);
};

// Demo of bind
let printMyName = printName.bind(name, "Dehradun");
printMyName("Uttarakhand");

// Own implementation of bind
Function.prototype.mybind = function (...args1) {
  if (typeof this !== "function") {
    throw new Error(this + "can't be bound as it's not callable");
  }

  let obj = this,
    params = args1.slice(1);

  return function (...args2) {
    obj.apply(args1[0], [params, ...args2]);
  };
};

// test of custom implementation of bind
let printMyName2 = printName.bind(name, "Dehradun");
printMyName("Uttarakhand");
```

### Asynchronous function

- setTimeout(func1, timeMs): executes the function after tumeMs milliseconds.
- arrow sytax is generally used.
- it is not a blocking function.

### OOP in JS

- OOP is a model based on objects constructed from a blueprint (classes).

- JS doesn't have Built-in support for classes. We mimic classes using constructor functions. These constructor functions creates objects through the use of new keyword.

- Constructor functions: creates an object/instance. Their first letter should be capitalized. They are used along with new to bind the this to the returned object.

- If a constructor function uses another constructor function (since they share common properties), then it should set the context of this when calling the other constructor function.

### new keyword does four things

- It creates an empty object.
- It sets the keyword this to be that empty object.
- It adds "return this" to the end of the function which follows it.
- It adds a property **proto** to the empty object, which links the prototype property on constructor function to empty object.

### Prototypes

- It is a mechanism by which JS object inherit feature from one another.

- It is a template object for eg. Aray.prototype, String.prototype.

- Every constructor function has a property named prototype, which is an object.

- The prototype object has a property named constructor, which points back to constructor function.

- Anytime an object is created using new keyword, a property named **proto** gets created linking the object and prototype property of constructor function.

- The constructor function creates properties and objects on the prototype object, which are accessed by the object created by the constructor function, using **proto** property.

- Prototype object(it's properties and methods) is shared among all objects created by that constructor function.

- Prototype is a good place to define property/methods which should be shared by the objects created by that constructor function. This way, the code is not replicated in all the objects created by that constructor function, rather it is kept at one place(function1.prototype)

## OOP using contructor functions

- This approach has been replaced by classes.

```javascript
// OOP using contructor functions
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function() {
  cons {r, g, b} = this;
  return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function() {
  cons {r, g, b} = this;
  return '#' + ((255 << 24) | ((byte)R << 16) | ((byte)G << 8) | ((Byte)B<<0)).toString(16).slice();
};

const color1 = new Color(23, 58, 126);
color1.hex();

const c1 = new Color(234, 128, 55, mycolor);
const c2 = new Color(134, 108, 115, mycolor);

// below is true as they point to
// same method
c1.rgb === c2.rgb;
```

## OOP using class

- This is newer syntax and achieves the same result as OOP using contructor functions.

```javascript
// OOP using classes
// better than using constructor functions
class Color {

  constructor(r,g,b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }

// will be automatically added to the prototype
rgb() {
  cons {r, g, b} = this;
  return `rgb(${r}, ${g}, ${b})`;
}

// will be automatically added to the prototype
hex() {
  cons {r, g, b} = this;
  return '#' + ((255 << 24) | ((byte)R << 16) | ((byte)G << 8) | ((Byte)B<<0)).toString(16).slice();
}

}

const c1 = new Color(234, 128, 55, mycolor);
const c2 = new Color(134, 108, 115, mycolor);

// below is true as they point to
// same method
c1.rgb === c2.rgb;
```

## extends and super keyword

```javascript
class cat extends Pet {
  // no need of constructor
  // as it is defined in the parent class

  // we can writye our own constructor
  constructor(name, age, livesLeft = 9) {
    super(name, age);
    this.livesLeft = livesLeft;
  }
}
```

### To add a custom method to Array prototype

```javascript
Array.prototype.myForEach = function (func) {
  for (i = 0; i < this.length; i++) {
    func(this[i]);
  }
};
```

### Prototype chain

- Any property defined on prototype can be accessed directly by objects created using new(). That's why we can access are.push() method as it is defined in Array.prototype.

- Js looks for a method/property in the prototype chain, if method is not found then error/undefined is returned.

- var arr = [] // new Array()

- arr.**proto**->Array.prototype

- Array.prototype.**proto**-> Object.prototype

- Object.prototype.**proto** -> null

**Note**: In js every object has a method named hasOwnProperty(), this method is defined in "Object", which is root object?
Is Object.prototype the root object?

### Closures

- Closure is a function that makes use of variables defined in outer function that have previously returned.

- Running the outer function multiple times gives a separate instance of private variable wrapped in the inner function.

### Conditions for a closure

- Inner function must use variable defined in outer function.
- The outer function must return the inner function.

### Real world use of closures

- Closure can implement a private variable which is not supported in js natively.

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

## Library vs framework

- On library you have the control.
- In framework the control is inverted. The control is with framework.
- Framework tells where to put the code.

## Express

- Web dev framework, unopinionated, minimal framework.
- Starts up a server to listen for requests.
- working with Query string: Parse incoming request using req.parse() to parse query string.
- App.use(): Handles all paths. use to add middleware.
- `*`: This route Catch all request
- Working with Params: parsing the variable path using req.params()
- Nodemon: No need to rstart nodejs server when any file changes. Just refresh the page.
- Handling assets in express: `app.use(express.static('public'))`.
- ejs partials: Include html/ejs files
- ejs: use `<%= %>` to add escaped html and `<% %>` to add JS code. Use `<%- %>` to add unescaped HTML.

## Get vs Post request

- get is used to retrieve info
- data is sent via query string (a string starting with ? and params seperated by &)
- Info is plainly visible in url.
- limited amount of data can be sent.

- post is used to post data to the server.
- used to write/create/update.
- data is sent via request body and not query string.
- can send any sort of data (json).

## Passing variabler to ejs template

- res.render('template-name', {key[: value]})

## Handling variable paths

- Use `:variable` in the route.
- Use `request.params` to extract the variable.

## Handling get request from forms in express

- Extract query params usring `req.query` property.

## Handling post request from forms in express

- Handling post request: Use req.body() to retrieve data. also include the middleware.
- Use middleware: `app.use(express.urlencoded({ extended: true }))`

## Handling posting of json data

- Handling post request: Use req.body() to retrieve data. also include the middleware.
- Use middleware: `app.use(express.json()) // for parsing application/json`

## Enable PUT and PATCH verbs in the forms

- Install `method-override` using npm.

## Redirect

- res.redirect('/comments').

## What is REST

- Representational state transfer.
- Set of guidlines for client server communication.
- We need this guidline to create restful routes.
- Path/route is based on resource (on the server).
- HTTP verbs: GET, PUT/PATCH, PATCH, DELETE.

1. Client–server architecture
2. Statelessness: no session information is retained by the server. Every http reuest is independent.
3. Cacheability: clients and internediaries can cache data. Response should contain info if it is cachable or not.
4. Layered system: There can be proxies and load balancers between client and server. They are not visible to client.
5. Code on demand (Optional): Client side scripts, server can transfer executable scripts to the clients.
6. Uniform interface

### RESTFul routes

| **Description**               | **Route** | **Method**         |
| :---------------------------- | :-------- | :----------------- |
| Display all comments          | GET       | /comments          |
| Display details of a comments | GET       | /comments/:id      |
| Add a comment                 | POST      | /comments          |
| Form to add new comment       | GET       | /comments/new      |
| Update a comment              | PUT/PATCH | /comments/:id      |
| Form to update a comment      | GET       | /comments/:id/edit |
| Delete a comment              | DELETE    | /comments/:id      |

# Mongo DB

## BSON

- Binary JSON.
- Faster than JSON.
- Support more data types.

## Inserting into mongo db

- A db contains many colections.
- Entry in the collection need not follow any schema.
- We insert data into collections.
- Inserting into a non existent collection will create it.

1. db.collection.insertOne(): Inserts a single document into a collection.
2. db.collection.insertMany(): inserts multiple documents into a collection.
3. db.collection.insert(): inserts a single document or multiple documents into a collection.

- Create a new db: `use dbname` create if not already existing.
- Show dbs: `show dbs`
- Show current db: `db`
- Show collections: `show collections`

- Show items in collection: `db.collectionName.find()`

## Quering mongo db

- `db.collection.find({breed: "Corgy"})`
- `db.collection.findOne({breed: "Corgy"})`
- find returns a cursor whereas findOne returns actual item.

## Updating mongodb

- Consist of two steps, first find and then update.

- `db.collection.updateOne()`: Updates at most a single document that match a specified filter even though multiple documents may match the specified filter.

- `db.collection.updateMany()`: Update all documents that match a specified filter.

- `db.collection.replaceOne()`: Replaces at most a single document that match a specified filter even though multiple documents may match the specified filter.

```json
db.restaurant.updateOne(
      { "name" : "Central Perk Cafe" },
      { $set: { "violations" : 3 } }
   );
```

## Deleting in mongo db

- `db.collection.deleteOne()`: Delete at most a single document that match a specified filter even though multiple documents may match the specified filter.
- `db.collection.deleteMany()`: Delete all documents that match a specified filter.
- `db.collection.remove()`: Delete a single document or all documents that match a specified filter.

```json
 db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );

```

## delete everything in a collection

- `db.dogs.deleteMany({})` : Delete everything from dogs collection.

## Additional mongo operators

- `gt`, `lt`, `in`, `nin`, `ne`.

## Mongoose

- It is ODM (object database mapper).
- The classes represents a collection.
- Mongoose provides methods for the model class object, once it is created.
- First create a schema, then define a model.

## Mongoose model operations

- InsertMany().then()
- find().then()
- findById().then()
- updateOne().then()
- updateMany()
- update() : If we want the updated document back, we should use the one starting with find
- findOneAndUpdate().then()
- findByIdAndUpdate().then()
- remove() : If we want the updated document back, we should use the one starting with find
- findOneAndDelete()
- findByIdAndDelete()

## Creating mongoose schema

- validators and options in schema.
- Validators don't run by default when updating, need to be enabled manually.

### Mongoose instance methods

- productSchema.methods.addCategory() = function (){}
- Used to add additional functionality to update a document in the collection.

### Mongoose static methods

- productSchema.statics.fireSale() = function (){}
- Used to update entire collection in one go

### Mongoose virtuals

- Gives ability to add properties to schema, they don't exist in db though.
- The properties are derived from the info in db.
- for eg. full name from first and last name.
- personSchema.irtual.('fullName').get(function (){}).
- Can also be used to set/update the db.

## Mongoose middleware

- Ability to run some code before or after a db operation.
- For eg if we remove a user, we also need to delete his posts.
- pre/post save/validate/remove/update etc.
- They are added to schema object.

## express middleware

- next vs send/render

## protecting a specific route

## Data validation library Joi.js

## mongodb relations

- one to few: embed actual data.
- one to many: keep reference n child in an array, then populate. use push to add to array in parent
- one to bazilions: keep reference in child, then populate. Assign to field in the child.
- When deleting an item in related collections we need to also delete the related items.

## ejs tool (ejs-mate)

## handling errors in express

- For synchronous route handlers just throw an error.
- This error will be caught by our custom error handler app.use(err, req, res, next).
- For Async route handlers put the error object in the next() call.
- This error will be caught by our custom error handler app.use(err, req, res, next).
- This is because if we pass anythin as argument to next(), then the error handler is trigerred.
- For handling mongoose errors, put them in try catch and put a next(err) in the catch block.

## Mongoose middleware

- These are functions we can run before or after an db operation.
- Qery vs document middlewarte: this refers to query or document.

## Express router

- Used to group/organize express app.
- Routes can be grouped by prefix.
- They can have their own middleware.

## HTTP/Web Cookies

- Enable HTTP request to have some state using client side data store.
- They can be used for session management, personalization, tracking.
- Sent by server to the browser/client, when they visit a webpage.
- The client then send these cookies in later interatcions on the website.
- Cookies are key value pair.
- Need to install Express module cookie-parser.
- res.cookie, req.cookies, req.signedCookies.
- Signing cookies: Used to prevent tampering the cookies at the client side.
- cookie size and number limited.

## HTTP sessions

- Attempt to make HTTP sateful by server side data store.
- It's not stored in db but something like Redis, a short term storage.
- Need to install expression-session package.
- This make available req.session.

## flash

- Need to install connect-flash package.
- Used when we want to flash something to user for one time.
- This is generally done when logging in, or when user does something.
- It depends upon express-session.
- req.flash(key:value/message)

# Security

## Authentication vs authoriation

- Authentication: Indentify. Finding out who the person is. They are who they say they are.
  Who is this person.
- Authorization: Verifying what a user has access to. Generally happens after authentication.
  What this person can and cannot do.

- Never store password in plaintext.
- Store hashed password only. Use a hashing function.
- Password salt: Salt is random value added to the password before we salt it.
  it helps ensure unique hashes and mitigate common attacks.

- bcrypt: hashing algo frequently used. based on blowfish.

### Hashing

- It maps the input data of arbitrary size to fixed size output values.
- We can never get the input data from the hash values(output of hash)
- Plaintext password entered by the user is compared with stored hash value.

## MVC pattern

- Model view controller.

## Submitting image file via form

- Use enc type `multi-part/form data` instead of `url-encoded` in the form attribute.
- Use `multer` package to send files in form.
- Use `multer-sorage-cloudinary` to store the files in the cloud.
- cloudinary: serice to store the files.
- files are stored in req.file(s) object and normal form fields in req.body object.

## mapbox

- Install @mapbox/mapbox-sdk.

## Security

- Mongo injection/ sql injection: Putting sql in the text input.
- `express-mongo-sanitize` package: remove dollar and period characters from user input.
- XSS cross site scripting: Inject client side script to someone's web page.
- Install `helmet` package. It manipulates the response headers for security.

## Storing API keys and secret info in the app

- Use dotenv package.

# ES6/ECMA2015

### let Vs var

- **syntax**
  let x = 100;
  const y = 150;

- **var**: Function scope. Loop Variable persists and is accessible after loop finishes. Leads to error prone code, you shynot use it.
- **let**: Block scope (common in other languages like java etc). Block scope is scoped to a block of code(using curly brackets) for eg loop, conditionals etc. Leads to better code. You must use this in your code as most modern browsers now support es6.
- **const**: block scope. used for constants. It's info to the complier, optimizing the code. For const objects, the content of the object can change insitu but reassignment of the const type is not allowed.

- real world use case of const:

```javascript
const func1 = function () {
  //using Const ensures catching unintentional reassignment of func1
};
```

```javascript
console.log(x); // gives undefined
var x = 100;
console.log(x); // prints value of x

console.log(x); // throws ReferenceError exception, execution stops
let x = 100;
console.log(x); // prints value of x

let x;
console.log(x); // gives undefined
x = 100;
console.log(x); // prints value of x
```

### Hoisting used by var keyword

- java interpreter modifies the code before executing.

- any var declaration (as uninitialised variable) is moved up in the block.the variables declaration in other parts of block is replaced by initialization.

- therefore the variables in a for loop is accessible with it's last updated value. This leads to error prone code.

- also you cannot declare variables(using var) with same name in different loops in the block.

### Arrow function syntax

- Syntactical sugar.
- Better suited for one line anonymous functions. For eg. In setInterval() method.
- Old syntax Vs arrow syntax.
- Optional brackets and return statement and conciseness of arrow function syntax.
- Use of arrow syntax in functional coding, ie map, filter, reduce.
- In arrow function syntax the context of this keyword is preserved. This is a huge advantage as compared to old function syntax. This enables its use in passing to higher order functions, eg setInterval ().

### Concise arrow syntax : X=>X\*2

### for... of loopcheck

for(let bubble of bubbles){
bubble.move()
}

- old style:
  for(let index in bubbles){
  bubbles[i].move();
  }

### Higher order functions

Examples of higher order functions:

- map
- sort
- reduce
- filter

### Built-in functions

- `instanceof` : eg if(func1 instanceof Function)

### Array functions

- map, sort, reduce, filter
- These functions return a new Array, they don't modify the original array.

### fill() and map()

- map gives a copy of array.
- map takes the function of form x=>{}, where X represents the array element.

```javascript
let arr = new Array(100);

arr = arr.fill(0).map(() => Math.random());

arr = arr.fill(0).map(Math.random);

let arr = Array(100).fill(0).map(Math.random);

let arr = Array(100).fill().map(Math.random);
```

**Note**: map needs some values(even undefined) to work.

### reduce

- Reduces an array to a single value.
- reduce takes a function and a value(initial Val of acc). The function has form (acc,x)=>{}
- arr.reduce((acc, val)=>acc+val[, initialVal]).
- acc is accumulator, which persists over iterations.
- initialVal is initial value of acc, if not specified, it takes the value of first element of array.
- are.reduce((acc, val)=> (a>b)?a:b)
- above gives max in an array.

### filter ()

- filter returns copy of array, based on function passed to it.
- the function has form x=>{}
- the elements which returns false(using passed function) are not included in the returned array.

### promise

- helps in writing asynchronous code, CPU is not blocked waiting for something to finish.
- instead of passing a callback function to a function, which will finish in future(old way). Leads to unreadable code.
- the promise supporting function(for eg built-in function fetch()) will return a promise object.
- promise object has states like pending, fulfilled, rejected.
- then(), catch() can be called on promise object, then executes when promise has been fulfilled and catch() is executed when promise is rejected.
- promises can be chained, in that case there will be a promise returned at each step and a then() for each of them, the best part is that last catch() will catch all errors. So we'll have multiple then() but only one catch().

### create you promises

### async, await (es8)

- syntactical sugar.
- gives cleaner code than .then(), .catch().
- await can be used only in async functions.

### promise.all()

- promise.all() isused to run multiple async functions in parallel in an ordered way.

```javascript
let promises = [promise1, promise2, promise3];

promise
  .all()
  .then(() => {})
  .catch((err) => console.error(err));
```

### filter()

- arr.filter(x => x % 2 == 0) //gets even values from array.

**Note** : javascript builtin str1.split(" ")// returns an array

### sort()

- Sorts the arr in place. it doesn't return a new array.

### promise()

- Used in callbacks.

### promise.all()

- Gives the result of promises in an array in the order they were in original array.
- If any promise in the array fails, then whole result fail.
- To avoid this, push the promises one by one in the array.

### Try catch in promises

- Can be used to catch errors in an array of promises.

### Inheritance

- Encapsulation.
- Inheritance.
- Polymorphism.

### ES6 Classes

- Old way was using constructor functions.
- In the new approach, only the syntax has changed not the prototype approach.
- A class can only inherit from only one class.

```javascript
class xyz extends baseClass {
  //note there is no function keyword in front of constructor
  constructor() {}
}
```

### Polymorphism

- Base class variable can contain derived class value.
