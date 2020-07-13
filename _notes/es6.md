---
layout: single
title: "ES6 Introduction"
excerpt: "Introduction to ES6"
---

### ES6/ECMA2015

### let Vs var
- **syntax**
let x = 100;
const y = 150;

- **var**: Function scope. Loop Variable persists and is accessible after loop finishes. Leads to error prone code, you shynot use it.
- **let**: Block scope (common in other languages like java etc). Block scope is scoped to a block of code(using curly brackets) for eg loop, conditionals etc. Leads to better code. You must use this in your code as most modern browsers now support es6.
- **const**: block scope. used for constants. It's info to the complier, optimizing the code. For const objects, the content of the object can change insitu but reassignment of the const type is not allowed.

- real world use case of const:  
```javascript
const func1 = function() {
//using Const ensures catching unintentional reassignment of func1
}
```

```javascript
console.log(x) // gives undefined
var x = 100;
console.log(x)// prints value of x

console.log(x) // throws ReferenceError exception, execution stops
let x = 100;
console.log(x)// prints value of x

let x;
console.log(x) // gives undefined
x = 100;
console.log(x)// prints value of x
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

### concise arrow syntax : X=>X*2

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

arr = arr.fill(0).map(()=>Math.random());

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
let promises= [promise1, promise2, promise3];

promise.all()
  .then(()=>{})
  .catch((err)=>console.error(err));
```



### filter()
- arr.filter(x => x % 2 == 0) //gets even values from array.

**Note** : javascript builtin  str1.split(" ")// returns an array 


### sort()
- Sorts the arr in place. it doesn't return a new array.



### promise()
- Used  in callbacks.


### promise.all()
- Gives the result of promises in an array in the order they were in original array.
- If any promise in the array fails, then whole result fail.
- To avoid this, push the promises one by one in the array.


### Try catch in promises
- Can be used to catch errors in an array of promises.


### inheritance
- Encapsulation.
- Inheritance.
- Polymorphism.
 
### ES6 Classes
- Old way was using constructor functions.
- In the new approach, only the syntax has changed not the prototype approach.
- A class can only inherit from only one class.  

```javascript
class xyz extends baseClass {

constructor() {}

}//notice there is no function keyword in front of constructor 
```

### Polymorphism 
- Base class variable can contain derived class value.