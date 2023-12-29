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

## TS article by Zhenghao He

> See discussions on [Hacker News](https://news.ycombinator.com/item?id=30173375)

## Types are a complex language of their own

I used to think of TypeScript as just JavaScript with type annotations sprinkled on top of it. With that mindset, I often found writing correct types tricky and daunting, to a point they got in the way of building the actual applications I wanted to build, and frequently, it led me to reach for `any`. And with `any`, I lose all type safety.

Indeed, types can get really complicated if you let them. After writing TypeScript for a while, it occurred to me that the TypeScript language actually consists of two sub-languages - one is JavaScript, and the other is the type language:

- for the JavaScript language, the world is made of JavaScript values
- for the type language, the world is made of types

When we write TypeScript code, we are constantly dancing between these two worlds: we create types in our type world and "summon" them in our JavaScript world using type annotations (or have them implicitly inferred by the compiler); we can go in the other direction too: use TypeScript's [typeof operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html#the-typeof-type-operator) on JavaScript variables/properties to retrieve the corresponding types (not the `typeof` operator JavaScript provides to check runtime values' types).

![alt](/static/images/typescript/twoworlds.png)

The JavaScript language is very expressive, so is the type language - in fact, the type language is so expressive that it has been proven to be Turing complete.

Here I don't make any value judgment of whether being Turing complete is good or bad, nor do I know if it is even by design or by accident (in fact, often times, Turing-completeness was achieved [by accident](http://beza1e1.tuxen.de/articles/accidentally_turing_complete.html)). My point is the type language itself, as innocuous as it seems, is certainly powerful, highly capable and can perform arbitrary computation at compile time.

When I started to think of the type language in TypeScript as a full-fledged programming language, I realized it even has a few characteristics of a functional programming language:

1. use recursion instead of iteration
   1. in [TypeScript 4.5](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#tailrec-conditional) we have tail call optimized recursion (to some extent)
2. types (data) are immutable

In this post, we will learn the type language in TypeScript by comparing it with JavaScript so that you can leverage your existing JavaScript knowledge to master TypeScript quicker.

> This post assumes that readers have some familiarity with JavaScript and TypeScript. And if you want to learn TypeScript from scratch properly, you should start with [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html). I am not here to compete with the docs.

## Variable declaration

In JavaScript, the world is made of JavaScript values, and we declare variables to refer to values using keywords `var`, `const` and `let`. For example:

```javascript
const obj = { name: "foo" };
```

In the type language, the world is made of types, and we declare type variables using keywords `type` and `interface`. For example:

```typescript
type Obj = { name: string };
```

> A more accurate name for “type variables” is type synonyms or type alias. I use the word "type variables" to draw an analogy to how a JavaScript variable references a value.
>
> It is not a perfect analogy though, a type alias doesn’t create or introduce a new type—they are only a new name for existing types. But I hope drawing this analogy makes explaining concepts of the type language much easier.

Types and values are very related. A type, at its core, represents the set of possible values and the valid operations that can be done on the values. Sometimes the set is finite, e.g., `type Name = 'foo' | 'bar'`, a lot of times the set is infinite, e.g., `type Age = number`. In TypeScript we integrate types and values and make them work together to ensure that the runtime values match the compile-time types.

### Local variable declaration

We talked about how you can create type variables in the type language. However, the type variables have a global scope by default. To create a local type variable, we can use the `infer` keyword in our type language.

```typescript
type A = "foo"; // global scope
type B = A extends infer C
  ? C extends "foo"
    ? true
    : false // *only* inside this expression, C represents A
  : never;
```

Although this particular way of creating scoped variables might seem strange to JavaScript developers, it actually finds its roots in some pure functional programming languages. For example, in Haskell, we can use the `let` keyword with `in` to perform scoped assignments as in `let {assignments} in {expression}`:

```Haskell
let two = 2; three = 3 in two * three
//                         ↑       ↑
// two and three are only in scope for the expression `two * three`
```

<details>
    <summary><b>`infer` is useful for caching some intermediate types</b></summary>
    <p>Here is an example:</p>
        ```typescript
        type ConvertFooToBar<G> = G extends 'foo' ? 'bar' : never
        type ConvertBarToBaz<G> = G extends 'bar' ? 'baz' : never

        type ConvertFooToBaz<T> = ConvertFooToBar<T> extends infer Bar ?
                Bar extends 'bar' ? ConvertBarToBaz<Bar> : never
            : never

        type Baz = ConvertFooToBaz<'foo'>
        ```

        Without `infer` to create a local type variable `Bar`, we have to calculate `Bar` twice:

        ```typescript
        type ConvertFooToBar<G> = G extends 'foo' ? 'bar' : never
        type ConvertBarToBaz<G> = G extends 'bar' ? 'baz' : never

        type ConvertFooToBaz<T> = ConvertFooToBar<T> extends 'bar' ?
            ConvertBarToBaz<ConvertFooToBar<T> > : never // call `ConvertFooToBar` twice

        type Baz = ConvertFooToBaz<'foo'>
        ```

</details>

## Equality comparisons and conditional branching

In JavaScript. we can use `===`/`==` with if statement or the conditional (ternary) operator `?` to perform equality check and conditional branching.

In the type language, on the other hand, we use the `extends` keyword for "equality check", and the conditional (ternary) operator `?` for conditional branching too as in:

```typescript
    TypeC = TypeA extends TypeB ? TrueExpression : FalseExpression
```

If `TypeA` is assignable or substitutable to `TypeB`, then we enter the first branch and get the type from `TrueExpression` and assign that to `TypeC` ; otherwise we get the type from `FalseExpression` as a result to `TypeC`.

> The concept of assignability/substitutability is one of the core concepts in TypeScript that deserves a separate post - I wrote [one covering that in detail](/posts/type-hierarchy-tree).

A concrete example in JavaScript:

```javascript
const username = "foo";
let matched;

if (username === "foo") {
  matched = true;
} else {
  matched = false;
}
```

Translate it into the type language:

```typescript
type Username = "foo";
type Matched = Username extends "foo" ? true : false; // true
```

The `extends` keyword is versatile. It can also apply constraints to generic type parameters. For example:

```typescript
function getUserName<T extends { name: string }>(user: T) {
  return user.name;
}
```

By adding the generic constraints, `<T extends {name: string}>` we ensure the argument our function takes always consist of a `name` property of the type `string`.

## Retrieve types of properties by indexing into object types

In JavaScript we can access object properties with square brackets e.g. `obj['prop']` or the dot operator e.g., `obj.prop`.

In the type language, we can extract property types with square brackets as well.

```typescript
type User = { name: string; age: number };
type Name = User["name"];
```

This works not just with object types, we can also index the type with tuples and arrays.

```typescript
type Names = string[];
type Name = Names[number];

type Tuple = [string, number];
type Age = Tuple[1];
```

## Functions

Functions are the main reusable “building blocks” of any JavaScript program. They take some input (some JavaScript values) and return an output (also some JavaScript values).
In the type language, we have generics. Generics **parameterize** types like functions **parameterize** value. Therefore, a generic is conceptually similar to a function in JavaScript.

For example, in JavaScript:

```javascript
function fn(a, b = "world") {
  return [a, b];
}
const result = fn("hello"); // ["hello", "world"]
```

For our type language, we have:

```typescript
type Fn<A extends string, B extends string = "world"> = [A, B];
//   ↑    ↑           ↑                          ↑              ↑
// name parameter parameter type          default value   function body/return statement

type Result = Fn<"hello">; // ["hello", "world"]
```

<details>
    <summary><b>this is still not a perfect analogy though...</b></summary>
    <p>Generics are by no means exactly the same as JavaScript's functions. For one, unlike functions in JavaScript, Generics are not first-class citizens in the type language. That means we cannot pass a generic to another generic like we pass a function to another function as TypeScript doesn't allow [generics as type parameters](https://github.com/microsoft/TypeScript/issues/1213).</p>
</details>

### Map and filter

In our type language, types are immutable. If we want to modify a part of a type, we have to transform the existing ones into **new types**. In the type language, the details of iterating over a data structure (i.e. an object type) and applying transformations evenly are abstracted away by [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html). We can use it to implement operations that are conceptually similar to the map and filter array methods in JavaScript.

In JavaScript, let's say we want to transform an object's properties from numbers to strings:

```javascript
const user = {
  name: "foo",
  age: 28,
};

function stringifyProp(object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, String(value)])
  );
}

const userWithStringProps = stringifyProp(user); // {name:'foo', age: '28'}
```

In the type language, the mapping is done using this syntax `[K in keyof T]` where the `keyof` operator gives us property names as a string union type.

```typescript
type User = {
  name: string;
  age: number;
};

type StringifyProp<T> = {
  [K in keyof T]: string;
};

type UserWithStringProps = StringifyProp<User>; // { name: string; age: string; }
```

In JavaScript, we can filter out the properties of an object based on some critiria. For example, we can filter out all non-string properties:

```javascript
const user = {
  name: "foo",
  age: 28,
};

function filterNonStringProp(object) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([key, value]) => typeof value === "string" && [key, value]
    )
  );
}

const filteredUser = filterNonStringProp(user); // {name: 'foo'}
```

In our type language, this can be achieved with the `as` operator and the `never` type:

```typescript
type User = {
  name: string;
  age: number;
};

type FilterStringProp<T> = {
  [K in keyof T as T[K] extends string ? K : never]: string;
};

type FilteredUser = FilterStringProp<User>; // { name: string }
```

There are a bunch of builtin [utility “functions”](https://www.typescriptlang.org/docs/handbook/utility-types.html) (generics) for transforming types in TypeScript so often times you don't have to re-invent the wheels.

## Pattern matching

We can also use the `infer` keyword to perform pattern matching in the type language.

For example, in a JavaScript program, we can use regex to extract a part of a string:

```javascript
const str = "foo-bar".replace(/foo-*/, "");
console.log(str); // 'bar'
```

The equivalence in our type language:

```typescript
type Str = "foo-bar";
type Bar = Str extends `foo-${infer rest}` ? rest : never; // 'bar'
```

## Recursion, instead of iteration

Just like many pure functional programming languages out there, in our type language, there is no syntactical construct for for loop to iterate over a list of data. Recursion take the place of loops.

Let's say in JavaScript, we want to write a function to return an array with same item repeated multiple times. Here is one possible way you can do that:

```javascript
function fillArray(item, n) {
  const res = [];
  for (let i = 0; i < n; i++) {
    res[i] = item;
  }
  return res;
}
```

The recursive solution would be:

```javascript
function fillArray(item, n, array = []) {
  return array.length === n ? array : fillArray(item, n, [item, ...array]);
}
```

How do we write out the equivalence in our type language? Here are logical steps to arrive at one solution:

1. create a generic type called `FillArray` (remember we talked about that generics in our type language are just like functions?)
   ```typescript
       FillArray<Item, N extends number, Array extends Item[] = []>
   ```
2. Inside the "function body", we need to check if the `length` property on `Array` is already `N` using the `extends` keyword.
   - if it has reached to `N` (the base case), then we simply return `Array`
   - if it hasn't reached to `N`, it recurses and added one more `Item` into `Array`

Putting these together, we have:

```typescript
type FillArray<
  Item,
  N extends number,
  Array extends Item[] = []
> = Array["length"] extends N ? Array : FillArray<Item, N, [...Array, Item]>;

type Foos = FillArray<"foo", 3>; // ["foo", "foo", "foo"]
```

### Limits for recursion depth

Before TypeScript 4.5, the max recursion depth is [45](https://www.typescriptlang.org/play?ts=4.4.4&ssl=3&ssc=10&pln=3&pc=17#code/C4TwDgpgBAShkENgDkA8BJYEC2AaKyUEAHlgHYAmAzlGQK7YBGEATvgCp1gA20J51KAjIgA2gF0oAXigSAfNKiceEUQHJeZAObAAFmsn8IlGoQD8SrrygAuWPAhI0mHPmT5RAOm-Le+F9jicgDcAFCgkFAAQopwiCioagCMavgALACsCuHg0ACCsQ5OiSnpAGwKAPSVUFTACADGANZQAPYAbqwAZtytAO5AA). In TypeScript 4.5, we have tail call optimization, and the limit increased to [999](https://www.typescriptlang.org/play?ts=4.5.4#code/C4TwDgpgBAShkENgDkA8BJYEC2AaKyUEAHlgHYAmAzlGQK7YBGEATvgCp1gA20J51KAjIgA2gF0oAXigSAfNKiceEUQHJeZAObAAFmsn8IlGoQD8SrrygAuWPAhI0mHPmT5RAOm-Le+F9jicgDcAFChoJBQAIKKcIgoqGoAjGr4AJyZchHg0ABCcQ5OSan4yQAMlQoA9NVQVMAIAMYA1lAA9gBurABm3O0A7qFAA).

## Avoid type gymnastics in production code

Sometimes type programming is jokingly referred to as “type gymnastics” when it gets really complex, fancy and far more sophisticated than it needs to be in a typical application.
For example:

1. [simulating a Chinese chess (象棋)](https://github.com/chinese-chess-everywhere/type-chess)
2. [simulating a Tic Tac Toe game](https://blog.joshuakgoldberg.com/type-system-game-engines/)
3. [implementing arithmetic](https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f)

They are more like academic exercises, not suitable for production applications because:

1. they are hard to comprehend, especially with esoteric TypeScript features.
2. they are hard to debug due to incredibly long and cryptic compiler error messages.
3. they are slow to compile.

> Just like we have Leetcode for practicing your core programming skills, we have [type-challenges](https://github.com/type-challenges/type-challenges) for practicing your type programming skills.

## Closing thoughts

We have covered a lot in this blog post. The point of this post is not to really teach you TypeScript, rather than to reintroduce the "hidden" type language you might have overlooked ever since you started learning TypeScript.

Type programming is a niche and underdiscussed topic in the TypeScript community, and I don't think there is anything wrong with that - because ultimately adding types is just a means to an end, the end being writing more dependable web applications in JavaScript. Therefore, to me it is totally understandable that people don't often take the time to "properly" study the type language as they would for JavaScript or other programming languages.

## Further Reading

- [Proof that TypeScript's Type System is Turing Complete](https://gist.github.com/hediet/63f4844acf5ac330804801084f87a6d4)
- [TypeScript and Turing Completeness](https://itnext.io/typescript-and-turing-completeness-ba8ded8f3de3)
