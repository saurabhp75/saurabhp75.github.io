---
title: "Just Javascript"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Javascript"]
draft: false
description: "Javascript mental model"
---

# Just javascript

## Just Javascript (2)

- `Common misconception`: Values are our code.
- `Fact`: Our code interacts with values, but values exist in a completely separate space.

## There are two kinds of values

1. `Primitive Values`: They are a `permanent` part of our JavaScript universe. I can point to them, but I `can’t create, destroy, or change` them.
2. `Objects and Functions`: Objects and functions are also values but, unlike primitive values, we can create and manipulate them from my code.

`Fun fact`: Functions are objects, but because they include a few unique additional features, we’re going to refer to them separately to avoid confusion.

## Types of Values

There are 9 types of values in JS.

### Primitive values

1. Undefined (undefined): Used for unintentionally missing values.
2. Null (null): Used for intentionally missing values.
3. Booleans (true and false): Used for logical operations.
4. Numbers (-100, 3.14, and others): Used for math calculations.
5. BigInts (uncommon and new): Used for math on big numbers.
6. Strings ("hello", "abracadabra", and others): Used for text.
7. Symbols (uncommon): Used to perform rituals and hide secrets.

## Objects and Function values

8. Objects ({} and others): Used to group related data and code.
9. Functions (x => x \* 2 and others): Used to refer to code.

`Note`: Arrays, dates, and regular expressions fundamentally are objects in JS.

`Myth`: everything in JS is an object! `"hi".toUpperCase()` makes "hi" seem like an object, this is nothing but an illusion. JS creates a temporary object when you do this, and then immediately discards it.

`typeof`: Mostly the parens is not required, but for `console.log(typeof(x => x * 2));` we need parens.

## Expressions

- Expressions are questions that JS can answer. JS answers expressions in the only way it knows how—with values.
- Expressions `always` result in a `single value`.
- Expressions are like questions we ask from JS and it answers with a value.
- For eg. If we “ask” the expression `2 + 2`, JS will “answer” with the value `4`.
- If we “ask” the expression `typeof(2)`, JavaScript will “answer” with the value `number`.

# Recap

- There are values, and then there’s code. We can think of values as different things “floating” in our JavaScript universe. They don’t exist inside our code, but we can refer to them from our code.
- There are two categories of values: there are Primitive Values, and then there are Objects and Functions. In total, there are nine separate types. Each type serves a specific purpose, but some are rarely used.
- Some values are lonely. For example, `null` is the only value of the Null type, and `undefined` is the only value of the Undefined type. As we will learn later, these two lonely values are quite the troublemakers!
- We can ask questions with expressions. Expressions exist in our code, so they are not values. Rather, JavaScript will answer our expressions with values. For example, the `2 + 2` expression is answered with the value `4`.
- We can inspect the type of something by wrapping it in a typeof expression. For example, `typeof(4)` results in the string value "number".

Note: `typeof(null)` gives `object` which is incorrect as per the standard. It should be `null`.
`typeof(typeof(value))` is always `string`.

## Primitive Values Are Immutable

- This is very important.
- JS won’t let us set a property on any primitive value.
- JS won't allow us to mutate primitive value, whether it throws an error or silently refuse depending upon the mode of execution.

```javascript
// In strict mode it will throw an error
// otherwise it prints 'yikes'
let reaction = "yikes";
reaction[0] = "l";
console.log(reaction);
```

## Variables and Values (3)

- Variables are not values.
- Variables point to values.

## Rules of Assignment

- The `left side` of an assignment `must be a variable`.
- Note that the `left side can’t be a value`.
- The right side of an assignment `must be an expression`, so it always results in a value. Our expression can be something simple, like `2` or `'hello'`.
- Note that `y = x` did not mean point y to x. We can’t point variables to each other! Variables always point to values.

## Literals and expressions

- `literals`: We literally write down the values that they result in.

## Reading a Value of a Variable

- We can’t really pass variables to functions. We pass the current value of the variable.
- Variables are expression too.
- When we pass a variable, we are passing `current value` of the variable.
- Note that same expression can give us different values at different times!

## Studying from the inside (4)

- The foundation of our mental model is values.
- Each `value` belongs to a `type`.
- Primitive values are immutable.
- We can point to values using “wires” we call variables.

## Meeting the Primitive Values (5)

## undefined

- There is only one value of this type, `undefined`.
- In JS, it represents the concept of an unintentionally missing value.
- If you don't initialize a variable, it will be undefined.
- Reading a property from it will break your program giving a `TypeError`.
- If you read a variable that was actually not defined (or before the let declaration), you will get a `ReferenceError`.
- After a variable is declared, it always points to a value. And if you don’t specify where it should point, it will point to undefined!

## null

- There is only one value of this type, `null`.
- Behaves very similarly to undefined. For example, it will also throw a fuss (TypeError) when you try to access its properties.
- `typeof null` shows it as an object, but its a bug in JS.
- It is used for intentionally missing values.

## boolean

- There are only two boolean values: true and false.

## numbers

- In our mental model, there is only one number value for each number!

```js
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2 === 0.30000000000000004); // true
```

In real math, there is an infinite set of numbers. But in floating-point math, there are only 18 quintillion of them. So when we write numbers in our code or do calculations with them, JavaScript picks the closest numbers that it knows about—just like our scanner does with colors.

In other words, JavaScript uses numbers with limited precision.

We can imagine all of the JavaScript numbers on an axis. The closer we are to 0, the more precision numbers have, and the closer they “sit” to each other:

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```

Luckily, any whole numbers between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER` are exact. This is why 10 + 20 === 30.

## Special Numbers

- `NaN`: It is a numeric value. It happens to be called “not a number” because it represents an invalid result.
- `Infinity`
- `-Infinity`
- `-0`
- They exist because sometimes you might execute operations like 1 / 0, and JavaScript needs to represent their result somehow. The floating-point math standard specifies how they work, and what happens when you use them.

```js
let scale = 0;
let a = 1 / scale; // Infinity
let b = 0 / scale; // NaN
let c = -a; // -Infinity
let d = 1 / c; // -0
```

## BigInts

- Regular numbers can’t represent large integers with precision, so BigInts fill that gap (literally).
- The specification says they have arbitrary precision. This means that in our JavaScript universe, there is an infinite number of BigInts—one for each integer in math.

```js
let alot = 9007199254740991n; // n at the end makes it a BigInt!
console.log(alot + 1n); // 9007199254740992n
console.log(alot + 2n); // 9007199254740993n
console.log(alot + 3n); // 9007199254740994n
```

## strings

- There are three ways to write strings (single quotes, double quotes, and backticks).
- Strings Aren’t Objects. Though they have a few built-in properties.
- To keep our mental model simple, we will say that all conceivable string values already exist from the beginning—one value for every distinct string.

## Symbols

- Symbols serve a similar purpose to door keys: they let you hide away some information inside an object and control which parts of the code can access it.

```js
let alohomora = Symbol();
console.log(typeof alohomora); // "symbol"
```

## Quiz

- Variables should point to values, not expressions.
- There is only one true, and only one false value.

# Meeting Objects and Functions (6)

## Objects

- They include arrays, dates, RegExps, and other non-primitive values.
- By default, they’re mutable (we can change them).
- We can access their properties with `.` or `[]`.
- There is one thing in particular that makes objects exciting and unique. We can make more of them! We can populate our JavaScript universe with our own objects.
- Every time we use the `{}` object literal, we create a brand new object value.
- In our mental model, all of the primitive values we’ve discussed—null, undefined, booleans, numbers, and strings—have “always existed.” We can’t create a new string or a new number, we can only “summon” that value.
- Instead, JavaScript is a garbage-collected language. We can create objects—but we cannot destroy them.
- This means that although we can’t destroy an object, it might eventually “disappear” if there is no way to reach it by following the wires from our code.
- In our universe, objects and functions float closest to our code. This reminds us that we can manipulate them and even make more of them.
  `

```js
console.log(typeof new Date()); // "object"
console.log(typeof /\d+/); // "object"
console.log(typeof Math); // "object"
```

## Functions

- Functions are Values.
- Every time we execute a line of code that contains a function expression, a brand new function value appears in our universe.
- Technically, functions are objects in JS. We’ll keep treating them as a separate fundamental type because they have unique capabilities compared to regular objects.
- But, generally speaking, if you can do something to an object, you can also do that to a function too. They are very special objects.
- In fact, countDwarves() is also an expression. It’s known as a call expression. To “answer” a call expression, JavaScript runs the code inside our function, and hands us the returned value as the result (in this example, it’s 7).

```js
for (let i = 0; i < 7; i++) {
  console.log(2); // Same value epasse din each call.
  console.log({}); // Diff. object value passed every call
  console.log(function () {}); // Diff. function value passed every call
}
```

## Recap

- Primitive values (strings, numbers, etc...), which we encountered in the first part of our tour, have always existed in our universe.
- Objects and functions behave differently and allow us to generate our own values. Writing {} or function() {} always creates a brand new, different value. This idea is crucial to understanding equality in JavaScript, which will be our next topic.

## Quiz

- Diagram C doesn’t match our mental model because it shows the value 7 more than once. In our mental model, there is only one value for each distinct number.
- Variable can’t point to another variable. It must point to a value.
- ran only one function() {} declaration, so only one function value was created.

# Equality of Values

## Kinds of Equality (7)

- `Strict Equality`: a === b (triple equals).
- `Loose Equality`: a == b (double equals).
- `Same Value Equality`: Object.is(a, b).

## Same Value Equality vs. Strict Equality

- Same value equality—Object.is(a, b): Direct meaning in our mental model. It corresponds to the idea of “the same value” in our universe.

## Two rare cases where the behavior of === is different from Object.is(a, b)

- NaN === NaN is false, although they are the same value. However, NaN is the same value as NaN.
- Both 0 === -0 and -0 === 0 are always true, However, 0 is a different value from -0

```js
let width = 0 / 0; // NaN
let height = width * 2; // NaN
console.log(width === height); // false
console.log(Object.is(width, height)); // true

// fix for NaN check
Number.isNaN(size);
Object.is(size, NaN);
size !== size;
```

## Loose Equality

- Should not be used in code.

## Recap

- JS has several kinds of equality. They include same value equality, strict equality, and loose equality.
- Same value equality, or Object.is(a, b), matches the concept of the sameness of values that we introduced in the previous module.
  - Understanding this kind of equality helps prevent bugs! You will often need to know when you’re dealing with the same value, and when you’re dealing with two different values.
  - When we draw a diagram of values and variables, the same value cannot appear twice. `Object.is(a, b)` is true when variables a and b point to the same value on our diagram.
  - Same value equality is verbose and a bit annoying to write, but it's also the easiest to explain, which is why we started with it.
- In practice, you will use strict equality, or a === b, most often. It is equivalent to the same value equality except for two rare special cases:
  - `NaN === NaN` is false, even though they are the same value.
  - `0 === -0` and `-0 === 0` is true, but they are different values.
- You can check whether x is NaN using `Number.isNaN(x)`.
- Loose equality (==) uses a set of arcane rules and is often avoided.

# Properties (8)

- In the code below, sherlock is a variable, but surname and age are not.
- They are properties. Unlike variables, properties belong to a particular object.
- In our JS universe, both variables and properties act like “wires.”
- However, the wires of properties start from objects rather than from our code.

```js
let sherlock = {
  surname: "Holmes",
  age: 64,
};
```

`Note`: Remember that our universe is full of wires. Some of them start from our code (variables), and others start from objects (properties). All wires always point to values.

## Property Names

- An object can’t have two properties with the same name.
- Property names are also always case-sensitive.
- To access property name via a variable, we use bracket notation.

## Missing Properties

JavaScript uses a set of rules that looks something like this:

- Figure out the value of the part before the dot `.`.
- If that value is null or undefined, throw an error immediately.
- Check whether a property with that name exists on our object:
  - If it exists, answer with the value this property points to.
  - If it doesn’t exist, answer with the undefined value.

## Recap

- Properties are wires—a bit like variables. They both point to values. Unlike variables, properties start from objects in our universe.
- Properties belong to particular objects. You can’t have more than one property with the same name on an object.
- Generally, you can perform an assignment in three steps:
  1. Figure out which wire is on the left.
  2. Figure out which value is on the right.
  3. Point that wire to that value.
- An expression like `obj.property` is calculated in three steps:
  1. Figure out which value is on the left.
  2. If it’s null or undefined, throw an error.
  3. If that property exists, the result is the value it points to. If that property doesn’t exist, the result is undefined.

# Mutation (9)

## No Nested Objects

- Objects might appear “nested” in code, but in our universe, each object is completely separate.
- An object cannot be “inside” of another object!

## Properties Always Point to Values

- It can’t point to another property or a variable.
- In general, all wires in our universe point to values.

## Let vs. Const

- `const` prevents variable reassignment—not object mutation.

## Recap

- Objects are never “nested” in our universe—pay close attention to the wires.
- Changing an object’s property is also called mutating that object.
- If you mutate an object, your code will “see” that change via any wires pointing to that object. Sometimes, this may be what you want. However, mutating accidentally shared data may cause bugs.
- You can declare a variable with const instead of let. That allows you to enforce that this variable always points to the same value. But remember that const does not prevent object mutation!
- Mutating the objects you’ve just created in code is safe. Broadly, how much you’ll use mutation depends on your app’s architecture.

# Prototypes (10)

## **proto** property

- It represents the JavaScript concept of a prototype.
- Any JavaScript object may choose another object as a prototype.
- By specifying **proto** (also known as our object’s prototype), we instruct JavaScript to continue looking for missing properties on that object instead.

```js
let human = {
  teeth: 32,
};

let gwen = {
  __proto__: human,
  age: 19,
};
```

- Although the value of `gwen.teeth` is 32, it doesn’t mean gwen has a teeth property!
- This serves to remind us that `gwen.teeth` is an expression—a question to our JavaScript universe.

## Prototype Chain

- A prototype is more like a relationship. An object may point to another object as its prototype.
- prototype chains can’t be circular!

## Shadowing

- Once we find our property, we stop the search.
- If you want to check if an object has its own property with a certain name, you can call a built-in function called `hasOwnProperty`. It returns true for “own” properties, and does not look at the prototypes.

```js
console.log(human.hasOwnProperty("teeth")); // true
console.log(gwen.hasOwnProperty("teeth")); // true
```

## Assignment

- When we read a property that doesn’t exist on our object, we’ll keep looking for it on the prototype chain. If we don’t find it, we get undefined.
- But when we write a property that doesn’t exist on our object, that creates the property on our object. Generally speaking, prototypes will not play a role.

```js
let human = {
  teeth: 32,
};

let gwen = {
  __proto__: human,
  // Note: no own teeth property
};

gwen.teeth = 31;

console.log(human.teeth); // 32
console.log(gwen.teeth); // 31
```

## The Object Prototype

- `All objects` created with the `{}` syntax have the special `__proto__` wire pointing to a default `Object Prototype`.

## An Object With No Prototype

- Set `__proto__` to null.
- Object Prototype is an object with no prototype.

## Polluting the Prototype

- Mutating a shared prototype called prototype pollution.
- In the past, prototype pollution was a popular way to extend JS with custom features.

```js
let obj = {};
obj.__proto__.smell = "banana";
// Now all object will have access to smell property.
```

## **proto** vs. prototype

- Before JavaScript added classes, it was common to write them as functions that produce objects, for eg.

```js
function Donut() {
  return { shape: "round" };
}

let donutProto = {
  eat() {
    console.log("Nom nom nom");
  },
};

let donut1 = Donut();
donut1.__proto__ = donutProto;
let donut2 = Donut();
donut2.__proto__ = donutProto;

donut1.eat();
donut2.eat();
```

- Manually adding **proto** to every object looked gross.
- When you put the `new` keyword before the Donut() function call, two things happen.
  - The object is created automatically, so you don’t need to return it from Donut. (It becomes available as `this`.)
  - That object’s **proto** will be set to whatever you put into the function’s prototype property.
- A function’s prototype property lets you configure the **proto** of the objects that you get with new calls.

```js
function Donut() {
  this.shape = "round";
}
Donut.prototype = {
  eat() {
    console.log("Nom nom nom");
  },
};

let donut1 = new Donut(); // __proto__: Donut.prototype
let donut2 = new Donut(); // __proto__: Donut.prototype

donut1.eat();
donut2.eat();
```

- In modern code, you would usually write a class with a constructor instead.

```js
class Donut {
  constructor() {
    this.shape = "round";
  }
  eat() {
    console.log("Nom nom nom");
  }
}

let donut1 = new Donut(); // __proto__: Donut.prototype
let donut2 = new Donut(); // __proto__: Donut.prototype

donut1.eat();
donut2.eat();
```

##

```js
// JavaScript class rewritten with __proto__ for a comparison.
class Spiderman {
  lookOut() {
    alert("My Spider-Sense is tingling.");
  }
}

let miles = new Spiderman();
miles.lookOut();

// class Spiderman {
let SpidermanPrototype = {
  lookOut() {
    alert("My Spider-Sense is tingling.");
  },
};

// let miles = new Spiderman();
let miles = { __proto__: SpidermanPrototype };
miles.lookOut();
```

## Recap

- When reading `obj.something`, if obj doesn’t have a something property, JS will look for obj.**proto**.something. Then it will look for obj.**proto**.**proto**.something, and so on, until it either finds our property or reaches the end of the `prototype chain`.
- When writing to `obj.something`, JS will usually write to the object directly instead of traversing the prototype chain.
- We can use `obj.hasOwnProperty('something')` to determine whether our object has its own property called something.
- We can “pollute” a prototype shared by many objects by mutating it. We can even do this to the Object Prototype—the default prototype for `{}` objects! (But we shouldn’t, unless we’re pranking our colleagues.)
- You probably won’t use prototypes much directly in practice. However, they are fundamental to JS objects, so it is handy to understand their underlying mechanics. Some advanced JS features, including classes, can be expressed in terms of prototypes.
