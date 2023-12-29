---
title: "Typescript"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Typescript"]
draft: false
description: "Introduction to Typescript"
---

## Introduction

- Superset of JS.
- Add static type to JS.
- We can use type annotations on variables for eg, `let myAge: number;`
- In the output `js` file, the types are removed/erased.
- Type annotations never change the runtime behavior of your program.
- `noImplicitAny`: When true, ts will issue an error whenever it would have inferred `any`.
- `strictNullChecks`: When true, `null` and `undefined` have their own distinct types and you’ll get a type error if you try to use them where a concrete value is expected.

## Downlevelling

- The process of moving from a newer or “higher” version of ECMAScript down to an older or “lower” one is called `downleveling`.

## Running a ts file

- Install typescript `npm install -g typescript`.
- `npx tsc filename.ts`: If you’d prefer to run tsc from a local `node_modules` package instead.
- `tsc filename.ts`: If you want to tsc from global installation.

## The primitive types

- `string`: It represents string values like `"Hello, world"`.
- `number`: It is for numbers like `42`.
- `boolean`: It is for the two values `true` and `false`.

## Complex types: arrays and objects

- For eg. `number[]`, `string[]`, boolean[] etc. Alternatively `Array<number>`, `Array<string>`, `Array<boolean>`.
- Represented as `T<U>` using generics.

## Any type

- Special ts type, you can use whenever you don’t want a particular value to cause typechecking errors.
- You can access any properties of it (which will in turn be of type any), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal.
- It is assumed you know the environment better than TypeScript.
- When you don’t specify a type, and ts can’t infer it from context, the compiler will typically default to `any`.
- You usually want to avoid this, though, because `any` isn’t type-checked. Use the compiler flag `noImplicitAny` to flag any "implicit" `any` as an error.

```javascript
let person: {
  name: string,
  age: number,
};
```

## TS and functions

- When a parameter has a type annotation, arguments to that function will be checked.
- Even if there is no annotations on parameters, ts will still check if the right number of arguments were passed.

## Anonymous functions

- When a function appears in a place where ts can determine how it’s going to be called, the parameters of that function are automatically given types.
- This process is called `contextual typing` because the context that the function occurred within informs what type it should have.

```javascript
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing also applies to arrow functions
names.forEach(s => {
  console.log(s.toUppercase());
  // Property 'toUppercase' does not exist on type 'string'.
  // Did you mean 'toUpperCase'?
});
```

## Object Types

- This refers to any JavaScript value with properties, which is almost all of them! To define an object type, we simply list its properties and their types.
- The type part of each property is also optional. If you don’t specify a type, it will be assumed to be any.
- Object types can also specify that some or all of their properties are optional. To do this, add a `?` after the property name.

```javascript
// The parameter's type annotation is an object type
// You can use , or ; to separate the properties,
// and the last separator is optional either way.
function printCoord(pt: { x: number, y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

## Accessing properties in javascript

- In JavaScript, if you access a property that doesn’t exist, you’ll get the value `undefined` rather than a runtime error.
- Because of this, when you read from an optional property, you’ll have to check for `undefined` before using it.
- A safe alternative is using modern JavaScript syntax, `?`.

## Union Types

- TypeScript’s type system allows you to build new types out of existing ones using a large variety of `operators`.
- A union type is a type formed from two or more other types, representing values that may be any one of those types.
- We refer to each of these types as the union’s `members`.

## Working with union types

- Ts will only allow an operation if it is valid for every member of the union. For example, if you have the union `string | number`, you can’t use methods that are only available on string.
- The solution is to `narrow` the union with code by using `if` checks.

## Finding the types of a variable

- For primitive types, we use `typeof` operator to find it's type.
- For arrays, we use `Array.isArray(x)`.

## Type Aliases

- When we want to use `object` and `union` types more than once it is convinient to use type aliases.
- Type alises are name for any type.

```javascript
type Point = {
  x: number,
  y: number,
};

type ID = number | string;

interface Point {
  x: number;
  y: number;
}
```

## Interfaces

- An `interface declaration` is another way to name an `object` type.

- One such operator is `union` (`|`).

- Array of object type.

- Type inference in ts.

- Using union types in ts. Use |.

## Type aliases

```javascript
type person = {
  name: string,
  age: number,
};
```

## Differences Between Type Aliases and Interfaces

- Key distinction is that a `type` cannot be re-opened to add new properties vs an `interface` which is always extendable.
- If you would like a heuristic, use interface until you need to use features from type.
- You should prefer `interface`. Use `type` when you need specific features.
- type aliases, unlike interfaces, can describe more than just object types.

## Extending an interface

```javascript
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

// getBear() gives Bear type
const bear = getBear();
bear.name;
bear.honey;
```

## extending a type via intersections

```javascript
type Animal = {
  name: string,
};

type Bear = Animal & {
  honey: boolean,
};

// getBear() gives Bear type
const bear = getBear();
bear.name;
bear.honey;
```

## Adding new fields to an existing interface

```javascript
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

## A type cannot be changed after being created

```javascript
type Window = {
  title: string,
};

type Window = {
  ts: TypeScriptAPI,
};

// Error: Duplicate identifier 'Window'.
```

## Type Assertions

- Sometimes you will have information about the type of a value that TypeScript can’t know about.
- Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.
- Ts only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like.
- `const x = "hello" as number;`
- Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions, first to any (or unknown), then to the desired type: `const a = (expr as any) as T;`

```javascript
// Ts knows that this will return some kind of HTMLElement,
// but you know that your page will always have an
// HTMLCanvasElement with a given ID
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// You can also use the angle-bracket syntax
// (except if the code is in a .tsx file)
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

## Literal Types

- In addition to the general types `string` and `number`, we can refer to specific strings and numbers in type positions.
- But by combining literals into unions, you can express a much more useful concept - for eg, functions that only accept a certain set of known values.
- You can combine these with non-literal types.
- `boolean literals`: There are only two boolean literal types, `true` and `false`. The type boolean itself is actually just an alias for the union `true | false`.

```javascript
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

interface Options {
  width: number;
}

function configure(x: Options | "auto") {
  // ...
}
```

## Literal inference

```javascript
// Argument of type 'string' is not assignable to parameter
// of type '"GET" | "POST"'.
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);

// Solution 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Solution 2
handleRequest(req.url, req.method as "GET");
// Solution 3:
const req = { url: "https://example.com", method: "GET" } as const
```

## null and undefined

- `strictNullChecks off`: Values that might be null or undefined can still be accessed normally, and the values null and undefined can be assigned to a property of any type. This setting is not recommended as it is major source of bugs.
- `strictNullChecks on`: When a value is null or undefined, you will need to test for those values before using methods or properties on that value.
- Use `!` when you know that the value can’t be null or undefined.

## Non-null Assertion Operator (Postfix !)

- Writing `!` after any expression is effectively a type assertion that the value isn’t `null` or `undefined`.
- It is used for removing `null` and `undefined` from a type without doing any explicit checking.

## Enums

- Not used often.

# Less Common Primitives

## bigint

- From ES2020 onwards, there is a primitive in JavaScript used for very large integers, `BigInt`.

```javascript
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```

## symbol

- primitive in JavaScript used to create a `globally unique reference` via the function `Symbol()`.

```javascript
const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {
  // This condition will always return 'false'
  // since the types 'typeof firstName' and
  // 'typeof secondName' have no overlap.
  // Can't ever happen
}
```

# Narrowing

- `Type guard`: Special checks in the code that helps ts to narrow down the types to more specific type than declared.
- `Narrowing`: It is the process of refining types to more specific types than declared.

## Different constructs TypeScript understands for narrowing

- `typeof` typegaurd.
- Truthiness narrowing.
- Equality narrowing.
- The `in` operator narrowing.
- `instanceof` narrowing.
- Assignments.

## `typeof` typegaurd

- In TypeScript, checking against the value returned by `typeof` is a type guard. `typeof` operator returns following strings. Notice that `typeof` doesn’t return the string `null`. In JS arrays are `objects` and `typeof` `null` is `object`.
  - `string`
  - `number`
  - `bigint`
  - `boolean`
  - `symbol`
  - `undefined`
  - `object`
  - `function`

## Truthiness narrowing

- In JS, we can use any expression in conditionals, `&&`, `||`, `if` statements, Boolean negations (`!`), and more. As an example, `if` statements don’t expect their condition to always have the type `boolean`.

- In JS, conditionals first `coerce` their conditionals to `boolean` to make sense of them and then chose their branches depending on whether the result is `true or `false`. Following values are coerced to `false`.
  - `0`
  - `NaN`
  - `""` (the empty string)
  - `0n (the bigint version of zero)`
  - `null`
  - `undefined`

```javascript
// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true, value: true

function printAll(strs: string | string[] | null) {
  // null and array type removed in this conditional
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

## Equality narrowing

- Ts uses `switch` statements and equality checks like `===`, `!==`, `==`, and `!=` to narrow types.

- Lose checking (`==`,`!=`): Whether something `== null` actually not only checks whether it is specifically the value `null`, it also checks whether it’s potentially `undefined`. The same applies to `== undefined`, it checks whether a value is either `null` or `undefined`.

```javascript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    // (method) String.toUpperCase(): string
    x.toUpperCase();

    // (method) String.toLowerCase(): string
    y.toLowerCase();
  } else {
    // (parameter) x: string | number
    console.log(x);

    // (parameter) y: string | boolean
    console.log(y);
  }
}
```

## The `in` operator narrowing

- Ts takes `in` operator into account as a way to narrow down potential types

```JavaScript
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  // Notice that "human" type show up in
  // both sides of the "in" check
  if ("swim" in animal) {
  // (parameter) animal: Fish | Human
    animal;
  } else {
   // (parameter) animal: Bird | Human
    animal;
  }
}
```

## `instanceof` narrowing

- In JS `x instanceof Foo` checks whether the `prototype chain` of `x` contains `Foo.prototype`.
- `instanceof` is also a type guard, and TypeScript narrows in branches guarded by `instanceof`.

```javascript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    // (parameter) x: Date
    console.log(x.toUTCString());
  } else {
    // (parameter) x: string
    console.log(x.toUpperCase());
  }
}
```

## Assignments

- Ts looks at the right side of the assignment and narrows the left side appropriately.

```javascript
// type is "let x: string | number"
let x = Math.random() < 0.5 ? 10 : "hello world!";

// Narrowed to let x: number
x = 1;

// Narrowed to let x: string
x = "goodbye!";

// Error: Type 'boolean' is not assignable to
// type 'string | number'.
x = true;
```

## Control flow analysis

- The analysis of code based on `reachability` is called `control flow analysis`, and TypeScript uses this flow analysis to narrow types as it encounters type guards and assignments

```javascript
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    // If padding is number then this function
    // will return
    return " ".repeat(padding) + input;
  }
  // This code is not 'reachable' if padding
  // has number as one of it's types.
  // Ts analyzed and removed 'number' from
  // type of padding in this branch of code.
  return padding + input;
}
```

## Using type predicates

- These are user-defined type guards, we simply need to define a function whose return type is a `type predicate`.
- `type predicate`: It takes the form `parameterName is Type`. Any time isFish is called with some variable, Ts will narrow that variable to that specific type if the original type is compatible.

```javascript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  // pet is a Fish
  pet.swim();
} else {
  // pet is not a Fish, only other
  // option is Bird type
  pet.fly();
}

// You may use the type guard isFish to filter an
// array of 'Fish | Bird' and obtain an 'array of Fish'
const zoo: (Fish | Bird)[] =
    [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```

## Discriminated unions

- When every type in a union contains a `common property` with `literal types`, TypeScript considers that to be a `discriminated union`, and can narrow out the members of the union.
- Discriminated unions works well in switch statements, with the switch on the common property.
- They’re good for representing any sort of messaging scheme in JS, like when sending messages over the network (client/server communication), or encoding mutations in a state management framework.

```javascript
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    // Ts doesn't know that circle type has radius
    // Object is possibly 'undefined'.
    return Math.PI * shape.radius ** 2;
  }
}

// Solution to above is "discriminated union"
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

// Shape is a dsicriminated union
type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    // (parameter) shape: Circle
    return Math.PI * shape.radius ** 2;
  }
}
```

## The `never` type

- When narrowing, you can reduce the options of a union to a point where you have removed all possibilities and have nothing left. In those cases, ts will use a `never` type to represent a state which shouldn’t exist.

- The never type is assignable to every type; however, no type is assignable to never (except never itself).

## Exhaustiveness checking using `never`

```javascript
// Adding a new member to the Shape union,
// will cause a TypeScript error
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      // Type 'Triangle' is not assignable to type 'never'.
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

# function and function types

- The simplest way to describe a function is with a `function type expression`. These types are syntactically similar to arrow functions.

```javascript
// Note that the parameter name is required.
// You can also use type aliases to name
// a function type
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

- Functions are also values, and just like other values, Ts has many ways to describe how functions can be called.

- Return type of a function can be inferred.

## Call Signatures

- In JS, functions can have properties in addition to being callable.
- To describe this type in Ts, we write a `call signature` in an object type.

```javascript
type DescribableFunction = {
  description: string,
  // Note the syntax, use ':' between the parameter
  // list and the return type rather than '=>'
  // Call signature
  (someArg: number): boolean,
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// You can combine call and construct signatures
// in the same type arbitrarily. Suitable for objects
// like Date which can be called with or without 'new'
interface CallOrConstruct {
  new(s: string): Date;
  (n?: number): number;
}
```

## Construct Signatures

- In Js functions can also be invoked with the `new` operator.
- Ts refers to these as `constructors` because they usually create a new object.
- You can write a `construct signature` by adding the `new` keyword in front of a call signature:

```javascript
type SomeConstructor = {
  // Construct Signature
  new(s: string): SomeObject,
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

## Generic Functions

- These are used where types of the input relate to the type of the output, or where the types of two inputs are related in some way.
- In Ts, `generics` are used when we want to describe a correspondence between two values. We do this by declaring a type parameter in the function signature.

```javascript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// Note that we didn’t have to specify Type in this sample
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

## Constraints

- We can use a constraint to limit the kinds of types that a type parameter can accept.

```javascript
// Ts can infer the return type of generic functions also
// Cnstraint on Type to have a length property of type number
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

## Specifying Type Arguments in generics

```javascript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// Type 'string' is not assignable to type 'number'.
// Ts unable to infer the arg type
const arr = combine([1, 2, 3], ["hello"]);

// Correct way to call the generic function
// by specifying the type
const arr = (combine < string) | (number > ([1, 2, 3], ["hello"]));
```

## Guidelines for Writing Good Generic Functions

- Push Type Parameters Down: When possible, use the type parameter itself rather than constraining it.
- Use Fewer Type Parameters: Always use as few type parameters as possible.
- Type Parameters Should Appear Twice: If a type parameter only appears in one location, strongly reconsider if you actually need it.

## Optional Parameters

```javascript
// Use of '?' to specify optional arguments
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```

## Optional Parameters in Callbacks

- When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument.

## Function Overloads

- In Ts, we can specify a function that can be called in different ways by writing overload signatures.
- To do this, write some number of `function signatures`, followed by the body of the function.
- The signature of the implementation is not visible from the outside. When writing an overloaded function, you should always have two or more signatures above the implementation of the function.
- The implementation signature must also be compatible with the overload signatures.
- Always prefer parameters with union types instead of overloads when possible.

```javascript
// overload signature#1
function makeDate(timestamp: number): Date;
// overload signature#2
function makeDate(m: number, d: number, y: number): Date;
// implementation signature
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// No overload expects 2 arguments, but overloads
// do exist that expect either 1 or 3 arguments.
const d3 = makeDate(1, 3);
```

## Declaring this in a Function

## Other Types to Know About

- `void`: void represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any return statements, or doesn’t return any explicit value from those return statements.

- **Note**: In JS, a function that doesn’t return any value will implicitly return the value `undefined`. However, void and undefined are not the same thing in TypeScript.

- `object`: The special type object refers to any value that isn’t a primitive (string, number, bigint, boolean, symbol, null, or undefined). This is different from the empty object type { }, and also different from the global type Object. It’s very likely you will never use Object

```javascript
// The inferred return type is void
function noop() {
  return;
}
```

- `unknown`: The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value.

- `never`: Some functions never return a value.

```javascript
function fail(msg: string): never {
  throw new Error(msg);
}
```

- `Function`: The global type Function describes properties like bind, call, apply, and others present on all function values in JS. It also has the special property that values of type Function can always be called; these calls return `any`.

# Rest Parameters and Arguments

- `Rest Parameters`: We can define functions that take an unbounded number of arguments using `rest parameters`. Rest parameter appears after all other parameters, and uses the `...` syntax.
- In Ts, the type annotation on these parameters is implicitly any[] instead of any, and any type annotation given must be of the form `Array<T>or T[]`, or a tuple type.

```javascript
function multiply(n: number, ...m: number[]) {
  return m.map(x => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

- `Rest Arguments`: We can provide a variable number of arguments from an array using the spread syntax. Ts does not assume that arrays are immutable. This can lead to some surprising behavior.

```javascriptconst arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5]
// A spread argument must either have a tuple type
// or be passed to a rest parameter.
const angle = Math.atan2(...args)

// Fix for above scenario
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

## Parameter Destructuring

- You can use parameter destructuring to unpack objects provided as an argument into one or more local variables in the function body.

```javascript
// Parameter Destructuring of arguments passed to
// the function
type ABC = { a: number, b: number, c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```

## Assignability of Functions

- A contextual function type with a void return type (type vf = () => void), when implemented, can return any other value, but it will be ignored.

- when a literal function definition has a void return type, that function must not return anything.

```javascript
type voidFunc = () => void;

// Return value will be ingnored
const f1: voidFunc = () => {
  return true;
};
// Return value will be ingnored
const f2: voidFunc = () => true;
// Return value will be ingnored
const f3: voidFunc = function () {
  return true;
};

// Following variables will be of type void
const v1 = f1();
const v2 = f2();
const v3 = f3();

// literal function definition has a void return type
function f2(): void {
  // @ts-expect-error
  return true;
}

// literal function definition has a void return type
const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```

## Object types

- In Ts we represent data as objects.
- Objects can be `anonymous` or named by using either an `interface` or `type alias`.

```javascript
// anonymous object
function greet(person: { name: string, age: number }) {
  return "Hello " + person.name;
}
```

## Property Modifiers

- Property in an object type can specify a type, whether it is optional and whether the property can be written to.

## Optional Properties

- Marked by adding a question mark, `?`.
- There is currently no way to place type annotations within `destructuring patterns`. This is because the following syntax already means something different in JavaScript.

```javascript
// In an object destructuring pattern, 'shape: Shape'
// means grab the property shape and redefine it
// locally as a variable named Shape
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  // Cannot find name 'shape'. Did you mean 'Shape'?
  render(shape);
  // Cannot find name 'xPos'.
  render(xPos);
```

## readonly Properties

- Properties can also be marked as readonly for Ts. While it won’t change any behavior at runtime, a property marked as readonly can’t be written to during type-checking.

- Ts doesn’t factor in whether properties on two types are readonly when checking whether those types are compatible.

```javascript
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  // Cannot assign to 'prop' because it is a
  // read-only property.
  obj.prop = "hello";
}
```

## Index Signatures

- Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values.
- In those cases you can use an `index signature` to describe the types of possible values.
- An index signature property type must be either ‘string’ or ‘number’.
- you can make index signatures readonly in order to prevent assignment to their indices.

```javascript
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
// const secondItem: string
const secondItem = myArray[1];
```

## Extending Types

- We can have types that are more specific versions of other types.
- The `extends` keyword on an `interface` allows us to copy members from other named types, and add the new members.
- Interfaces can also extend from multiple types.

```javascript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
// Add the new fields that are unique to 'AddressWithUnit'
interface AddressWithUnit extends BasicAddress {
  unit: string;
}

interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

// extending from multiple interfaces
interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

## Intersection Types

- Ts provides construct called intersection types that is used to combine existing `object` types.
- An `intersection` type is defined using the `&` operator.

```javascript
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

## Interfaces vs. Intersections

- The principle difference is how conflicts are handled, and that is the main reason why you’d pick one over the other between an interface and a type alias of an intersection type.
- Both `interface` and `type` aliases can be generic.

## Generic Object Types

- Used to build reusable types.
- We can avoid overloads by using generic functions.

```javascript
interface Box<Type> {
  contents: Type;
}

let box: Box<string>;

interface Apple {
  // ....
}

// Same as '{ contents: Apple }'.
type AppleBox = Box<Apple>;

// type aliases can also be generic
type Box<Type> = {
  contents: Type,
};
```

## Array Type

- `Array` is a generic type.
- `number[]` or `string[]`, are just a shorthand for `Array<number>` and `Array<string>`.
- Other generic types are `Map<K, V>`, `Set<T>`, and `Promise<T>`.
- Unlike the `readonly` property modifier, assignability isn’t bidirectional between regular Arrays and ReadonlyArrays.

## ReadonlyArray Type

- `ReadonlyArray` is a special type that describes arrays that shouldn’t be changed.
- We can read from 'values' but we can't mutate 'values', for eg using `push`.
- Unlike Array, there isn’t a ReadonlyArray constructor that we can use. Instead, we can assign regular Arrays to ReadonlyArrays.
- Ts provides a shorthand syntax for `ReadonlyArray<Type>` with `readonly Type[]`.

```javascript
// Error: 'ReadonlyArray' only refers to a type,
but is being used as a value here.
new ReadonlyArray("red", "green", "blue");
// Correct way to initialize a readonly array
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

let x: readonly string[] = [];
let y: string[] = [];

x = y;
// Error: The type 'readonly string[]' is 'readonly'
// and cannot be assigned to the mutable type 'string[]'.
y = x;
```

## Tuple Types

- A tuple type is an Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
- Like ReadonlyArray, it has no representation at runtime, but is significant to Ts.
- If we try to index past the number of elements, we’ll get an error.
- We can also destructure tuples using JavaScript’s array destructuring.
- Tuples gives us flexibility in whatever we want to name our variables when we destructure them. This is unlike using objects with descriptive property names. Choice is upto us when developing APIs.
- Tuples can have optional properties by using question mark (? after an element’s type). Optional tuple elements can only come at the end, and also affect the type of length.

```typescript
// tuple type of string and number whose 0 index
// contains a string and 1 index contains a number.
type StringNumberPair = [string, number];

type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  // const z: number | undefined
  const [x, y, z] = coord;
  // (property) length: 2 | 3
  console.log(`Provided coordinates had ${coord.length} dimensions`);
}

// first two elements are string and number respectively,
// but which may have any number of booleans following.
type StringNumberBooleans = [string, number, ...boolean[]];
// first element is string and then any number of booleans
// and ending with a number.
type StringBooleansNumber = [string, ...boolean[], number];
// tarting elements are any number of booleans and ending
// with a string then a number.
type BooleansStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// Useful when you don’t want to introduce intermediate variables/params.
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}

// Equivalent to above
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
```

## readonly Tuple Types

- Tuples types have readonly variants, and can be specified by sticking a `readonly` modifier in front of them.
- Array literals with const assertions will be inferred with readonly tuple types.

# Creating Types from Types

- TypeScript’s type system is very powerful because it allows expressing types in terms of other types.

  - `Generics`: Types which take parameters.
  - `Keyof Type Operator`: Using the keyof operator to create new types.
  - `Typeof Type Operator`: Using the typeof operator to create new types.
  - `Indexed Access Types`: Using Type['a'] syntax to access a subset of a type.
  - `Conditional Types`: Types which act like if statements in the type system.
  - `Mapped Types`: Creating types by mapping each property in an existing type.
  - `Template Literal Types`: Mapped types which change properties via template literal strings.

## Generics

- We can create a generic function using `any` type, but we will lose the information about the type of the parameter.
- In a generic, we use a type variable `Type`, which capture the type the user provides.
- `type argument inference`: We let the compiler to set the value of Type for us automatically based on the type of the argument we pass in a generic.

```javascript
// Genric function
function identity<Type>(arg: Type): Type {
  return arg;
}
// Method#1 to call a generic function.
let output = `identity<string>('myString')`;
// Method#2 ro call a generic funtion.
let output = identity("myString");
```

## Generic Types

```javascript
// Interface with generic function
interface GenericIdentityFn {
  // call signature
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;

// Genric interface
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

## Generic Classes

- A generic class has a similar shape to a generic interface.
- Class has two sides to its type: the `static side` and the `instance side`.
- Generic classes are only generic over their `instance side` rather than their static side, so when working with classes, static members can not use the class’s type parameter.

```javascript
class GenericNumber<NumType> {
  zeroValue: NumType;
  // call signature
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

## Generic Constraints

```javascript
// Adding a contraint to generic type.
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  // Now we know it has a .length property, so no more error
  console.log(arg.length);
  return arg;
}
```

## Using Type Parameters in Generic Constraints

- You can declare a type parameter that is constrained by another type parameter.

```javascript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

## Using Class Types in Generics

- When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions.

```javascript
function create<Type>(c: { new(): Type }): Type {
  return new c();
}
```

## Keyof Type Operator

- The `keyof` operator takes an object type and produces a string or numeric literal union of its keys.

```javascript
type Point = { x: number; y: number };
// type P = keyof Point
type P = keyof Point;

```

## AutoComplete in VSCode

- `Ctrl+space`

- The arguments to a functions must be typed to avoid implicit any error.

## type vs interface

-

## Optional function arguments

- Must come after the mandatory args.

## Array types

- `Post[]` or `Array<Post>`

## Casting in TS

- By using 'as' keyword.
- Should not be used often.

## Set generic

## Map generic

## Record type

```ts
Record<string, string>
// Or
{
  [id:string]: string;
}
```

## Narrowing down Union types

## Typing errors in try-catch

```ts
....
catch(e) {
  if (e instanceof Error) {
    return e.message;
  }
}
```

## Inheriting interface properties

- Use extends.
- Can extend multiple interfaces.

## Combining types to create new types

- Use `&` operator on interfaces.

## Selectively Construct Types from Other Types

- Use `Pick<Type, Keys>` or `Omit<Type, Keys>`.

## Typing Functions

## Typing Async Functions
