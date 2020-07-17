---
layout: single
title: "Javascript"
excerpt: "Javascript Language"
---

### Separation of concern
- Structure: html
- Behaviour: JS
- Presentation: CSS

### JavaScript
-  Single line comment: //
-  Multi line comment: /*   */

### 5 primitive data types
1. **Numbers**: Includes ALL numbers, integer and fraction.
- % : remainder
- 1/3= 0.33333 (no type coercion of result)

2. **Strings**:
- Use both ", ' 
- Use + to concatenate strings.
- Use '/' to escape quotes in a string.
- Use 'length' property for string length
- Use index in a string
- string1.indexOf("string2"): gives index of str1 in str2 otherwise -1.
- str.slice()
- str.charAt(index)
- str.toUpperCase()
- str1.replace(/-/g, "_"); //replace - by _ and returns a new string.

3. **boolean**: true, false

4. **null**: Explicit null value assigned to variable.

5. **undefined** : No value assigned to variable.

**Note**: null and undefined are values, not types.

### Variable 
 - Syntax: var variableName = "hi"
- Variable type can be changed after assignment.
- camelCase.

### Built-in methods
- **console.log()**
- **clear()**
- **alert()**: show dialog to user
- **prompt()**: take input from user as a string.
- **type of**: 
- type of 'saurabh'; // prints "string"
- type of 25; // prints "number"
- **Number("45")**: converts to number, ie 45.
- **console.dir(document)**

### Including js files in html
- {% raw %}\<script type="text/Javascript" src="path of us file">\</script>{% endraw %}
- If your js interacts with html element then put script tag at the bottom of body, so that html is rendered before js loads.
- The functions declared in js files can be called from chrome debug console.
- Use script tag in header(only header?)

### Comparison operators
- `===`: equal in value and type.
- `!==`: Not equal in value or type.

```javascript
var x = 5;
x == "5"  //is true
x === 5 //is false

//"==" Does 'type coercion', ie make both sides of same type, then compare.

null == undefined // true
null === undefined // false

true == "1" // true
true == "2" // false
0 == false // true
NaN == NaN // false
```

**Note**: NaN is not comparable.

### Logical operators
- connects Boolean expressions.
- &&, \|\|, !
- short circuit of && and \|\|.

### Truthy and falsey values
- values that are not true or false are still inherently truthy or falsey, when evaluated in a Boolean context.

- !"hello" //false  
- !!"hello" //true  
- !null //true  
- !"" //true  
- !NaN //true  
- !-1 // false  

### Falsey values
- false
- 0
- "", ''
- null, undefined, NaN.
- everything else is truthy except above four values.

### Conditionals
if() {  
} else if() {//Notice the space between else and if  
} else {  
}  

### Loops
- while() {
}

- for(init; condition; step) {
}

### Functions
- Two syntax for defining functions, declaration and expression.

- function funcName(arg1) {
console.log("Hi " + arg1);
} // Notice no var in arg1, function declaration

- var funcName = function(arg1) {
}// Function expression

- funcName ("Saurabh");

- funcName can be reassigned to a different value, in that case function will not be accessible.

- If we fail to pass the arguments, they will be undefined, it will not break the code.

- If a function does not have return statement, it returns undefined.

### Variable scope
- A global variable is accessible inside a function, if we don't use var keyword.
- If we use var keyword inside function, a new local variable is created.

### Higher order functions
- Takes function as an argument.
- Return function as an argument.

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

### JS Arrays
- Arrays can be nested, in that case it'll have multiple indexes to access an item.
- var arr1 = []
- var arr2 = new Array()
- array can hold non homogeneous data
- array has a property, length.
- if we assign at index >= length of array, then other non assigned intermediate elements are kept undefined.

### Array methods
- arr1.push(element): add element at the end.
- arr1.pop(): removes and returns last array element.
- arr1.unshift(element): add element to front of array.
- arr1.shift(): remove and return from front of array.
- arr1.indexOf(item): gives index or -1.
- arr1.slice(index1,index2): returns copy of array. If no args are present then copy entire array.

### Array iteration
- arr1.forEach(function (item, index, arr){
console.log(item)
});// note that index and array can also be passed.
- we can also use normal for loop.

### Objects in JS
- Objects are unordered unlike arrays.
- Adding/deleting item can be done directly, no push/pop required as there is no order.
- Similar to Python Dictionaries, key-value pairs.
- eg var obj1={name:"Saurabh", age:45}
- Notice no quotes on key/property names.
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

### Initialising empty object in JS
- var obj1={};
- var obj1= new Object();

### Accessing objects with brackets and dot notation
- If property name (key) starts with number, you can't use for notation.
- If property name has spaces, you can't use for notation.
- You can use variable in bracket notation, but not in dot notation.
- Array and object can be nested and mixed.

### DOM
- document object model is interface between js and html-css.
- js interacts with html using Dom.
- Browser converts html to us objects which can be manipulated using js.
- Everything is stored inside document object.

Document>html (root element)>header and body.

### Dom manipulation workflow
- select then manipulate.

### NodeList, HTMLCollection, arrays of objects
- TBD

### Document selectors
document.URL: URL of the webpage.
document.links: all links on the web page.
document.body
document.head

var tag = document.getDocumentById("highlight");

- On console, tag will be printed as an html element, but it is a JavaScript object.
- Do a console.dir(tag);

**querySelector()**: selects first matching element.

**querySelectorAll()**: selects all matching elements.

### Dom manipulation
**Separation of concern**: style is defined in CSS file and toggled in js. You should avoid direct style changes in js.

### Change style of element
We can add style manually for eg tag.style.border etc, but we generally use classes.
- Add remove class.
- Change content of a tag.
- Change attributes like href, src etc.

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
for(i=0; i < tagList.length; ++i ){
  tagList[i].addEventListener(click, function(){
  this.style
   })
}
```

### Difference between input and change event
- input: on any user input to text or select.
- change: when value changes or focus changes.

### Types of events
- mouseover: when mouse comes over an element
- mouseout: when mouse hover out of element.

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
- fadeOut(intervalMs, func1): both arguments are optional. The element is not removed, only display is set to none. Func1 is called after interval. Func1 is generally $(this). remove().

- fadeIn(): same arguments as fadeOut().

- fadeToggle(intervalMs):

- slideDown(): animates the height(increasing)

- slideUp(): animates the height(decreasing)

- slideToggle():

### Intermediate js

### this keyword
- Global context: when this is not inside of a declared object. this refers to global  object(window in case of browser). Any vat declared in global scope is attached to window object.
```javascript
this.person = "Ellie" // person is now a global variable.
```

- Global with strict: if we type "use strict" at top of js file then, value is this inside a function is undefined.

- Object/implicit context: when this is inside of a declared object. Then value of this is closest parent object.

- Explicit context: change the context of this by using call(), apply() or bind() methods.

- New context:  when an object is created using new, then this attaches to the newly created object.


### call(), apply() and bind()
- They can only be called on functions. They are used to explicitly set the value of this.

- call(thisArg, a, b, c, ....): It is called immediately. thisArg is the object to which this should refer to inside the function.

- apply(thisArgs, [a, b, c, ....]): It is called immediately.

- bind(thisArg, a, b, c, .....): It is not called immediately. It returns a function definition.

### Asynchronous function
- setTimeout(func1, timeMs): executes the function after tumeMs milliseconds.

### OOP in JS
- OOP is a model based on objects constructed from a blueprint (classes).

- JS doesn't have Built-in support for classes. We mimic classes using constructor functions. These constructor functions creates objects through the use of new keyword.


- Constructor functions: creates an object/instance. Their first letter should be capitalized. They are used along with new to bind the this to the returned object.

- If a constructor function uses another constructor function (since they share common properties), then it should set the context of this when calling the other constructor function.

### new keyword does four things
- It creates an empty object.
- It sets the keyword this to be that empty object.
- It adds "return this" to the end of the function which follows it.
- It adds a property __proto__ to the empty object, which links the prototype property on constructor function to empty object.

### Prototypes
- Every constructor function has a property named prototype, which is an object.

- The prototype object has a property named constructor, which points back to constructor function.

- Anytime an object is created using new keyword, a property named __proto__ gets created linking the object and prototype property of constructor function.

- The constructor function creates properties and objects on the prototype object, which are accessed by the object created by the constructor function, using __proto__ property.

- Prototype object(it's properties and methods) is shared among all objects created by that constructor function.

- Prototype is a good place to define property/methods which should be shared by the objects created by that constructor function. This way, the code is not replicated in all the objects created by that constructor function, rather it is kept at one place(function1.prototype)


### To add a custom method to Array

```javascript
Array.prototype.myForEach = function(func) {
	for(i = 0; i < this.length; i++){
		func(this[i])
		}
	}
```

### Prototype chain
- Any property defined on prototype can be accessed directly by objects created using new(). That's why we can access are.push() method as it is defined in Array.prototype.

- Js looks for a method/property in the prototype chain, if method is not found then error/undefined is returned.

- var arr = [] // new Array()

- arr.__proto__->Array.prototype

-  Array.prototype.__proto__-> Object.prototype

- Object.prototype.__proto__ -> null

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

### Concise arrow syntax : X=>X*2

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

constructor() {}

}//notice there is no function keyword in front of constructor 
```

### Polymorphism 
- Base class variable can contain derived class value.
