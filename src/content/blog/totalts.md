---
title: "Total TS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["TS", "Typescript"]
draft: false
description: "Typescript beginner to advance"
---

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

# 1: Type tansformations

## 1.1 Inference basics

## 1.1.1 Get the return type of a function

- Use `ReturnType<typeof myFunc>`

## 1.1.2 Extract Function Parameters Into A Type

- Use `Parameters<typeof myFunc>`

## 1.1.3 Extract The Awaited Result of a Promise

- Use `Awaited<ReturnType<typeof myFunc>>`

## 1.1.4 Create a Union Type From an Object’s Keys

- Use `keyof typeof myObj`

## 1.2 Unions and Indexing

## 1.2.1 Understand The Terminology Around Unions

- Union vs Discriminated unions vs enum

## 1.2.2 Extracting Members of a Discriminated Union

- Use `Extract<Type, Union>`

## 1.2.3 Excluding Parts of a Discriminated Union

- Use `Exclude<UnionType, ExcludedMembers>`

## 1.2.4 Resolve an Object’s Values as Literal Types

- Use `as const`.
- Can also be used for Arrays.

## 1.2.5 Create a UnionType From an Object's Values

- First convert to object literal type using as 'const'
- Use `typeof myObj[keyof typeof myObj]`

## 1.2.6 Create Unions out of Array Values

- First convert to Array literal type using as 'const'
- Then use `typeof myArr[number]` or `typeof myArr[0 | 1]`

## 1.3 Template Literals

## 1.3.1 Only Allow Specified String Patterns

- Use template literals for eg. `` type Route = `/${string}`  ``;

## 1.3.2 Extract Union Strings Matching a Pattern

- Use `Extract` with template literals.

## 1.3.3 Create a Union of Strings with all possible permutations of two unions

- Use template literals to combine the unions.

## Splitting a string into a tuple

- Use `ts-toolbelt` library method `Split<S, D>` to split a string into a tuple.

## Create an Object Whose Keys Are Derived From a Union

- Use `Record<UnionType, string>`

## Transform String Literals To Uppercase

- Use `Uppercase<>`

# 1.4: Type helpers (Generics)

- Generics are similar to functions in value world.

## 1.4.1 Creating a Maybe Type Helper

## 1.4.2 Ensure Type Safety in a Type Helper
