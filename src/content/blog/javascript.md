---
title: "Javascript Language"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Javascript"]
draft: false
description: "Introduction to Javascript"
---

## Strict mode in JS

- Usage: "use strict";
- Used at top of file, block and function.

## Effect of strict

- Cannot delete an object.
- Cannot delete undeletable properties for eg `Object.prototype`.
- Doesn't create variable if let/var missed.
- Cannot assign to non existent property.
- No duplicate function arguments or object keys.
- No `with` clause.

# JS internals

- `Thread of execution`:
- JS is synchronous single threaded Language.
- `Lexical environment` is created when execution context is created. It is the local memory plus lexical environment of the parent.
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

### Hoisting

- Phenomena which enables to use the variable and function even before initialising them.

### Execution context

- Environment where piece of js is executed. Contains all necessary for code to be executed.
- For each function call an execution context is created.
- Everything in JS happens in `Execution context`.
- `Global execution context`:
- `Function execution context`:
- `Return statement`: Goto previous execution context and delete current execution context.

### Contents of execution context:

- `Variable environment/memory`: It consists of key value pairs of following items.

  - `const`, `let` and `var` Variables.
  - function declarations:
  - arguments : Passed to the function

- `scope chain`: to access variables outside of the context.

- `this` keyword.

### Errors in JS

- `ReferenceError`: when we try to access a variable in temporal dead zone. Or a variable which is not defined.
- `Syntax error`: for eg. redefining variable using `let`. Or declaring `const` without initialisation.
- `TypeError`: When we try to reassign a `const` variable or access a property from an `undefined` or `null` value.

**Note**: A variable can be redefined using `var` but not when using `let` or `const`.

### JS event loop, call stack, callback queue

- `Web APIs`: Accessible via `window` object.
- `Event loop` takes functions from `callback queue` and put them in `call stack` if it's empty(no global execution context). It constantly monitors the two queues and callstack.
- When an element is clicked multiple times, the cb function is put into cb queue multiple times.
- `Microtask queue`: Has higher priority than cb queue. It contains callbacks from promises and `mutation observer`.

### JS engine:

- JRE contains:
  - JS engine.
  - callstack and two queues.
  - API to communicate with outside world.
  - memory heap.
  - Garbage Collector: Mark and sweep algorithm.
- Js engine follows ECMAscript standard. It is JIT compiler.

### JS engine:

- `Call stack`: maintain execution context. Here the code is executed.
- `Heap`: here all objects are stored.

### JS runtime (JRE)

- `Js engine`:
- `Web api`: Dom, fetch, timers etc. Available through global window object. In nodejs it is replaced by thread pool and c++ bindings.
- `Callback queue`: queue of callback functions.
- `event loop`: puts the callback functions into call stack when they are fired, but it first check if call stack is empty.

### Scope in JS

- The current context of execution.
- The context in which values and expressions are "visible" or can be referenced.
- If a variable or other expression is not "in the current scope," then it is unavailable for use.
- Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.
- `Scope`: place where variables are declared.
- `Function scope`: same as `variable environment` of that function.
- `Global scope`:
- `Block scope`: var declared variables don't follow this scope.only let and const. In strict mode functions are also block scoped.

**Note**:

- In strict mode a function called in global context has "this" as undefined. In normal mode it points to the window object.
- Starting es6, blocks also create scope.
- Arrow functions don't have arguments and `this` in their execution context.

# JavaScript basics

- Single line comment: `//`
- Multi line comment: `/* */`

### Type conversion vs Coercion.

- Type conversion is `manual` whereas Coersion is `automatic`.
- Coercion only happens for strings, numbers and Boolean.
- Plus (+) Operator vs other mathematical operators.

### 5 primitive data types

- In JS all values are either primitive type or an object.

1. **Numbers**: Includes ALL numbers, integer and fraction.

   - `%` : remainder
   - 1/3= 0.33333 (no type coercion of result)

2. **Strings**:

   - Use both `"` and `'`. You can use one inside another.
   - Use `+` to concatenate two strings or a string with a number, the result will be a number, this is called `type coersion`.
   - Use `/` to escape quotes in a string.
   - Use `length` property for string length.

- Use of index in a string square brackets.
- You can't mutate a string as it's a primitive type.

3. **boolean**: true, false

4. **null**: Explicit null value assigned to variable.

5. **undefined** : No value assigned to variable.

6. **Symbol(ES2015)**: Unique value that cannot be changed.
   Symbols are often used to add unique property keys to an object that won’t collide with keys any other code might add to the object, and which are hidden from any mechanisms other code will typically use to access the object.

7. **BigInt(ES2020)**: An int too large to fit in number type.
   Created by appending n to the end of an integer literal, or by calling the BigInt() constructor (but without the new operator)

8. **NaN**: Numeric value that represents something that is...not a number for eg. `0/0`, `1 + NaN`.

- `typeof null` is object. Js quirk.
- `typeof NaN` is number.

### Primitives vs. Objects (Primitive vs. Reference Types)

- Objects are stored as reference types, so assigning them to a new variable will not create a copy.
- Objects are stored in heap.
- To create a copy of object use `var new_obj = Object.assign({}, sourceObj)`. It gives a `shallow copy`. For `deep copy` use Lodash library.
- Primitive types are stored in Execution context (call stack).
- Assigning primitive types to a new variable and then changing it will create a copy.

### Variable

- Syntax: var variableName = "hi"
- Variable type can be changed after assignment.
- Naming conventions: camelCase, no spaces, must not begin with number, can contain letters, digits, unicode, `$` and `_`.
- Also no reserve names like `new` or `function`.
- Constants should be all uppercase.

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

- Adding a `+` operator in front of a string tries to convert it to number if possible otherwise it gives `NaN`.
- We can chain the methods.
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
- `MATH.random()`: Gives a random decimal number between 0 and 1 non inclusive.

### Built-in methods

- console object has lot of methods.
  - `console.log()`:
  - `console.warn()`:
  - `console.error()`:
  - `console.dir(document)`:
- `clear()`:
- `alert()`: Shows dialog to user
- `prompt()`: Takes input from user as a string.
- `Number("45")`: converts to number, ie 45.
- `parseInt(string)`: Parse a string to a number. The string may contain trailing alphabets along with number.

### String/Template literals

- They are strings that allow embedded expressions, which will be evaluated and then turned into a literal string.
- They use backtick and not single quote.
- for eg `hello ${expression}`. Here the expression will be evaluated.
- Can be used for multiline strings.

### Including JS files in html

- `<script type="text/Javascript" src="path of us file">\</script>`
- If your JS interacts with HTML element then put script tag at the bottom of body, so that HTML elements are rendered before JS loads.
  This way the JS can interact with the loaded HTML elements.
- The functions declared in JS files can be called from chrome debug console.

### Operators

- +, -, +=, -+, , \*, /, %, \*\*.
- ++, --
- `typeof`:
  - `typeof 'saurabh';` // prints "string"
  - `typeof 25;` // prints "number"
- Operator precedence: logical, mathematical than comparison.
- `Conditional/ternary opeartor`: for eg. age > 18 ? "Adult" : "minor";

- `"prop "in "obj"`:

```javascript
const itemList = ["chair", "table", "box"];
// length is property of array itemList
length in itemList ? console.log("To be printed") : console.log("not printed");
```

- `object instanceof constructor`: Tests the presence of `constructor.prototype` property in object's `prototype chain`.

## Nullish coalescing(NC) operator vs logical OR

- `Nullish Coalescing Operator (??)`: Introduced in 2020.
- Returns its RHS operand when its LHS operand is `null` or `undefined`, and otherwise returns its LHS operand.
- This can be seen as a special case of the logical OR (||) operator, which returns the right-hand side operand if the left operand is any falsy value, not only null or undefined. In other words, if you use || to provide some default value to another variable foo, you may encounter unexpected behaviors if you consider some falsy values as usable (e.g., '' or 0).
- For eg: const guest = numGuests ?? 10;
- NC gives the RHS/default value only for `null` or `undefined` LHS.
- `OR` gives RHS/default for any `falsey` value like `""` and `0`.
- So if you don't want default values for `""` or `0`, use NC, as OR will give RHS for these values as well.

## Optional chaining operator

- Optional chaining: `?.` returns undefined for `null` and `undefined` values. It's linked to null coalescing operator.
- It is used to access object's property or call a function in a safe way (without throwing error).
- It is used to prevent throwing of error, when the object is `null` or `undefined`.
- It returns `undefined` under these circumstances.

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
- Everything else is truthy except above four values.

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

- They cannot be called before they are defined, unlike function declaration.

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
- `block scope`: scope in a conditional or loop block. Curly braces for object don't form a scope. arrow function defined in them have `this` of global scope.
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

- `this`: Refers to object that is running current function.
- if function is a method in (or part of) the object, then this referes to object itself.
- if function definition is not part of any user defined object then this points to global object (window, global)
- Mostly used inside a method which is inside of an object.
- Value of `this` depends on the invocation context of the function it is used in.
- When a method is invoked using dot operator, the context is the container object.
- But when a method is invoked without the dot operator, the context may be differet (for eg Window object)
- `this` does not point to a function or its variable environment.

## this keyword and 4 ways to call a function.

- `method`: Owner of the method, ie object calling the method, not the object in which it is defined.
- `global/simple function call`: undefined/window/global depending upon strict mode and also whether it's nodejs or browser.
  - strict mode, normal function: undefined.
  - strict mode, arrow function: window/global depending upon whether its browser or nodejs.
- `arrow function`: Points to `this` of surrounding function scope or global scope(lexical this).
- `event listener`: Points to DOM element that handler is attached to.

## Exception handling in JS

- try, catch, finally.
- `finally`: Executes regardless of whether an exception was thrown or caught.
- Used in async functions and AJAX.

### setInterval(), clearInterval()

### Invoking an anonymous function:

- An anonymous function is not accesible, after it has been declared.
- You need to store its value in a variable to use it later.
- IIFE: Immediately invoked function expression. It only runs once. Used to create function scope to encapsulate variables (var).

```javascript
// IIFE
(function() {
console.log("Hello World");
})()

// interval is in ms. Run func1 after every interval ms.
const setReturn = setInterval (function() {
  }, interval); // using anonymous function.

clearInterval(setReturn).
```

## Set

- They are like arrays but have unique elements only..

### Maps

- map keys can be any type instead of only strings unlike objects.

### Iterables in JS

- Arrays, maps and strings.
- Objects are not iterables.
- for loop for iterables: for( let val of iterable) {}
- for loop for object (non iterable): Gives properties, for eg, for (let val in obj1) {}
- `Object.keys`: gives array of keys in the object.
- `Object.values`: gives array of values in the object.
- `Object.entries`: gives nested array of key-value arrays.

### JS Arrays

- array can hold non homogeneous values.
- array has a property, length.
- if we assign at index >= length of array, then other non assigned intermediate elements are kept undefined.
- `Ordered` collection of values.
- Arrays are mutable unlike strings.
- Arrays can be nested, in that case it'll have multiple indexes to access an item.
- Use of == and === for arrays. It actually compares the reference in memory rather than the contents of the array.
- Use of const with array: The contents of the array can change but cannot be reassigned.

## Array methods in JS

- These are higher order methods and we need to pass functions in them.
- Mostly anaonymous or arrow functions are passed.
- `forEach`: Enable to call a function, once for each item of an array.
  forEach is mostly replaced by for of syntax.
- `map`: creates a new array by calling a function for eah element of the array.
- `filter`: creates a new array with all the elements which passes the criteria of the callback function.
  The callback function should return true or false.
- `find`:
- `reduce`: executes reducer function on each element resulting in a single value.
  Callback function has accumulator and current value. Accumulator has return value of previous iteration.
  We can pass initial value to the accumulator, which is second argument of reduce function.
- `some`: returns true if any element pass criteria of the callback function.
- `every`: returns true if every/ALL elements pass criteria of the callback function.

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

// Array iteration
// we can also use normal for loop
arr1.forEach(function (item, index, arr) {
  console.log(item);
}); // Note that index and array can also be passed.
```

### Array methods

- To treat array as stack, use push pop. It modifies the array.
- To treat array as queue, use shift/unshift. It modifies the array.
- `arr1.push(element)`: add element at the end. We can add more than one element to the array.
- `arr1.pop()`: removes and returns last array element.
- `arr1.unshift(element)`: add element to front of array.
- `arr1.shift()`: remove and return from front of array.
- `arr1.concat(arr2)`: Concatenate arr2 to end of arr1. Doesn't modify the array, gives a new one.
- `arr1.includes(element)`: Gives true or false, depeneding upon if the element exist in the array.
- `arr1.reverse()`: Modifies the array.
- `arr1.indexOf(item)`: gives index or -1.
- `arr1.slice([[begin][, end])`: Returns copy of array. If no args are present then copy entire array.
- `arr.slice()`: Copies a portion of the array.
- `arr.splice()`: Remove or replace a portion of the array.
- `arr.sort()`: Behave in non intutive way.

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

## Arrow functions

- It is a compact syntax for function expressions.
- Good for one line functions.
- Special syntax for arrow functions with one argument (no brackets).
- implicit return: Works only if there is one expression in the body of the function.
- In arrow functions, `this` is governed by how the function is created.
- Arrow functions don't have their own bindings to `this`, `arguments` or `super`.
- They are not used to define the methods of an object, as `this` will point to global object.
- Don’t have their “own” this. If we reference `this` from such a function, it’s taken from the outer “normal” function.
- `this` referes to the scope (of function/method) it was created in. If it is not created within scope of any method.function then the `this` points to global object.
- Arrow functions cannot be used as constructors.
- Arrow functions cannot use yield, within its body.
- The call, apply and bind methods are NOT suitable as arrow functions.
- Arrow functions do not have a `prototype` property.
- The `yield` keyword may not be used in an arrow function's body. As a consequence, arrow functions cannot be used as generators
- **Important**: We should not use arrow function as an object's method, as `this` will point to the lexical scope and not the caller, ie object.
- Perhaps the greatest benefit of using Arrow functions is with methods like `setTimeout()` and `EventTarget.addEventListener()` that usually require some kind of closure, call, apply or bind to ensure that the function is executed in the proper scope.

```javascript
// function expression
const add = function (x, y) {
  return x + y
}

// Arrow function syntax
const add = (x, y) => {
  return x + y
}

// Arrow function with one argument
// no parentheses
const square = (x) => {
  return x ** 2
}

// implicit return
const square = (x) => x ** 2

// implicit return with brackets
const square = (x) => {
  x ** 2
}

// To return an object literal expression
// requires parentheses around expression
params => ({foo: "a"}) // returning the object

// Rest params are supported
(a, b, ...r) => expression

// Default parameters are supported
(a=400, b=20, c) => expression

// Destructuring within params supported
([a, b] = [10, 20]) => a + b;  // result is 30
({ a, b } = { a: 10, b: 20 }) => a + b; // result is 30

// cannot contain a line break between its parameters and its arrow
var func = (a, b, c)
  => 1;
// SyntaxError: Unexpected token '=>'

```

#### Constructor function:

- Called using the new operator. naming convention is to start it with capital letter.
- When we use new operator, it creates a new object and sets `this` in the constructor function to point to this new object.

#### Regular function:

- `this` is governed by how the function is executed (execution context).
- When declared outside any object, `this` points to global (window/global) object.
- When called using a new operator (constructor), the `this` points to the newly created object.
- When used as a callback, then `this` refers to the execution context.

### Objects in JS

- Objects are `unordered` unlike arrays and contains properties.
- `Properties` are stored and accessed as `key value pairs`.
- Adding/deleting item can be done directly, no push/pop required as there is no order.
- Similar to Python Dictionaries, key-value pairs.
- eg `var obj1={name:"Saurabh", age:45}`
- Notice no quotes on key/property names.
- All keys are internally converted to string.
- `obj1["name"]`: notice quotes in key/property when accessing. This is unlike Python.
- objects can have methods eg:

  ```javascript
    {
      func: function(){
      console.log("hi");
      }
    }// The object can be accessed in the method using "this" keyword.
  ```

- console.log is an eg of method inside an object.
- This way you can organise your code, by binding method with data. Also avoids name collision as method is accessed using object name.
- Accessing properties of objects:

  - `bracket notation`: person["name"]
  - `dot notation`: person.name

- Brackets notation is used when key is an expression/variable.

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

### Default params in functions

- Use `=` in the function definition args for default value.
- Default parameters should come after non default parameters if present.

### Spread operator in function calls

- Spread syntax allows an iterable such as an array to be expanded in places where zero or more arguments for function calls are expected.
- Spread can be used for strings in same way as arrays, as they are also iterable.

```javascript
// Use of spread operator in function calls
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
```

### Spread operator in array and object literals

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
- Collects all remaining arguments into an actual array, with all methods available unlike `arguments`.
- Rest syntax collects multiple elements and "condenses" them into a single array element.
- Should be declared as last parameter to collect all remaining arguments.

  ```javascript
  // Use of Rest in function declaration
  function sum(...theArgs) {
    return theArgs.reduce((previous, current) => {
      return previous + current;
    });
  }

  console.log(sum(1, 2, 3));
  // expected output: 6

  console.log(sum(1, 2, 3, 4));
  // expected output: 10
  ```

### Destructuring arrays and objects

- Use square brackets for arrays.
- Use curly braces for objects.
- Array destructuring assignment can be used to swap two variables.
- A short clean syntax to unpack values from arrays and properties from objects.
- Object destructuring used more often.
- Variable with same name as the key.
- Variable with different name than the key using `:`.
- Variable with default value if the key not present using `=`.

```javascript
// Assigning to new variable names
const o = { p: 42, q: true };
const { p: foo, q: bar } = o;

// Default values
const { a = 10, b = 5 } = { a: 3 };

console.log(a); // 3
console.log(b); // 5
```

### Destructuring params

- Most frequently used with objects.
- While declaring params, use curly braces to catch params.
- we can use default values using `=`.

```javascript
let a,
  b,
  rest;

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

## Storage in Browser

- Cookies
- Session
- Local storage
  - Key value pairs.
  - Blocking API, used only for small data.
  - localStorage.setItem('workouts', JSON.stringify(workouts))
  - localStorage.getItem('workouts')

### DOM

- Document object model is interface between JS and html-css.
- JS interacts with html using DOM.
- Browser converts html to JS objects which can be manipulated using JS.
- Everything is stored inside document object.
- Document>html (root element)>header and body.

### DOM manipulation workflow

- Select then manipulate.

## DOM traversal.

- `h1.childNodes`: Gives the children of the node.
- `h1.children`: Gives HTML elements directly under the element.
- `h1.firstElementChild`: Gives the first child element.
- `h1.lastElementChild`:

- **Note**:The main difference between `children` and `childNodes` property is that children work upon `elements` and `childNodes` on nodes including `non-element` nodes like text and comment nodes.

## Lifecycle DOM events

- `DOMContentLoaded`: HTML has been parsed and loaded, all JS scripts downloaded and executed. happens on the document.
- It does not wait form images or external resources like images to load.
- We should keep js script fetching at the end of the body. So that HTMl elements gets loaded.
- `load`: When all the images, css and external resources are fetched and loaded. target is window.
- `beforeunload`: Triggered when user is leaving the page, for eg by closing the tab. target is window. Need to set `e.returnValue` to `''`(empty string).

### NodeList, HTMLCollection, arrays of objects

- `Node`: The DOM Node interface is an abstract base class upon which many other DOM API objects are based, thus letting those object types to be used similarly and often interchangeably. As an abstract class, there is no such thing as a plain Node object. All objects that implement Node functionality are based on one of its subclasses. Most notable are Document, Element, and DocumentFragment.
- `NodeList`: NodeList objects are collections of `nodes`, usually returned by properties such as `Node.childNodes` and methods such as `document.querySelectorAll()`.
- `HTMLCollection`:

### DOM object

- `document.URL`: URL of the webpage.
- `document.links`: all links on the web page.
- `document.body`:
- `document.head`:

### Old DOM methods

- `getElementById`: Return single object or null.
- `getElementsByTagName`: Returns html collection and not an array or empty html collection. It contains element objects.
- `getElementsByClassName`:

### New DOM methods

- **querySelector()**: Selects first matching element. returns first element with matching tag, Id, class , attribute. For eg "p", "#red", ".big", a[href="URL"]
- **querySelectorAll()**: Selects all matching elements.
- New methods for selecting elements. They take CSS selector type input.

- **Note**: console.dir(tag): displays Dom object in JS notation instead of HTML notation.

- `Innerhtml`:
- `Innertext`: Content between opening and closing tags.
- `Textcontent`: Shows everything even hidden elements.

- `getattribute()`: gets info from html. Using dot notation on Dom gets the attribute from the is object.
- `setAttribute('class', 'purple')`: Used to set the class attribute to change the style of the eelements.

- `window.getcomputedStyle(H1)`: Gives the style of the element.
- Using style attribute on the DOM element gives only inline style and not the one in CSS files.

### DOM manipulation

**Separation of concern**: Style is defined in CSS file and toggled in JS. You should avoid direct style changes in JS.

### Change style of element

We can add style manually for eg tag.style.border etc, but we generally use classes.

- Add remove class.
- Change content of a tag.
- Change attributes like href, src etc.

```javascript
// Define a class in CSS file. eg
   .my- class {
   color: blue;
   border: 10px solid red;
   }

// Select an element/tag in js file.
   tag=document.querySelector("h1")

//tag.classList.add("my-class").

classList.remove()
classList.toggle() // used for mouse clicks
```

## Classlist

- classList is not an array. You can't use push/pop etc.
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

## Debouncing and throttling

- Used in performance optimization by `rate limiting of function calls`.
- `Debouncing`: Call function/API only if the difference between two keypress is more than a certain duration for eg. 300 ms.

  - It's used in search bars.
  - In games pistol can be debounced. It will fire only if there is a certain gap between mouse clicks.

- `Throttling`: Make a function/API call after a certain period of time since last call.
  - It used to handle events like resizing.
  - In games machine guncan be throttled. Firing rate can be controlled by throttling.

### Adding event listeners the non optimal way

- Adding `onClick` property to the element in HTML.
- Adding `onClick` property in JS code. It's slightly better than adding directly to HTML.

## Correct way to add event listener (addEventListener)

- `element.addEventListener('click', function() {})`: We can also use arrow functions.
- It is much more flexible and has many options.
- This approach allows us to add more than one callback to an event. In other approach only one function can be added to the `property` (onClick).

## Event Object

- It is passed to event handler callback.
- It is used for handling keyboard events.
- Keyboard related events: keyup, keydown.
- Keyboard event: two properties, viz `key` and `code`. `key` is the character (for eg. 'k') and `code` is the key (for eg. KeyK) on the board.
- Keypress is deprecated. It is fired only for keys which provides a character value like alphanumeric keys and punctuation. But not for alt shift ctrl or meta. It is replaced by keydown event.

## Form events and preventDefault

- `submit`: Generated when we click submit button in a form.
- On clicking the submit button we are taken to another page (action url) by default.
- To prevent default behaviour of submit event, call `preventDefault()` on the submit event passed to the callback function.

## Input and change events

- For an input element KEYDOWN/UP are not sufficient for reading input as one can paste from clipboard, or use arrow keys etc.
- `change` event: triggered on focus is changed (blur) from the input and the input has changed from previous.
- `input` event: triggered when ever the input is changed. not triggered for shift, ctrl or arrow keys.

## DOM Event propogation:

- `Capturing phase`: Start at the root element viz. HTML
- `Target phase`: Start and end at the target element. Here the even listener is generally attached.
- `Bubbling phase`: Starts after the target phase.
- By default events (addEventListener) can be handled in target and bubbling phase but we can change this behaviour.
- Not all events have capturing and bubbling phase.

## Event capturing/trickling

- From parent to child. Order of calls is reserved.
- Third argument (useCapture) to addEventListener decides whether to bubble or capture. By default it is false.
- `StopPropogation`: Called on the event in the event handler. Used in child to prevent event bubbling and in parent to prevent event capturing.

## Event bubbling

- It is the default.
- The event propogates from child element to the parent element.
- To prevent the above behaviour call `.stopPropogation()` on the event object in the child event handler callback.

## Event delegation

- Instead of attaching event handler to child attach it to parent.
- To add event to non existent element, add listenet to their parents.
- This way a when a newly created child is clicked it triggers the parent's event handler.
- It is based on event bubbling. Takes less memory due to lesser number of event listeners.
- Also less code. But not all events are bubbled like focus or blur. Also it does not work when event propagation is disabled.
- Behaviour pattern:
  - Set attribute in a tag `data-uppercase`:
  - event.target.dataset.uppercase != undefined.

## DOM object hierarchy

- eventTarget->Node
- Node

  - Element
  - text
  - Document

- Element-> HtmlElement
- HtmlElement

  - Div
  - span
  - H1 etc.

- querySelector also works on the elements, not just the document.
- It works under the tree of the element.

## Async Javascript

### call stack

- Mechanism JS interpreter uses to keep track of its place in a script that calls multiple functions.

### Web API and single thread

- Browsers come with web API to handle certain tasks in bakcground like making request and setTimeout.
- JS recognises these WEB API functions and pass them to browser to take care.
- Once browser finishes the tasks, they return and are pushed to the stack as callback
- JS is single threaded: At any point of time single JS thread is running at most one line of code.
- One way for asynchronous programming is callback functions, but it leads to callback hell.
- For eg when we use setTimeout(), it doesn't blocks the execution.

## Callback hell

- Occurs when we sequence async code using callbacks.
- Caused by using callback functions to handle async code.
- Leads to ugly and messy code.
- Hard to maintain code.
- Using promise we can chain the sequence of async calls, instead of nesting.
- Using promise we can better handle the exceptions.
- XMLHttpRequest() uses callbacks for handling requests.
- Fetch() uses promises for handling requests.

## then and finally method in promise

- then() method always return a promise whether we explicitly return promise or not.
- then method akes two functions as argument, first is for fulfillment of promise and the second is for rejection.
- Alternatively, we can catch error in a promise chain by having a catch function at the end of the chain.
- Whatever value we return from promise will become value returned when a promise is fulfilled.
- finally() method will be called in all cases, whether a promise is fulfilled or not.

### Running promises in parallel

- `Promise.all()`: Short circuits if any promise is rejected.
- `Promise.race()`: Returns when any promise is resolved or rejected.
- `Promise.allSettled()` (ES2020): Returns when all promises are either resolved orrejected.
- `Promise.any()` (ES2021): Returns when any promise is fulfilled.

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

### Manually creating your own promise.

```javascript
// Creating a promise
const fakeRequest = url => {
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
  .then(data => {
    console.log("done with request");
  })
  .catch(err => {
    console.log("there is error", err);
  });
```

## Async functions

- Newer and cleaner syntax to work with async code.
- Better syntax than promise.
- async function always return a promise.
- If a function returns a value the promise will be resolved with that value.
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
- Use JSON.parse(data): Convert JS object from a (JSON)string.
- Use JSON.stringify(object): Convert JS object to string.
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

### Change content of element

`tag.textContent` : get/set text content inside an element, it ignores tags and recurse to get all text. You can't set html tags with this, they will appear as strings on webpage.

`text.innerHTML`: get/set text + html tags. You can set html tags with this.

### Change attribute of element

- tag.getAttrubute("src").
- tag.setAttribute("src", "me.png").

### DOM events

- `Events`: clicking a button, hover, dragging and dropping, pressing a button etc.

- Select an element then add event listener.

- element.addEventListener('type', function)

### To add event listener to nodeList(HTMLCollection)

```javascript
for (i = 0; i < tagList.length; ++i) {
  tagList[i].addEventListener(click, function () {
    this.style;
  });
}
```

### Difference between input and change event

- `input`: On any user input to text or select.
- `change`: When value changes or focus changes.

### Types of events

- `mouseover`: When mouse comes over an element
- `mouseout`: When mouse hover out of element.

### Keypress Vs keydown:

- keydown is also fired in case of modifier and non printable keys.
- Keypress gives the character, for eg shift+a='A'.

### this keyword

- `Global context`: when this is not inside of a declared object. this refers to global object(window in case of browser). Any vat declared in global scope is attached to window object.

```javascript
this.person = "Ellie"; // person is now a global variable.
```

- `Global with strict`: if we type "use strict" at top of js file then, value is this inside a function is undefined.

- `Object/implicit context`: when this is inside of a declared object. Then value of this is closest parent object.

- `Explicit context`: change the context of this by using call(), apply() or bind() methods.

- `New context`: when an object is created using new, then this attaches to the newly created object.

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

### What is currying

Currying is a technique of evaluating function with multiple arguments,
into sequence of functions with single argument.In other words, when a function,
instead of taking all arguments at one time, takes the first one and return a new
function that takes the second one and returns a new function which takes the third one,
and so forth, until all arguments have been fulfilled.

- two ways to implement currying in JS:

  1. Using bind function

  2. Using closures.

```javascript
// function currying using bind
function multiply(x, y) {
  console.log(x * y);
}

multiplyByTwo = multiply.bind(this, 2);
multiplyByThree = multiply.bind(this, 3);

multiplyByTwo(10);

// function currying using closures
function multiply(x) {
  return function (y) {
    console.log(x * y);
  };
}

multiplyByTwo = multiply(2);
multiplyByThree = multiply(3);

multiplyByTwo(4);
```

## Polyfill for bind() method

- Polyfill is used to implement the methods not available in the browsers.

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

## async and defer properties in script tag in HTML

- Normally browser parse the HTML file, on seeing a script tag it stops the parsing and fetches the script and execures it, after that it continues with the apesing.
- In case of `async` tag, the fetching of JS script happens in parallel and browser stops when the script is fetched, it executes the script and continues.
- In case of `defer` tag, the fetching of scripts happens in parallel and are executed after the browser has paesed the HTML file.
- `async` does not maintain ther order of script execution but `defer` does.
- So if you are fetching any unrelated script like google analytics then `async` should be used.
- For other scripts if you don't know the depedency then it's better to use the defer tag.

### OOP in JS

- Each object in JS is linked to a prototype object.
- Object inherit methds and properties from protype, this is called protypal inheritance.
- Normally in other language one class inherits from the other class.
- In JS an instance inherits from a class, which is different.
- In other languages themethods are copied from class to all insrtances.
- But in JS the method(behaviour) is delegated to the linked prototype object.

## Three ways to create classes in JS

- Constructor functions: Cretae objects from functions.

  - Arrow functions cannot be used as constructor functions as they don't have own `this`.
  - They look like a normal function, except that they must be invoked with new keyword.
  - Every function in JS has prototype property, including the constructor function.

- ES6 classes: Syntactic sugar for constructor functions. Modern approach.

- Object.create(): Simplest way to link an object to prototype object. Not used much.
  - manually set the prototype.

**Note**: object1.hasOwnProperty('age'), checks if object1 has own(not from proto chain) property 'age'.

- Classes are not hoisted, unlike functions.
- Classes are also first class citizens.
- Body of class is executed in strict mode.

### getter and setter

- They exist for both classes and objects.
- Use `set` and `get` keyword in function declaration.

### Static methods in JS

- Declare a function directly on the constructor function instead of the prototype.
- Or use static keyword in function declaration in the class.

## Inheritance between classes in JS

- Using contructor functions.
- Using ES6 classes: Use extends keyword.
- Using Object.create

## Encapsulation in JS

- Currently its done only by convention, using underscore.
- Protected properties and methods.
- Private class fields and methods.

- OOP is a model based on objects constructed from a blueprint (classes).

- JS doesn't have Built-in support for classes. We mimic classes using constructor functions. These constructor functions creates objects through the use of new keyword.

- `Constructor functions`: creates an object/instance. Their first letter should be capitalized. They are used along with new to bind the this to the returned object.

- If a constructor function uses another constructor function (since they share common properties), then it should set the context of this when calling the other constructor function.

### new keyword does four things

- It creates an empty object.
- It sets the keyword `this` to be that empty object.
- It adds "return this" to the end of the function which follows it.
- It adds a property **proto** to the empty object, which links the prototype property on constructor function to empty object.
- The `constructor` property on prototype property points back to the function itself.

### Prototype and prototype chain

- It is a mechanism by which JS object inherit feature from one another.

- Every object has **proto** object.

- The top level has null as its **proto** object.

- For eg. user created array, "arr" will have **proto** object. Which will be same as Array.prototype.

- arr.**proto** is `Array.prototype`.

- arr.**proto**.**proto** is `Object.prototype`.

- arr.**proto**.**proto**.**proto** is null.

- When we access an object's property, it is first checked in the object itself, then it's prototype chain in a heirarchical way.

- It is a template object for eg. Array.prototype, String.prototype.

- Every constructor function has a property named prototype, which is an object.

- The prototype object has a property named constructor, which points back to constructor function.

- Anytime an object is created using new keyword, a property named **proto** gets created linking the object and prototype property of constructor function.

- The constructor function creates properties and objects on the prototype object, which are accessed by the object created by the constructor function, using **proto** property.

- Prototype object(it's properties and methods) is shared among all objects created by that constructor function.

- Prototype is a good place to define property/methods which should be shared by the objects created by that constructor function. This way, the code is not replicated in all the objects created by that constructor function, rather it is kept at one place(function1.prototype)

## OOP using contructor functions

- This approach has been replaced by ES6 classes.

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

# ES6/ECMA2015

### let Vs var

- Let block scope
- Var function scope. They are hoisted.

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

- JS interpreter modifies the code before executing.

- Any var declaration (as uninitialised variable) is moved up in the block.the variables declaration in other parts of block is replaced by initialization.

- Therefore the variables in a for loop is accessible with it's last updated value. This leads to error prone code.

- Also you cannot declare variables(using var) with same name in different loops in the block.

### Arrow function syntax

- Syntactical sugar.
- Better suited for one line anonymous functions. For eg. In setInterval() method.
- Old syntax Vs arrow syntax.
- Optional brackets and return statement and conciseness of arrow function syntax.
- Use of arrow syntax in functional coding, ie map, filter, reduce.
- In arrow function syntax the context of this keyword is preserved. This is a huge advantage as compared to old function syntax. This enables its use in passing to higher order functions, eg setInterval ().

### Built-in functions

- Used to test if an object is instance of a type.
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

- Helps in writing asynchronous code, CPU is not blocked waiting for something to finish.
- Instead of passing a callback function to a function, which will finish in future(old way). Leads to unreadable code.
- The promise supporting function(for eg built-in function fetch()) will return a promise object.
- Promise object has states like pending, fulfilled, rejected.
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
  .catch(err => console.error(err));
```

### filter()

- arr.filter(x => x % 2 == 0) //gets even values from array.

**Note** : JS builtin str1.split(" ")// returns an array

### sort()

- Sorts the array in place. it doesn't return a new array.

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

## JS built-in methods

### Object.fromEntries()

- Transforms a list of key-value pairs into an object.

```javascript
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }
```

# JS for React

## Ternary operator

- Used in React for conditional rendering.

## Logical operators && or ||

- Used in React for conditional rendering.

```js
// Ternary operator
const buttonLabel = playback === "stop" ? "play ▶️" : "stop ⏹️";
// Logical operator
const userComponent = isLoggedIn && getUserComponent();
```

## Optional chaining && nullish coalascing operator

## Closures

- A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment within which that function was declared).
- Closure gives you access to an outer function's scope from an inner function.
- In JS, closures are created every time a function is created, at function creation time.

## Lexical scoping

- Describes how a parser resolves variable names when functions are nested.
- The word lexical refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available.
- Nested functions have access to variables declared in their outer scope.

## Template literals:

- Template literals are literals delimited with backtick (`) characters, allowing for:

  - Multi-line strings,
  - `String interpolation` with embedded expressions,
  - Special constructs called `tagged templates`.

- Along with having normal strings, template literals can also contain other parts called `placeholders`
- `placeholders`: Embedded expressions delimited by a dollar sign and curly braces: `${expression}`.
- The strings and placeholders get passed to a function — either a default function, or a function you supply.
- The default function (when you don’t supply your own) just performs string interpolation and always return a string.
- `String interpolation`: To do substitution of the placeholders and then concatenate the parts into a single string.
- To escape a backtick in a template literal, put a backslash (\) before the backtick.

## Tagged templates

- Calls the function with array of string values as the first argument and substitution values as subsequent arguments.
- Tagged template literal may not result in a string.

Syntax: `${JS-expression}`
Usage: Used inside curly braces of JSX.

## Nesting of templates

Within a backtick-delimited template, it is simple to allow inner backticks by using them inside an `${expression}`
placeholder within the template.

## Tagged templates and escape sequences

## Raw strings

## Shorthand property names

`{a, b, c} is same as {a: a, b: b , c: c}`

## Object initializer pattern

## Object literal notation vs JSON

- JSON permits only property definition using "property": value syntax.
- The property name must be double-quoted, and the definition cannot be a shorthand.

## Shorthand method names

```javascript
let o = {
  property: function (parameters) {},
  get property() {},
  set property(value) {},
};

// Same as
// Shorthand method names (ES2015)
let o = {
  property(parameters) {},
};
```

## Computed property names

```js
let i = 0;
let a = {
  ["foo" + ++i]: i,
  ["foo" + ++i]: i,
  ["foo" + ++i]: i,
};
```

## Arrow functions

## Object Destructuring

- If you use assignment without variable declaration, you need to use parentheses.

```js
const creatures = {
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼", "👩🏾‍💻", "🧑‍💻"],
  supernatural: ["👾", "🤖", "👽", "👹", "👺"],
};
let human, supernatural;
({ human, supernatural } = creatures);
```

- React developers use this pattern with `props`, which are the input for React components.

```js
function MyReactComponent({ name, age }) {
  // ...
}
```

- You can also define default values while unpacking fields from the assigned object.

```js
const { human: people = ["👨🏿‍💼"], supernatural = ["👾", "👽"] } = {
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"],
};
console.log(people); // ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"]
console.log(supernatural); // ["👾", "👽"]

// Nesting is also possible while destructuring
const creatures = {
  animals: {
    wildlife: ["🦂", "🐍"],
    pet: ["🐕", "🐈"],
  },
  human: ["👨🏿‍💼", "👩🏼‍💼", "🧑🏻‍💼"],
};
const {
  animals: { pet },
} = creatures;
console.log(pet); //  ["🐕", "🐈"]
```

## Array destructuring

With the help of the [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), an array can be unpacked in such a way that its values are extracted into distinct variables.

```js
const array = [1, 2];
const [varForVal1, varForVal2] = array;
console.log(varForVal1); // 1
console.log(varForVal2); // 2

// variables are assigned from the left to the right of
// the array, so order is maintained.
const [fruit, veggie] = ["🍓", "🥦", "🍕", "🌮", "🥪", "🍔"];
console.log(fruit); // 🍓
console.log(veggie); // 🥦

// You can also skip values under consideration of the order.
const [fruit, , pizza, , , burger] = ["🍓", "🥦", "🍕", "🌮", "🥪", "🍔"];
console.log(fruit); // 🍓
console.log(pizza); // 🍕
console.log(burger); // 🍔

// You can also assign multiple values at
// once with the rest pattern.
const [fruit, veggie, ...junkfood] = ["🍓", "🥦", "🍕", "🌮", "🥪", "🍔"];
console.log(fruit); // 🍓
console.log(veggie); // 🥦
console.log(junkfood); // ["🍕", "🌮", "🥪", "🍔"]

// Array destructuring allows for default values.
const getFood = () => ["🍓", "🥦"];
const [fruit, veggie, junkfood = "🍕"] = getFood();
console.log(fruit); // 🍓
console.log(veggie); // 🥦
console.log(junkfood); // 🍕
```

## Array destructuring in React

- Used in hooks like useState.

## Array destructuring vs object destructuring

- Array destructuring allows for custom variable names.
- In contrast, with object destructuring, you need to rename the variables.

## Parameter defaults

## Spread operator

- The [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (...) allows an iterable item (e.g., an array) to be extracted into its parts and plugged into places that expect individual elements. With this syntax, you can split up object properties or array elements.

```Js
// Use case#1: Pass each element of an array
// as individual function argument.
const numbers = [11, 5, 3, 1, 26];
// Math.max expects to be called like Math.max(11,5,3,1,26)
console.log(Math.max(...numbers)); // 26

// Use case#2: Copy object properties to create a new object
const food = {
  breakfast: ["🥞", "🧇"],
  lunch: ["🍔", "🍟", "🍕"]
};
const foodAndDrinks = {
  ...food,
  drinks: ["🍷", "🍹", "🍺", "🥃"],
};

// Create a copy of an array.
const food = ["🥞", "🧇", "🍔", "🍟", "🍕"];
const copy = [...food];
```

## Spread operator in React

- In React, you should not manipulate state objects directly. Instead, you need to create a brand-new state object whenever you want to update the state.

```Js
const restaurantState = {
  drinks: ["🍷", "🍹", "🍺", "🥃"],
  food: ["🥞", "🧇", "🍔", "🍟", "🍕"],
  lastOrder: null
}
// the customer ordered a 🍔
const stateAfterOrder = {
  drinks: [...restaurantState.drinks], // copy drinks
  food: [...restaurantState.food], // copy food
  lastOrder:  "🍔" // override lastOrder
}
```

## Rest operator

- With the [rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) (...), you can merge a list of function arguments into an array. While the syntax of the rest operator is the same as the spread operator, their place of use makes all the difference.
- Its purpose is to merge a list of values into an array.
- It is a common practice to use the rest operator in combination with the spread operator. This combines multiple arguments into an array to distribute the entries again in another place inside of a React component.

## ESModules

## Ternaries

## Array Methods

## Nullish coalescing operator

## Optional chaining

## Promises and async/await

## Array methods

- `findIndex()`: Returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
