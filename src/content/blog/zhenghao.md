---
title: "Zhenghao TS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Typescript", "TS"]
draft: false
description: "Typescript by Zhenghao He"
---

## Type programming

[An introduction to type programming in TypeScript](https://dev.to/he_zhenghao/an-introduction-to-type-programming-in-typescript-37o7)

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

## TS never

TypeScript's `never` type is very under-discussed, because it's not nearly as ubiquitous or inescapable as other types. A TypeScript beginner can probably ignore `never` type as it only appears when dealing with advanced types, such as conditional types, or reading their cryptic type error messages.

The `never` type does have quite a few good use cases in TypeScript. However, it also has its own pitfalls you need to be careful of.

In this blog post, I will cover:

- The meaning of `never` type and why we need it.
- Practical applications and pitfalls of `never`.
- a lot of puns 🤣

## What is never type

To fully understand `never` type and its purposes, we must first understand what a **type** is, and what role it plays in a type system.

A type is a **set** of possible values. For example, `string` type represents an infinite set of possible strings. So when we annotate a variable with type `string`, such a variable can only have values from within that set, i.e. strings:

```typescript
let foo: string = "foo";
foo = 3; // ❌ number is not in the set of strings
```

In TypeScript, `never` is an **empty set** of values. In fact, in [Flow](https://flow.org/), another popular JavaScript type system, the equivalent type is called exactly [empty](https://github.com/facebook/flow/commit/c603505583993aa953904005f91c350f4b65d6bd)

Since there’s no values in the set, `never` type can never (pun-intended) have any value, including values of `any` type. That’s why `never` is also sometimes referred to as an [uninhabitable type](https://cs.stackexchange.com/questions/134215/what-is-an-uninhabited-type) or a [bottom type](https://en.wikipedia.org/wiki/Bottom_type).

```typescript
declare const any: any;
const never: never = any; // ❌ type 'any' is not assignable to type 'never'
```

The bottom type is how [the TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#other-important-typescript-types) defines it. I found it makes more sense when we place `never` in the [type hierarchy tree](https://www.zhenghao.io/posts/type-hierarchy-tree#the-bottom-of-the-tree), a mental model I use to understand [subtyping](https://en.wikipedia.org/wiki/Subtyping)

The next logical question is, why do we need `never` type?

## Why we need never type

Just like we have **zero** in our number system to denote the quantity of nothing, we need a type to denote **impossibility** in our type system.

The word "impossibility" itself is vague. In TypeScript, “impossibility” manifests itself in various ways, namely:

- An empty type that can't have any value, which can be used to represent the following:
  - Inadmissible parameters in generics and functions.
  - Intersection of incompatible types.
  - An empty union (a union type of nothingness).
- The return type of a function that never (pun-intended) returns control to the caller when it finishes executing, e.g., `process.exit` in Node
  - Not to confuse it with `void`, as `void` means a function doesn’t return anything useful to the caller.
- An else branch that should never (pun-intended... ok I think that's enough puns for today) be entered in a condition type
- The fulfilled value's type of a rejected `promise`
  ```typescript
  const p = Promise.reject("foo"); // const p: Promise<never>
  ```

### How never works with unions and intersections

Analogous to how number zero works in addition and multiplication, `never` type has special properties when used in union types and intersection types:

- `never` gets dropped from union types, similiar to when zero added to a number gives the same number.

  - e.g. `type Res = never | string // string`

- `never` overrides other types in intersection types, similiar to when zero multiplying a number gives zero.
  - e.g. `type Res = never & string  // never`

These two behaviors/characteristics of `never` type lay the foundation for some of its most important use cases that we will see later on.

## How to use never type

While you probably wouldn’t find yourself use `never` a lot, there are quite a few legit use cases for it:

### Annotate inadmissible function parameters to impose restrictions

Since we can never assign a value to `never` type, we can use it to impose restrictions on functions for various use cases.

#### Ensure exhaustive matching within switch and if-else statement

If a function can only take one argument of `never` type, that function can never be called with any non-`never` value (without the TypeScript compiler yelling at us):

```typescript
function fn(input: never) {}

// it only accepts `never`
declare let myNever: never;
fn(myNever); // ✅

// passing anything else (or nothing) causes a type error
fn(); // ❌  An argument for 'input' was not provided.
fn(1); // ❌ Argument of type 'number' is not assignable to parameter of type 'never'.
fn("foo"); // ❌ Argument of type 'string' is not assignable to parameter of type 'never'.

// cannot even pass `any`
declare let myAny: any;
fn(myAny); // ❌ Argument of type 'any' is not assignable to parameter of type 'never'.
```

We can use such a function to ensure exhaustive matching within switch and if-else statement: by using it as the default case, we ensure that all cases are covered, since what remains must be of type `never`. If we accidentally leave out a possible match, we get a type error. For example:

```typescript
function unknownColor(x: never): never {
  throw new Error("unknown color");
}

type Color = "red" | "green" | "blue";

function getColorName(c: Color): string {
  switch (c) {
    case "red":
      return "is red";
    case "green":
      return "is green";
    default:
      return unknownColor(c); // Argument of type 'string' is not assignable to parameter of type 'never'
  }
}
```

#### Partially disallow structural typing

Let’s say we have a function that accepts a parameter of either the type `VariantA` or `VariantB`. But, the user mustn’t pass a type encompassing all properties from both types, i.e., a [subtype](https://en.wikipedia.org/wiki/Subtyping) of both types.

We can leverage a union type `VariantA | VariantB` for the parameter. However, since type compatibility in TypeScript is based on [structural subtyping](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#handbook-content), passing an object type that has more properties than the parameter’s type has to a function is allowed (unless you pass object literals):

```typescript
type VariantA = {
  a: string;
};

type VariantB = {
  b: number;
};

declare function fn(arg: VariantA | VariantB): void;

const input = { a: "foo", b: 123 };
fn(input); // TypeScript doens't complain but this shouldn't be allowed for our use case
```

The above code snippet doesn't give us a type error in TypeScript.

By using `never`, we can partially disable structural typing and prevent users from passing object values that include _both_ properties:

```typescript
type VariantA = {
  a: string;
  b?: never;
};

type VariantB = {
  b: number;
  a?: never;
};

declare function fn(arg: VariantA | VariantB): void;

const input = { a: "foo", b: 123 };
fn(input); // ❌ Types of property 'a' are incompatible
```

#### Prevent unintended API usage

Let’s say we want to create a `Cache` instance to read and store data from/to it:

```typescript
type Read = {};
type Write = {};
declare const toWrite: Write;

declare class MyCache<T, R> {
  put(val: T): boolean;
  get(): R;
}

const cache = new MyCache<Write, Read>();
cache.put(toWrite); // ✅ allowed
```

Now, for some reason we want to have a read-only cache only allowing for reading data via the `get` method. We can type the argument of the `put` method as `never` so it can’t accept any value passed in it:

```typescript
declare class ReadOnlyCache<R> extends MyCache<never, R> {}
// Now type parameter `T` inside MyCache becomes `never`

const readonlyCache = new ReadOnlyCache<Read>();
readonlyCache.put(data); // ❌ Argument of type 'Data' is not assignable to parameter of type 'never'.
```

> Unrelated to `never` type, as a side note, this might not be a good use case of derived classes. I am not really an expert on object-oriented programming, so please use your own judgment.

### Denote theoretically unreachable conditional branches

When using `infer` to create an additional type variable inside a conditional type, we must add an else branch for every `infer` keyword:

```typescript
type A = "foo";
type B = A extends infer C
  ? C extends "foo"
    ? true
    : false // inside this expression, C represents A
  : never; // this branch is unreachable but we cannot omit it
```

<details>
    <summary>Why is this `extends infer` combo useful?</summary>
    <p>In my previous post I mentioned how you can create declare “local (type) variable” together with `extends infer`. Check it out [here](/posts/type-programming#local-variable-declaration) if you haven’t seen it.</p>
</details>

### Filter out union members from union types

Beside denoting impossible branches, `never` can be used to filter out unwanted types in conditional types.

As we have discussed this before, when used as a union member, `never` type is removed automatically. In other words, the `never` type is useless in a union type.

When we are writing a utility type to select union members from a union type based on certain criteria, `never` type's uselessness in union types makes it the perfect type to be placed in else branches.

Let's say we want a utility type `ExtractTypeByName` to extract the union members with the `name` property being string literal `foo` and filter out those that don't match:

```typescript
type Foo = {
  name: "foo";
  id: number;
};

type Bar = {
  name: "bar";
  id: number;
};

type All = Foo | Bar;

type ExtractTypeByName<T, G> = T extends { name: G } ? T : never;

type ExtractedType = ExtractTypeByName<All, "foo">; // the result type is Foo
```

<details>
    <summary>See how this works in detail</summary>
    <p>Here are a list of steps TypeScript folllows to evaluate and get the resultant type:</p>
        1. Conditional types are distributed over union types (namely, `Name` in this case):
            ```typescript
            type ExtractedType = ExtractTypeByName<All, Name> 
            ⬇️                    
            type ExtractedType = ExtractTypeByName<Foo | Bar, 'foo'>
            ⬇️    
            type ExtractedType = ExtractTypeByName<Foo, 'foo'> | ExtractTypeByName<Bar, 'foo'>
            ```
        2. Substitue the implementation and evaluate separately
            ```typescript
            type ExtractedType = Foo extends {name: 'foo'} ? Foo : never 
                                | Bar extends {name: 'foo'} ? Bar : never
            ⬇️
            type ExtractedType = Foo | never
            ```
        3. Remove `never` from the union
            ```typescript
            type ExtractedType = Foo | never
            ⬇️
            type ExtractedType = Foo
            ```
</details>

### Filter out keys in mapped types

In TypeScript, types are immutable. If we want to delete a property from an object type, we must create a new one by transforming and filtering the existing one. When we conditionally [re-map keys](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as) in mapped types to `never`, those keys get filtered out.

Here’s an example for a `Filter` type that filters out object type properties based on their value types.

```typescript
type Filter<Obj extends Object, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key];
};

interface Foo {
  name: string;
  id: number;
}

type Filtered = Filter<Foo, string>; // {name: string;}
```

### Narrow types in control flow analysis

When we type a function’s return value as `never`, that means the function never returns control to the caller when it finishes executing. We can leverage that to help control flow analysis to narrow down types.

> A function can never return for several reasons: it might throw an exception on all code paths, it might loop forever, or it exits from the program e.g. `process.exit` in Node.

In the following code snippet, we use a function that returns `never` type to strip away `undefined` from the union type for `foo`:

```typescript
function throwError(): never {
  throw new Error();
}

let foo: string | undefined;

if (!foo) {
  throwError();
}

foo; // string
```

Or invoke `throwError` after `||` or `??` operator:

```typescript
let foo: string | undefined;

const guaranteedFoo = foo ?? throwError(); // string
```

### Denote impossible intersections of incompatible types

This one might feel more like a behavior/characteristic of the TypeScript language than a practical application for `never`. Nevertheless, it’s vital for understanding some of the cryptic error messages you might come across.

You can get `never` type by intersecting incompatible types

```typescript
type Res = number & string; // never
```

And you get `never` type by intersecting any types with `never`

```typescript
type Res = number & never; // never
```

<details>
    <summary>It gets complicated for object types...</summary>
    <p>When intersecting object types, depending on whether or not the disjoint properties are considered as discriminant properties (basically literal types or unions of literal types), you might or might not get the whole type reduced to `never`</p>
    <p>In this example only `name` property becames `never` since `string` and `number` are not discriminant properties</p>
            ```typescript
                type Foo = {
                name: string,
                age: number
                }
                type Bar = {
                    name: number,
                    age: number
                }

                type Baz = Foo & Bar // {name: never, age: number}
            ```
       <p>In the following example, the whole type `Baz` is reduced to `never` because a boolean is a discriminant property (a union of `true | false`)</p>
            ```typescript
                type Foo = {
                name: boolean,
                age: number
                }

                type Bar = {
                    name: number,
                    age: number
                }

                type Baz = Foo & Bar // never
            ```
        <p>Check out this [PR](https://github.com/microsoft/TypeScript/pull/36696) to learn more.</p>

</details>

## How to read never type (from error messages)

You might have gotten error messages involving an unexpected `never` type from code you didn’t annotate with `never` explicitly. That’s usually because the TypeScript compiler intersects the types. It does this implicitly for you to retain type safety and to ensure soundness.

Here’s an example (play with it in [TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAShwFcBOA7AKuCAhEBJFYCwGkUAvFAN4BQUUAlisAFxQoIC2ARhErVAGMAFgEMkrAM7AkjAOb8uAe0UAbVktUQRKagF9q1AGYIUA4PUUoos+DG0ATRRwA8aKBAAewCCnsSoAOTCYgFQAD6BjMChEQEaKgEAfAAU-FLiUGjUAJSscIioJNh4BERFANpoALpU-PSGUMnp5GQUAVEB2bV0dAD0vdY+vCLeUCJQSA5ObJw8fD0T8MhWALIjQgB0hirKSMlrwJuTvk7JXQBUUACMAAxd-LruKhLQ9Y3NrW3BSJ3dPf2DFDDUbjY6ODiCUTzHpIJaoKAAZWkci2SCcAGEoejFPYIKkFnQAJwAdigAGooAdNttdvt1hswacLlAAEwANmy-DonLojwgz2gNAWAJsQMmIImUwh8S0OgWsIKViwyhUsrphwZihM9nVRylZ2yPKg+l0QA)) that I used in my previous [blog post](https://www.zhenghao.io/posts/type-functions) on typing polymorphic functions:

```typescript
type ReturnTypeByInputType = {
  int: number;
  char: string;
  bool: boolean;
};

function getRandom<T extends "char" | "int" | "bool">(
  str: T
): ReturnTypeByInputType[T] {
  if (str === "int") {
    // generate a random number
    return Math.floor(Math.random() * 10); // ❌ Type 'number' is not assignable to type 'never'.
  } else if (str === "char") {
    // generate a random char
    return String.fromCharCode(
      97 + Math.floor(Math.random() * 26) // ❌ Type 'string' is not assignable to type 'never'.
    );
  } else {
    // generate a random boolean
    return Boolean(Math.round(Math.random())); // ❌ Type 'boolean' is not assignable to type 'never'.
  }
}
```

The function returns either a number, a string, or a boolean depending on the type of argument we pass. We use an indexes access `ReturnTypeByInputType[T]` to retrieve the corresponding return type.

However, for every return statement we have a type error, namely: `Type X is not assignable to type 'never'` where `X` is string or number or boolean, depending on the branch.

This is where TypeScript tries to help us narrow down the possibility of problematic states in our program: each return value should be assignable to the type `ReturnTypeByInputType[T]` (as we annotated in the example) where `ReturnTypeByInputType[T]` at runtime could end up being either a number, a string, or a boolean.

Type safety can only be achieved if we make sure that the return type is assignable to all possible `ReturnTypeByInputType[T]`, i.e. the **intersection** of number , string, and boolean.
And what’s the intersection of these 3 types? It’s exactly `never` as they are incompatible with each other. That’s why we are seeing `never` in the error messages.

To work around this, you must use type assertions (or function overloads):

- `return Math.floor(Math.random() * 10) as ReturnTypeByInputType[T]`
- `return Math.floor(Math.random() * 10) as never`

Maybe another more obvious example:

```typescript
function f1(obj: { a: number; b: string }, key: "a" | "b") {
  obj[key] = 1; // Type 'number' is not assignable to type 'never'.
  obj[key] = "x"; // Type 'string' is not assignable to type 'never'.
}
```

`obj[key]` could end up being either a string or a number depending on the value of `key` at runtime. Therefore, TypeScript added this constraint, i.e., any values we write to `obj[key]` must be compatible with both types, string and number, just to be safe. So, it intersects both types and gives us `never` type.

## How to check for never

Checking if a type is `never` is harder than it should be.

Consider the following code snippet:

```typescript
type IsNever<T> = T extends never ? true : false;

type Res = IsNever<never>; // never 🧐
```

Is `Res` `true` or `false`? It might surprise you that the answer is neither: `Res` is actually `never`. In fact,

It definitely threw me off the first time I came across this. [Ryan Cavanaugh](https://twitter.com/searyanc) explained this in [this issue](https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379094672). It boils down to:

- TypeScript distributes union types in conditional types automatically
- `never` is an empty union
- Therefore, when distribution happens there’s nothing to distribute over, so the conditional type resolves to `never` again.

The only workaround here is to opt out of the implicit distribution and to wrap the type parameter in a tuple:

```typescript
type IsNever<T> = [T] extends [never] ? true : false;
type Res1 = IsNever<never>; // 'true' ✅
type Res2 = IsNever<number>; // 'false' ✅
```

This is actually straight out of [TypeScript’s source code](https://github.com/microsoft/TypeScript/blob/main/tests/cases/conformance/types/conditional/conditionalTypes1.ts#L212) and it would be nice if TypeScript could expose this externally.

## In summary

We covered quite a lot in this blog post:

- First, we talked about `never` type's definition and purposes.
- Then, we talked about its various use cases:
  - imposing restrictions on functions by leveraging the fact that `never` is an empty type
  - filtering out unwanted union members and object type's properties
  - aiding control flow analysis
  - denoting invalid or unreachable conditional branches
- We also talked about why `never` can come up unexpectedly in type error messages due to implicit type intersection
- Finally, we covered how you can check if a type is indeed `never` type.

## Type algebra

Type algebra is a much underwritten topic in TypeScript, a topic that I found essential to understand some quirks in TypeScript.

## Algebras

We all have learned some algebraic laws from our math classes:

1. multiplication distributes over addition: the `x` in `x * (y + z)` distributes over `y + z`. We can rewrite it as `(x * y) + (x * z)`
2. addition doesn't distribute over multiplication. `x + (y * z)` We can't rewrite that expression as `(x + y) * (x + z)`.

And there is [boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra), which is a little different than the ordinary algebra we just saw:

1. Logical conjunction (and, the `&&` operator in JavaScript) distributes over the disjunction (or, the `||` operator in JavaScript): the `x` in `x && (y || z)` distributes over `y || z` , resulting in the equivalent expression `(x && y) || (x && z)`
2. the disjunction (`||`) also distributes over conjunction (`&&`). For `x || (y && z)`, we rewrite that expression as `(x || y) && (x || z)`

Lastly there is [set algebra](https://en.wikipedia.org/wiki/Algebra_of_sets). In Set Theory we have union (∪, the `|` operator in TypeScript) and intersection (∩, the `&` opeartor in TypeScript) operation:

1. intersection distributes over union: the type `A & (B | C)` is equivalent to `(A & B) | (A & C)`. We've distributed the `A` over the `B | C`.
2. union also distributes over intersection: The type `A | (B & C)` is equivalent to `(A | B) & (A | C)`.

TypeScript is very much related to Set Theory and the union and intersection operations around types also follow the algebraic laws in Set Theory - in the context of TypeScript, I call it **type algebra**.

Although I doubt you would write complex types like `A & (B | C)` everyday, sometimes you do have to reason through the type algebra to decipher TypeScript error messages and find out what’s happening.

## Apply type algebra

Now let’s walk through a concrete (contrived) example and see how we can apply type algebra to understand a confusing type error.

Imagine we have two types of tech events - conferences and meetups. Conferences can be held either in-person or online virtually via Zoom while meetups must be held in-person at some physical location. To model this, we have a type `TechEvent` which is a union of those two types of events. Finally we have an `IsVirtual` object type that only specifies `{isVirtual: true}`, meaning an event is held online.

```typescript
type Conference = { type: "conference"; isVirtual: boolean };
type Meetup = { type: "meetup"; isVirtual: false };
type TechEvent = Conference | Meetup;
type IsVirtual = { isVirtual: true };

// We intersect IsVirtual with conference and meetup, then explore the resulting type.
type VirtualEvent = IsVirtual & TechEvent;
```

First we use the resulting `VirtualEvent` type to type a variable for `Conference`:

```typescript
const conference: VirtualEvent = { type: "conference", isVirtual: true }; // ✅
```

If we messed up the `isVirtual` property, we get a type error requiring `isVirtual` to be `true`:

```typescript
const conference: VirtualEvent = { type: "conference", isVirtual: false }; // ❌ type 'false' is not assignable to type 'true'
```

We start with the type `IsVirtual & TechEvent`. It's easier to think about this type if we distribute the intersection over the union.

```typescript
// By applying type algebra, we get three equivalent types:
type VirtualEvent = IsVirtual & TechEvent;
type VirtualEvent = IsVirtual & (Conference | Meetup);
type VirtualEvent = (IsVirtual & Conference) | (IsVirtual & Meetup);
```

It is not hard to understand why the `conference` variable requires its `isVirtual` to be `true` - given that the `Conference` type has `isVirtual: boolean`, and the type `IsVirtual` has `isVirtual: true`, when we intersect the two types, we end up with `isVirtual: boolean & true`. Intersecting `boolean & true` is equivalent to just `true`. That is why the type error above is asking for `true` for the `isVirtual` property.

So far it seems pretty straightforward. However for the type `Meetup`, things are much more complicated. `Meetup` has `isVirtual: false`, and `IsVirtual` has `isVirtual: true`. When we intersect them in the type `VirtualEvent`, something unexpected happens:

```typescript
const meetup: VirtualEvent = { type: "meetup", isVirtual: true }; // ❌ Type '"meetup"' is not assignable to type '"conference"'
```

The code above doesn’t compile because of a type error, which shouldn't come as a surprise. The type error itself is interesting though.
It says "Type 'meetup' is not assignable to type 'conference'" - but what does `conference` have to do with this `meetup` variable? The variable is for a meetup, not a conference. Here the compiler is not going to tell us exactly what went wrong, so we have to work the types out for ourselves through type algebra:

1. The type `VirtualEvent` is created by the intersection `(IsVirtual & Conference) | (IsVirtual & Meetup)`
2. The right side of the union `IsVirtual & Meetup` is `{isVirtual: true} & {type: 'meetup', isVirtual: false}`, which gives us `never` because `true & false` for the `isVirtual` property is an empty intersection.
3. Now the intersection becomes `(IsVirtual & Conference) | never` and TypeScript automatically discards `never` from a union type.
4. Now the intersection becomes just `IsVirtual & Conference`, which is `{type: 'conference', isVirtual: true}`

> If you are not familiar with the `never` type, I have written [a blog post](type-hierarchy-tree#the-bottom-of-the-tree) covering that as well.

Go back to the erroneous assignment again:

```typescript
const meetup: VirtualEvent = { type: "meetup", isVirtual: true }; // ❌ Type '"meetup"' is not assignable to type '"conference"'
```

IF we replace the `VirtualEvent` type with the equivalent version that we got through type algebra - `{type: 'conference', isVirtual: true}`, we would get an identical type error:

```typescript
const meetup: { type: "conference"; isVirtual: true } = {
  type: "meetup",
  isVirtual: true,
}; // ❌ Type '"meetup"' is not assignable to type '"conference"'
```

Now I hope it have become apparent to you as to why the the compiler reported that 'meetup' isn't assignable to 'conference': the compiler dropped the entire right side of the union because of the `never` type we got by distributing the intersection over the union.

> You might think `{isVirtual: true} & {type: 'meetup', isVirtual: false}` should give us `{type: 'meetup', isVirtual: never}`, as opposed to just one `never` type. Actually it used to be the case before TypeScript 3.9. But afterward they introduced this feature to reduce empty intersections to `never` immediately upon construction. Check out [this PR](https://github.com/microsoft/TypeScript/pull/36696) for details and motivation.

## Don’t extend type algebra

There are some type annotations in TypeScript that you might think they are good candidates for the distributivity law but actually they are not:

- `(number | string) []` and`number[] | string[]` - the former represents an array of numbers and/or strings and the latter means an array of numbers or an array of strings.
- `keyof (A & B)` and `keyof A & keyof B` - the former gives you a union of literal strings of the property names of the intersection of type `A` and `B` and the latter gives you an intersection of two union of literal strings of the property names of type `A and B`.
- `typeof foo & typeof bar` and `typeof (foo & bar)` - the latter is not even valid TypeScript.

## Type polymorphic funtions in TS

Admittedly, the title might be bit broad. Polymorphism is a theoretical concept that’s deeply rooted in programming language theory, and it has many varieties. I am by no means an expert in programming language theory. So, I won’t use the term “polymorphic functions” in this blog post in a strict, academic sense. Rather, I will use it mainly to refer to functions in two ways: those that behave differently depending on their applied argument types (i.e. [ad-hoc polymorphisms](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism)) and those that take a variable number of arguments (i.e. [variadic functions](https://en.wikipedia.org/wiki/Variadic_function)).

JavaScript allows functions to work flexibly when the arguments passed are of different types and/or at different positions:

- The [useState](https://beta.reactjs.org/apis/usestate#reference) Hook lets you pass an initial value or a function for lazy initialization, or you can skip it altogether and pass nothing to it.
- The [query API](https://node-postgres.com/features/queries) from `node-postgres` accepts an optional callback function and returns a promise when the callback function isn’t provided.
- The `write` function of [the file system API](https://nodejs.org/api/fs.html#filehandlewritebuffer-offset-length-position) in Node.js defines the first argument to be either a buffer of data or a string that we write to a file.
- The `extend` API from [the package node-extend](https://www.npmjs.com/package/extend) enables deep copying by allowing you to pass an optional boolean flag as the first argument to the function call.

It’s been a running theme in my TypeScript career: I have to create and type functions like these, and I’ve definitely struggled. But, I’ve found a few solutions that have worked for me. In this post, I’ll walk you through some techniques I use to type polymorphic functions more easily.

## Union type

Union types are probably the first, and most obvious, tool you want to reach for when typing a function that accepts arguments of different types. For example:

```typescript
declare function foo(a: string | boolean);
```

The argument’s type could either be a `string` or `boolean`, so we use a union type to model this. Then, we use type guards inside the function body to narrow it down to its single type, i.e., `string` or `boolean`.

Now, let’s say the return value’s type depends on which specific union member the argument’s type is. How should we then go about typing it?
We can represent the types of the arguments using generic types. Then, we pass them to conditional types to retrieve the right type of return value.

Let’s consider a function that generates a random integer from 0-9 when called with the string `int`. Or, it generates a random English letter from a - z when called with the string `char`.

Here’s how I would write it in JavaScript:

```javascript
function getRandom(str) {
  if (str === "int") {
    // generate a random integer
    return Math.floor(Math.random() * 10);
  } else {
    // generate a random char
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
}
```

To properly type this in TypeScript, follow these steps:

1. The argument `str` has the string union type `"int" | "char"` , and to make the return value’s type depend on the argument type, we must use a generic type `T` to represent it.
   1. `function getRandom<T extends'char' | 'int'>(str: T)`
2. Pass `T` to a generic conditional type `GetReturnType` to get the respective type for the return value.
   1. `type GetReturnType<T> = T extends 'char' ? string : T extends 'int' ? number : never`

Putting these together we have:

```typescript
type GetReturnType<T> = T extends "char"
  ? string
  : T extends "int"
  ? number
  : never;

function getRandom<T extends "char" | "int">(str: T): GetReturnType<T> {
  if (str === "int") {
    // generate a random number
    return Math.floor(Math.random() * 10) as GetReturnType<T>;
  } else {
    // generate a random char
    return String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ) as GetReturnType<T>;
  }
}
```

> You might be wondering about the type assertion after each return statement. I’ll explain this later.

Now, let’s say we must expand our `getRandom` function to also support random boolean generation.

First, we must add another union member `bool` to our string union type for the argument. That’s easy. But as a result, the conditional expressions inside `GetReturnType` quickly gets crowded:

```typescript
type GetReturnType<T> = T extends "char"
  ? string
  : T extends "int"
  ? number
  : T extends "bool"
  ? boolean
  : never;

function getRandom<T extends "char" | "int" | "bool">(
  str: T
): GetReturnType<T> {
  if (str === "int") {
    // generate a random number
    return Math.floor(Math.random() * 10) as GetReturnType<T>;
  } else if (str === "char") {
    // generate a random char
    return String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ) as GetReturnType<T>;
  } else {
    // generate a random boolean
    return Boolean(Math.round(Math.random())) as GetReturnType<T>;
  }
}
```

As you can tell, this doesn’t scale well if we keep adding more types for the function to support.
Luckily, we can create a record type for indexed access with type parameter `T`, which we defined for our argument’s type.

```typescript
// interface works as well
type ReturnTypeByInputType = {
  int: number;
  char: string;
  bool: boolean;
};

function getRandom<T extends "char" | "int" | "bool">(
  str: T
): ReturnTypeByInputType[T] {
  if (str === "int") {
    // generate a random number
    return Math.floor(Math.random() * 10) as ReturnTypeByInputType[T];
  } else if (str === "char") {
    // generate a random char
    return String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ) as ReturnTypeByInputType[T];
  } else {
    // generate a random boolean
    return Boolean(Math.round(Math.random())) as ReturnTypeByInputType[T];
  }
}
```

Think about the DOM API `documnet.querySelector`—it accepts an html element tag name and returns the respective html element. It is typed in [TypeScript’s source code](https://github.com/microsoft/TypeScript/blob/ca00b3248b1af2263d0223d68e792b7ca39abcab/lib/lib.dom.d.ts#L11050) in the exact same way.

<details>
    <summary>Why use type assertions</summary>
    <p>You might’ve have noticed that I added a type assertion as `ReturnTypeByInputType[T]` for every return statement. This is because after TypeScript 3.5, to give a return value an indexed access type (such as `ReturnTypeByInputType[T]`), the return type must be checked against the intersection of all possibilities of the properties (types) selected by that index. In the above example, every return value must be asserted as either `ReturnTypeByInputType[T]`, or an explicit intersection type of every type in `ReturnTypeByInputType` , which is `number & string & boolean`. Note that the resultant type of the intersection is `never`. Therefore type assertion with `as never` works too</p>
    <p>This is to improve the soundness of the type system. See [this PR](https://github.com/microsoft/TypeScript/pull/30769) if you are interested in learning more about it.</p>
    <p>Type assertions are inherently unsafe. Later on, I’ll show you how to get rid of them using function overload. But unfortunately, function overload is just as unsafe as type assertion. For now though, just consider this as a technical limitation of TypeScript.</p>
</details>

## Optional parameters

What about functions that take a variable number of arguments? They’re extremely common, and in JavaScript you don’t really need to do anything other than just define parameters as you normally would and check them against `undefined` inside the function body.

In TypeScript—you probably know this already—we can model it using optional parameters marked with `?`:

```typescript
declare function foo(a: string, b?: boolean);
```

Consequently, inside the function body, `b` is of the union type `boolean | undefined`

It’s also common for such functions to return different types of values if optional parameters are actually provided or not.

Let’s say we have a function `search` that fetches search results asynchronously. It accepts an optional callback function as the arguments. If the callback function is supplied, it passes the search results to it. Otherwise, it returns a promise that resolves to the search results. Here’s how you might write the function in JavaScript:

```javascript
function search(query, cb) {
  const res = api(query);
  if (cb) {
    res.then(data => cb(data));
    return;
  }

  return res;
}

const p = search("foo"); // return a promise
const v = search("foo", data => {}); // void
```

In TypeScript, we can follow these steps to type the function:

1. First, we must mark the argument `cb` as an optional parameter with `?`
2. Then, we represent the argument `cb`'s type with a generic type `T`
3. Finally, we use `extends` to conditionally return the right type `T extends Callback ? void : Promise<Result[]>`

```typescript
type Callback = (results: Result[]) => void;

function search<T extends Callback | undefined = undefined>(
  query: string,
  cb?: T
): T extends Callback ? void : Promise<Result[]> {
  const res = api(query);

  if (cb) {
    res.then(data => cb(data));
    return undefined as void & Promise<Result[]>; // assertion needed for the same reason as `getRandom` above
  }

  return res as void & Promise<Result[]>;
}

const p = search("key"); // ✅ Promise<Result[]>
const v = search("key", data => {}); // ✅ void
```

<details>
    <summary>Why use type parameter default</summary>
    <p>You might noticed that I added `undefined` as a type parameter default for `T`, i.e. `function search<T extends Callback | undefined = undefined>`.</p>
    <p>The reason is that with the `undefined` default, the compiler can properly infer the type `T` when `cb` is not provided.</p>
</details>

As you might’ve noticed, there are some common themes:

1. We use `extends` with conditional expressions quite a lot to determine the right return’s type. And the syntax can get complicated pretty quickly.
2. There are a lot of type assertions needed.

All of these added a lot of noise to our types. So, there might be a better alternative when it comes to type complex polymorphic functions...

## Function overload

It turns out that TypeScript supports function overload, and surprisingly, it might actually be the **oldest** part of TypeScript. You can trace it back to [TypeScript 1.1](https://github.com/microsoft/TypeScript/blob/release-1.1/tests/cases/compiler/overload2.ts).
But unlike other features added during TypeScript’s early development—enums and namespaces come to mind, which tend to get overused (especially enums) and should be replaced by other features—from my observations, function overload is actually underused and still remains useful when needed.

I think part of the reason why function overload is so underused, is because the idea of function overload just feels unnatural to many JavaScript developers. In JavaScript, we don’t have function overload—JavaScript only allows one function with a specific name within a specific scope.

However, as a dynamically typed language, JavaScript performs type checks during runtime. This means arguments are as dynamic as we need them to be and allows us to achieve the same effect as function overload—namely, having different function implementations depending on the types and number of arguments that are invoked.

<details>
    <summary>Notes on TypeScript's function overload</summary>
    <p>Depending on your background, TypeScript's function overload might feel a little weird to you since it is resolved at runtime by the implementer (the TypeScript programmer) by **manually** examining the arguments’ types. </p>
    <p>TypeScript could’ve implemented the traditional compile-time function overload available from statically-typed languages like C++, C# and Java etc. In fact, multiple proposals, like [this one](https://github.com/Microsoft/TypeScript/issues/3442), have asked for such a “proper” function overload feature, but they all ended up only being close as they all violate multiple TypeScript design goals.</p>
</details>

### A simple example of function overload

Let’s consider a function that accepts either a number or a string, and that converts the input to the opposite type and returns it. That means, given a number, it returns the corresponding string; given a string, it returns the corresponding number. Here’s how you can write it in JavaScript:

> This example is inspired by [this tweet](https://twitter.com/TkDodo/status/1489965656560701440) from @TkDodo

```javascript
function switchIt(input) {
  if (typeof input === "string") return Number(input);
  else return String(input);
}
```

And here’s how you can type this function using generics and conditional types:

```typescript
function switchIt<T extends string | number>(
  input: T
): T extends string ? number : string {
  if (typeof input === "string") {
    return Number(input) as string & number;
  } else {
    return String(input) as string & number;
  }
}

const num = switchIt("1"); // has type number ✅
const str = switchIt(1); // has type string ✅
```

Now let’s try **function overload** to type this. Follow these steps:

1. Write 2 separate function signatures for each version of the overloaded function

```typescript
function switchIt_overloaded(input: string): number;
function switchIt_overloaded(input: number): string;
```

1. Write the overloaded function implementation.
   1. Use a union type to encompass types of each of the overloads.
   2. Within the function body, we check the types of the arguments and **manually** dispatch the execution to a proper code path:
   ```typescript
   function switchIt_overloaded(input: string): number;
   function switchIt_overloaded(input: number): string;
   function switchIt_overloaded(input: number | string): number | string {
     if (typeof input === "string") {
       return Number(input);
     } else {
       return String(input);
     }
   }
   ```

With function overload, you **remove**: 1. Generics and the conditional types. 2. Type assertions.

And you gain **benefits** like: 1. Readability, since you can clearly distinguish the possible variant of the overloaded function. The types of arguments and return values are separately and explicitly written out. 2. IDE support for overloaded functions is better.

### A more complex example of function overload

Rewind to our initial `search` function. Following the same steps, you can re-write it using function overload:

```typescript
type Callback = (results: Result[]) => void;

function search_overloaded(term: string): Promise<Result[]>;
function search_overloaded(term: string, cb: Callback): void;
function search_overloaded(
  term: string,
  cb?: Callback
): void | Promise<Result[]> {
  const res = api(term);

  if (cb) {
    res.then(data => cb(data));
    return;
  }

  return res;
}

const p = search_overloaded("key"); // ✅ Promise<Result[]>
const v = search_overloaded("key", data => {}); // ✅ void
```

Again, no convoluted conditional types and generic types, and no annoying type assertions.

### One last example of function overload in React

React's `useState` hook is also overloaded to make it easier to use.

If you have an initial value or a function that returns a value then the state is going to be of the type of that value:

```typescript
const [state] = useState(1); // number
```

You can also skip passing an initial value to it, and instead specify a type. Then the state ends up being of the union type:

```typescript
const [state] = useState<number>(); // number | undefined
```

If you don't even specify a type, you will get a `undefined` state

```typescript
const [state] = useState(); // undefined
```

This is also done via function overload.

```typescript
function useState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];
function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S | undefined>>];
function useState<S>(
  initialState?: S | (() => S)
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  // ...implementation
}
```

Check out [the source code](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7a0d9c019f2b48b36b88691247870e6885b97a02/types/react/v16/index.d.ts#L921-L928) if you are interested.

### Overloaded functions are just as unsafe (even without type assertions)

Type assertions are often considered to be code smell, and getting rid of them by leveraging function overload might seem like a big win. However, function overload is just as unsafe as type assertions.

Let’s go back to our `switchIt_overloaded` example and intentionally mess up its implementation to return the wrong types:

```typescript
function switch_overloaded(input: string): number;
function switch_overloaded(input: number): string;
function switch_overloaded(input: number | string): number | string {
  if (typeof input === "string") {
    return input; // input is still a string when it should be converted to number
  } else {
    return input; // input is still a number when it should be converted to string
  }
}

const num = switch_overloaded("1"); // ❌ num's type is number but it is actually a string
const str = switch_overloaded(1); // ❌ str's type is string but it is actually a number
```

The TypeScript compiler only checks the function body’s code against the (overloaded) function signature but it cannot tell **which** if else branch is supposed to handle **which** individual overload. As a result, we can write code that contradicts the overloaded function signature and TypeScript can’t help us.

### Function overload is just an intersection of function types

Function overload can be thought of as a syntactic sugar for intersecting function types. Think about it—when we are overloading functions like:

```typescript
function switchIt(input: string): number;
function switchIt(input: number): string;
```

Then we are saying that a value (i.e. that function) of this type (the function type/signature being overloaded) can be used both as a function of the first type/signature `(input: string): number` **and** as a function of the second type/signature `(input: number): string`. This effectively translates into an **intersection** of both function types/signatures:

```typescript
type F = ((input: string) => string) & ((input: number) => number);

const switchIt_intersection: F = input => {
  if (typeof input === "string") {
    return Number(input);
  } else {
    return String(input);
  }
};

const num = switchIt_intersection(1); // ✅ has the string type
const str = switchIt_intersection("1"); // ✅ has the number type
```

And you can also write type `F` in the form of interface, since the interface definition automatically merges and is implicitly intersected by the compiler:

```typescript
interface F {
  (input: number): string;
  (input: string): number;
}
```

[Flow](https://flow.org/) is another popular JavaScript type system. But, it doesn’t (fully) support the function overload syntax in TypeScript. However, it does allow you to set overloading types for functions using intersection types, exactly like what we did above with `switchIt_intersection`.

<details>
    <summary>Why use intersection types as opposed to union types for type `F`</summary>
    <p>Interestingly, the usage of intersection types for function overload (i.e. `type F = ((input: string) => string) & ((input: number) => number)`) is a common source of confusion to people: when the overloaded function signature is written, **union types** are used, as opposed to intersection types.</p>

```typescript
function switch_overloaded(input: string): number;
function switch_overloaded(input: number): string;
function switch_overloaded(input: number | string): number | string {
  // 🤔 union, not intersection
  // ...
}
```

This is because parameter types are [contravariant](https://stackoverflow.com/questions/1962629/contravariance-explained)—you must reverse the type relationship (i.e. flip the ands and ors) inside the function body. For example, if the function has a type of `string => X` and `number => X`, then you have to handle an input that is a `string` or a `number` when working inside the function body.

</details>

## My rule of thumb

When it comes to typing polymorphic functions in TypeScript, I normally default to using generic types (constrained to a union type) along with conditional types. I only reach for function overload when I realize the function signature’s shapes for all its variants are different enough to be defined separately and explicitly.

For example:

1. The `search` function above is a good candidate for function overload since the return value’s type changes depend on the number of arguments that gets passed to the function (the shapes of the function signatures are very different).
2. The `getRandom` function is not suitable for function overload since generic types with conditional types or indexed types are already a great tool to map input types to output types. Writing it using function overload would be extremely verbose. Functions with an excessive number of overloads can be confusing to people.

The bottom line is, whether you favour function overload or generic types with conditional types, we have to be very intentional about it and tread very carefully as neither of them is completely safe.

## Type hierarchy tree

[The type hierarchy tree](https://dev.to/he_zhenghao/the-type-hierarchy-tree-2aba)

Try read the following TypeScript code snippet and work it out in your head to predicate whether or not there would be any type errors for each assignment:

```typescript
// 1. any and unknown
let stringVariable: string = "string";
let anyVariable: any;
let unknownVariable: unknown;

anyVariable = stringVariable;
unknownVariable = stringVariable;
stringVariable = anyVariable;
stringVariable = unknownVariable;

// 2. `never`
let stringVariable: string = "string";
let anyVariable: any;
let neverVariable: never;

neverVariable = stringVariable;
neverVariable = anyVariable;
anyVariable = neverVariable;
stringVariable = neverVariable;

// 3. `void` pt. 1
let undefinedVariable: undefined;
let voidVariable: void;
let unknownVariable: unknown;

voidVariable = undefinedVariable;
undefinedVariable = voidVariable;
voidVariable = unknownVariable;

// 4. `void` pt. 2

function fn(cb: () => void): void {
  return cb();
}

fn(() => "string");
```

If you were able to come up with the correct answers without pasting the code into your editor and let the compiler does its job, I am genuinely going to be impressed. At least I couldn’t get them all right despite writing TypeScript for more than a year. I was really confused by this part of TypeScript which involves types like `any`, `unknown`, `void` and `never`

I realized I didn’t have the correct mental model for how those types works. Without a consistent and accurate mental model, I could only rely on my experience or intuitions or constant trial and error from playing with the TypeScript compiler.

The blog post is my attempt to introspect and rebuild the mental model of TypeScript’s type system.

> A warning up front: this is not a short article. You can jump directly to [the section](#the-top-of-the-tree) where I explore the type hierarchy tree if you are in a hurry.

## It is a hierarchy tree

Turns out all types in TypeScript take their place in a hierarchy. You can visualize it as a tree-like structure. Minimally, in a tree, we can a parent node and a child node. In a type system, for such a relationship, we call the parent node a supertype and the child node a subtype.
![alt](/art/blog/type-hierarchy-tree/supertype-subtype.png)
You are probably familiar with inheritance, one of the well-known concepts in object-oriented programming. Inheritance establishes an `is-a` relationship between a child class and a parent class. If our parent class is `Vehicle`, and our child class is `Car`, the relationship is “`Car` is `Vehicle`”. However it doesn’t work the other way around - an instance of the child class logically is not an instance of the parent class. “`Vehicle` is not `Car`”. This is the semantic meaning of inheritance, and it also applies to the type hierarchy in TypeScript.

According to [the Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle), instances of `Vehicle` (supertype) should be substitutable with instances of its child class (subtype) `Cars` without altering the correctness of the program. In other words, If we expect a certain behavior from a type (`Vehicle`), its subtypes (`Car`) should honor it.

> I should mention that the Liskov substitution principle is from a 30-year-old paper written for PhD's. There are a ton of nuances to it that I cannot possibly cover in one blog post.

Putting this together, in TypeScript, you can assign/substitute an instance of a type’s subtype to/with an instance of that (super)type, but not the other way around.

> By the way I just realize the meaning of the word “substitute” changes radically depending on [the preposition that follows it](https://www.blog.voicetube.com/archives/55539). In this blog post, when I say "substitute A with B”, it means we end up with B instead of A.

### nominal and structural typing

There are two ways in which supertype/subtype relationships are enforced. The first one, which most mainstream statically-typed languages (such as Java) use, is called **nominal typing**, where we need to _explicitly_ declare a type is the subtype of another type via syntax like `class Foo extends Bar`. The second one, which TypeScript uses is **structural typing**, which doesn’t require us to state the relationship _explicitly_ in the code. An instance of `Foo` type is a subtype of `Bar` as long as it has all the members that `Bar` type has, even if `Foo` has some additional members.

Another way to think about this supertype-subtype relationship is to check which type is more strict, type `{name: string, age: number}` is more strict than the type `{name: string}` since the former requires more members defined in its instances. Therefore type `{name: string, age: number}` is a subtype of type `{name: string}`.
![alt](/art/blog/type-hierarchy-tree/supertype-subtype2.png)

## two ways of checking assignability/substitutability

One last thing before we dive into the type hierarchy tree in TypeScript:

1. **type cast**: you can just assign a variable of one type to a variable of another type to see if it raises a type error. [More on that later](#upcast--downcast).
2. the `extends` keyword -you can extend one type to another:
   ```typescript
   type A = string extends unknown ? true : false; // true
   type B = unknown extends string ? true : false; // false
   ```

## the top of the tree

Let's talk about the type hierarchy tree.

In TypeScript, there are two types are that the supertypes of all other types: `any` and `unknown`.

They accept any value of any type, encompassing all other types.
![alt](/art/blog/type-hierarchy-tree/top.png)

> This graph is by no means an exhaustive list of all the types that TypeScript has. Check out [the source code](https://github.com/microsoft/TypeScript/blob/main/src/compiler/types.ts#L642) of TypeScript if you are interested to see all the types that it currently supports.

### upcast & downcast

There are two types of type cast - **upcast** and **downcast**.
![alt](/art/blog/type-hierarchy-tree/cast.png)

Assigning a subtype to its supertype is called **upcast**. By the Liskov substitution principle, upcast is safe so the compiler lets you do it implicitly, no questions asked.

> There are exceptions where TypeScript disallows the implicit upcast. I will address that [at the end of the post](#situations-where-typescript-disallows-implicit-upcast).

You can think of upcast similiar to walking up the tree - replacing (sub)types that are more strict with their supertypes that are more generic.

For example, every `string` type is a subtype of the `any` type and the `unknown` type. That means the following assignments are allowed:

```typescript
let string: string = "foo";
let any: any = string; // ✅ ⬆️upcast
let unknown: unknown = string; // ✅ ⬆️upcast
```

The opposite is called **downcast**. Think of it as walking down the tree - replacing the (super)type that are more generic with their subtypes that are more strict.

Unlike upcast, downcast is not safe and most strongly typed languages don’t allow this automatically. As an example, assigning variables of the `any` and `unknown` type to the `string` type is downcast:

```typescript
let any: any;
let unknown: unknown;
let stringA: string = any; // ✅ ⬇️downcast - it is allowed because `any` is different..
let stringB: string = unknown; // ❌ ⬇️downcast
```

When we assign `unknown` to a `string` type, the TypeScript complier gives us a type error, which is expected since it is downcast so it cannot be performed without explicitly bypassing the type checker.

However TypeScript would happily allow us to assign `any` to a `string` type, which seems contradictory to our theory.

The exception here with `any` is because, in TypeScript the `any` type exists to act as a backdoor to escape to the JavaScript world. It reflects JavaScript’s overarching flexibility. Typescript is a compromise. This exception exists not due to some failure in design but the nature of not being the actual runtime language as the runtime language here is still JavaScript.

## the bottom of the tree

The `never` type is the bottom for the tree, from which no further branches extend.
![alt](/art/blog/type-hierarchy-tree/bottom.png)

Symmetrically, the `never` type behaves like the an anti-type of the top types - `any` and `unknow`, whereas `any` and `unknown` accept all values, `never` doesn’t accept any value (including values of the `any` type) at all since it is the subtype of all types.

```typescript
let any: any;
let number: number = 5;
let never: never = any; // ❌ ⬇️downcast
never = number; // ❌ ⬇️downcast
number = never; // ✅ ⬆️upcast
```

If you think hard enough, you might have realized that `never` should have an infinite amount of types and members, as it must be assignable or substitutable to its supertypes, i.e. every other type in the type system in TypeScript according to the Liskov substitution principle. For example, our program should behave correctly after we substitute `number` and `string` with `never` since `never` is the subtype of both `string` and `number` types and it shouldn’t break the behavior defined by its supertypes.

Technically this is impossible to achieve. Instead, TypeScript makes `never` an empty type (a.k.a an uninhabitable type): a type for which we cannot have an actual value at runtime, nor can we do anything with the type e.g. accessing properties on its instances. The canonical usecase for `never` is when we want to type a return value from a function that **never returns**.

> A function might not return for several reasons: it might throw an exception on all code paths, it might loop forever because it has the code that we want to run continuously until the whole system is shut down, like the event loop. All these scenarios are valid.

```typescript
function fnThatNeverReturns(): never {
  throw "It never returns";
}

const number: number = fnThatNeverReturns(); // ✅ ⬆️upcast
```

The assignment above might seem wrong to you at first - if `never` is an empty type, why is that we can assign it to a `number` type? The reason why such an assignment is fine is that the compiler knows that our function never returns so nothing will ever be assigned to the `number` variable. Types exist to ensure that the data is correct at runtime. If the assignment never actually happens at runtime, and the compiler knows that for sure in advance, then the types don’t matter.

There is another way to produce a `never` type is to intersect two types that aren’t compatible - e.g. `{x: number} & {x: string}`.

```tsx
type Foo = {
  name: string;
  age: number;
};
type Bar = {
  name: number;
  age: number;
};

type Baz = Foo & Bar;

const a: Baz = { age: 12, name: "foo" }; // ❌ Type 'string' is not assignable to type 'never'
```

> Edit from the future: I realized that there are some nuances to the resulting type - if disjoint properties are considered as discriminant properties (roughly, those whose values are of literal types or unions of literal types), the whole type is reduced to `never`. This is a feature introduced in TypeScript 3.9. Check out [this PR](https://github.com/microsoft/TypeScript/pull/36696) for details and motivation.

## types in between

We have talked about the top types and the bottom type. The types in between are just the other regular types you use everyday - `number`, `string`, `boolean`, composite types like `object` etc.

There shouldn’t be too much surprise as to how those types work once we have established the correct mental model:

- it is allowed to assign a string literal type e.g. `let stringLiteral: 'hello' = 'hello'` to a `string` type (upcast) but not the other way around (downcast)
- it is allowed to assign a variable holding an object of a type with extra properties to an object of a type with less properties when the existing properties’ types match (upcast) but not the other way around (downcast)

  ```typescript
  type UserWithEmail = { name: string; email: string };
  type UserWithoutEmail = { name: string };

  type A = UserWithEmail extends UserWithoutEmail ? true : false; // true ✅ ⬆️upcast
  ```

  - Or assign an non-empty object to an empty object:
    ```typescript
    const emptyObject: {} = { foo: "bar" }; // ✅ ⬆️upcast
    ```

However there is one type I want to talk more about in this section since people often confuse it with the bottom type `never` and that type is `void`.

In many other languages, [such as C++](https://docs.microsoft.com/en-us/cpp/cpp/void-cpp?view=msvc-170), `void` is used as the a function return type that means that function doesn't return. However, in TypeScript, for a function that doesn't return at all, the correct type of the return value is `never`.

So what is the type `void` in TypeScript? `void` in TypeScript is a supertype of `undefined` - TypeScript allows you to assign `undefined` to `void` (upcaset) but again, not the other way around (downcast)
![alt](/art/blog/type-hierarchy-tree/void.png)

This can also be verified via the `extends` keyword:

```typescript
type A = undefined extends void ? true : false; // true
type B = void extends undefined ? true : false; // false
```

> `void` is also an operator in javascript that evaluates the expression next to it to `undefined`, e.g. `void 2 === undefined // true`.

In TypeScript, the type `void` is used to indicate that the implementer of a function is making no guarantees about the return type except that it won’t be useful to the callers. This opens the door for a `void` function at runtime to return something other than `undefined`, but whatever it returns shouldn’t be used by the caller.

```typescript
function fn(cb: () => void): void {
  return cb();
}

fn(() => "string");
```

At first blush this might seem like a violation for the Liskov substitution principle since the type `string` is not a subtype of `void` so it shouldn’t be able to be substitutable for `void`. However, if we view it from the perspective of whether or not it alters the correctness of the program, then it becomes apparent that as long as the caller function has no business with the returned value from the `void` function (which is exactly the intended outcome of the `void` type), it is pretty harmless to substitute that with a function that returns something different.

This is where TypeScript is trying to be pragmatic and complements the way JavaScript works with functions. In JavaScript it is pretty common when we reuse functions in different situations with the return values being ignored.

Another cool tip about `void` type (credit to [@simey](https://twitter.com/simey/status/1497739267786694660)) is that you can annotate `this` with `void` when declaring a function:

```typescript
function doSomething(this: void, value: string) {
  this; // void
}
```

This prevents you from using `this` inside the function.

## situations where TypeScript disallows implicit upcast

Generally there are two situations, and to be honest it should be pretty rare to find yourself in these situations:

1. When we pass literal objects directly to function

```typescript
function fn(obj: { name: string }) {}

fn({ name: "foo", key: 1 }); // ❌ Object literal may only specify known properties, and 'key' does not exist in type '{ name: string; }'
```

2. When we assign literal objects directly to variables with explicit types

```typescript
type UserWithEmail = { name: string; email: string };
type UserWithoutEmail = { name: string };

let userB: UserWithoutEmail = { name: "foo", email: "foo@gmail.com" }; // ❌ Type '{ name: string; email: string; }' is not assignable to type 'UserWithoutEmail'.
```

## Further Reading

- [Assignability Matrix in the TypeScript official docs](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability)
