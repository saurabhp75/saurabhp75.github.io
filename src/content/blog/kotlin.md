---
title: "Kotlin language"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Kotlin"]
draft: false
description: "Introduction to Kotlin"
---

### Basics

- All files in kotlin starts with `package` specification at the top.
- The classes and objects in the source files can be accessed using `dot` after package description.
- The package and folder structure generally match, but it is not mandatory.
- Source file name follow `camel case`, with uppercase first letter, for eg `ProcessDeclarations.kt`.
- To print the type of class of the variable: `println(list.javaClass)`.
- Check if object is type of a class, `if (obj is classType)` or `if (obj !is classType)`.
- **Safely** cast int variable to string, `input as? String`, this returns null on failure, instead of throwing an exception.
- Deconstructing values: `val (capital, population) = Pair("Delhi", 1000)`
- Deconstructing values also works on data classes and lists.
- Deconstructing values also works in for loop.
- Base class for exceptions in Kotlin is **Throwable**
- In kotlin there are no fields, there are properties.
- **Kotlin sequences** are equivalent of **Java Streams**.
- Unlike Java Streams, Sequences are available on all platforms like android etc.
- Parallel processing is not yet available in sequences (check latest Kotlin version).

**Note**: `exitProcess` is a Kotlin standard library function that terminates the running instance of the JVM.

### Behaviour of == operator

- By Default `==` checks referential equality for objects, so this expression would evaluate as false.
- Whenever you define structural comparison, you also provide a `hashCode` definition.

```kotlin
open class Weapon(val name: String, val type: String)
println(Weapon("ebony kris", "dagger") == Weapon("ebony kris", "dagger")) // False
```

### Build tools in Kotlin

- We can use Kotlin with command line, Ant(build tool), IntelliJ Idea, Eclipse, Maven, Gradle.

### Running a Kotlin program

- Kotlin program file extension is `.kt`, after compilation it becomes `...Kt.class`

```shell
$ kotlinc main.kt -include-runtime -d main.jar
$ java -jar main.jar
```

### Package and class naming conventions

- Names of packages are always lower case and do not use underscores for eg. `org.example.project`.
- Names of classes and objects start with an upper case letter and use the camel case, for eg `DeclarationProcessor`.

### Conditional expressions, if-else, while

- Conditional expressions are often most intuitive when the value being assigned from each branch is of the same type.
- You can drop braces if a branch is a single expresion. See eg. below.
- `val auraColor = if (auraVisible) "GREEN" else "NONE"`.
- If/else can return a value. The value is the last statement in each of the block in if, else is returned
- Switch/case in Kotlin is replaced by **when()**.
- In when(), there is `else`, which is same as `default` of switch case.
- When() is very flexible.

### Exceptions

- try, catch, finally.
- try/catch can also return a value.

### Ranges in Kotlin

- `1..5` includes 1, 2, 3, 4, and 5. That is includes both bounds.
- Use of `in` in range, for eg `value in 1..5`.
- `5 downTo 1` creates a range that descends rather than ascends.
- `1 until 5` creates a range that excludes the upper bound.

### Extracting a code to function

- `Ctrl-click` (right-click) on the code you selected and choose Refactor → Extract Function.

### File level variables

- Variable that are not local to a function or class.
- File-level variables remain initialized until program execution stops.
- File-level variables must always be assigned when they are defined.
- A local variable only has to be initialized before it is used.

### Compile-Time Constants

- Values of val may change in special cases.
- Use `Compile-Time Constants` if you want absolutely immutable data.
- Use `const` modifier before `val` keyword to define compile time constant.
- Compile-time constant must be defined outside of any function, including main, because its value must be assigned at compile time.
- Compile-time constants also must be of one of the basic types(Int, Char, String, Float, Double etc).

### Naming convention

- var/val and function names : Use camel casing and an initial lowercase, for eg. playerName
- Compile time constants : Fully capitalizing and replacing spaces with underscores, for eg. MAX_EXPERIENCE.

# Functions in Kotlin

- The function parameters are always read-only, they do not support reassignment within the function body.
- If compiler can infer the return type of function the there is no need to specify it.
- Function parameters and local variables exist within the scope of the function body and cease to exist once the function completes.
- Functions are **first class citizen**.
- Functions in a class are **public** and **final** by default, so you **cannot override** them.
- You need to declare Functions as **open** to **override** them.
- After overriding function in derived class, we can declare it as `final` to avoid further overriding.
- For function with variable no. of parameters, use `vararg` and `spread operator`.

```kotlin
// Compile time constant
const val FIRST_NAME = "Saurabh"
const val MAX_COUNT = 8
val USER_NAME_FIELD = "UserName"

// Function with single expression as body
fun sayHello(name: String) = println("Hello, $name!")

// Function with variable no. of arguments
fun printString(vararg names:String) {
for (name in names) {
println(name)
  }
// if we want to pass this "names" to another function
// we need to use "spread operator",  "*" , i.e. "*names"
}
```

### Functions, properties and local variables naming conventions

- Start with a lower case letter and use the camel case and no underscores, for eg. `processDeclarations`.
- Names for `backing properties` start with underscore.
- Exception: Factory functions used to create instances of classes can have the same name as the abstract return type.
- Names of constants (properties marked with const, or top-level or object val properties with no custom get function that hold deeply immutable data) should use uppercase underscore-separated names.
- Kotlin has file level functions but Java has functions(methods) only as part of a class.

### Single expression functions short form

- Omit the return type, curly braces, and return statement.
- Use the assignment operator (=), followed by the expression.
- If a function body is a single expression, then parens from function body can be removed.

```kotlin
// A higher order function, runMyRunnable,
// taking a function parameter
fun runMyRunnable(runnable: () -> Unit) { runnable() }
// Invoke and pass a lambda
runMyRunnable { println("Hello world") }

// runMyRunnable1 is a higher order function,
// taking a function parameter and returning
// a lambda containing that function
fun runMyRunnable1(runnable: () -> Unit) = { runnable() }
runMyRunnable1 { println("Hello world") }()
```

### Unit functions

- If a function has no return statement then it return type is `Unit`, which can be omitted.

### Functions with nothing as return type

- Function is guaranteed to never successfully complete.
- The function will either throw an exception or for some other reason never return to where it was called.

```kotlin
// Always throws [NotImplementedError] stating
// that operation is not implemented.
public inline fun TODO(): Nothing = throw NotImplementedError()
```

### Use of TODO()

- Indicates that the function containing TODO() has some "todo".
- Function containing TODO() can have a different return type.
- Statement after TODO() is never executed.

### Function overloading

- By using default parameter(s).
- By using same function name and return type but different parameters.
- Use of `@JvmOverloads` for Java interoperability.

### Function names using backticks

- We can use any characters or reserved keyword using backticks.
- Used in testing.

```kotlin
fun `**~prolly not a good idea!~**`() {
...
}
```

### Anonymous function

- Defined using braces {}, and called using ().
- Anonymous function does not require, or even allow, except in rare cases, the return keyword to output data.
- Anonymous functions implicitly, or automatically, return the last line of their function definition, omitting the return keyword.
- Function type syntax: Consists of two parts: the function’s parameters, in parentheses, followed by its return type, delimited by the arrow (->).
- The parentheses is not required when defining parameters in definition of anonymous function.

```kotlin
{// Defining and invoking anonymous function
val currentYear = 2018
"Welcome to SimVillage, Mayor! (copyright $currentYear)"
}()

fun main(args: Array<String>) {
  // Notice, no parenthesis around parameter in definition
  val greetingFunction: (String) -> String = { playerName ->
    val currentYear = 2018
    "Welcome to SimVillage, $playerName! (copyright $currentYear)"
  }
  println(greetingFunction("Guyal"))
}
```

### The `it` keyword

- Defining anonymous functions that accept `exactly one` argument requires no parameter name and arrow in the beginning.
- Above code can be written using `it` as below.

```kotlin
fun main(args: Array<String>) {

  val greetingFunction: (String) -> String = {
    val currentYear = 2018
    "Welcome to SimVillage, $it! (copyright $currentYear)"
  }
  println(greetingFunction("Guyal"))
}
```

### Lambdas vs anonymous function

- Anonymous functions are also called `lambdas`.
- Anonymous functions definitions are called `lambda expressions`.
- What an anonymous function returns is called a lambda result.

### Lambda Expression in Kotlin

- Functions can be passed as parameters to functions using `::functionName`.
- Better approach is to pass a lambda expression.
- Lambda function syntax, `{x, y -> x + y}`
- If lambda function takes only one parameter, we can use **it**.
- For eg,` {x -> x _ x}` is same as `{it _ it}`
- Alternate syntax if last parameter is a function/lambda expression.
- Eg, `unaryOperation(3, {it * it})` is same as `unaryOperation(3){it * it}`.
- An alternate to lamba function is **anonymous function**.
- For eg, `unaryOperator(3, fun(x:Int):Int { return x * x})`.`

### Lambda functions usage

- In older Java versions, we used anonymous inner class for “When an event happens, run this handler” or
  “Apply this operation to all elements in a data structure.” For these cases, instead of declaring a class and passing an instance
  of that class to a function, you can pass a function directly. So lambda can be used as an alternative to an anonymous object with
  only one method.
- Another classical use of lambda expressions: working with collections.

```kotlin
val people = listOf(Person("Alice", 29), Person("Bob", 31))
println(people.maxBy { it.age })
Person(name=Bob, age=31)
```

- If a lambda just delegates to a function or property for eg. people.maxBy(Person::age).
- Most of the things we typically do with collections in Java (prior to Java 8) can be
  better expressed with library functions taking lambdas or member(property or method) references.

### Syntax for lambda expressions

- A lambda expression is always surrounded by curly braces.
- There are no parentheses around the arguments.
- The arrow separates the argument list from the body of the lambda.
- You can store a lambda expression in a variable and then treat this variable like a normal function.
- `{ x: Int, y: Int -> x + y }`

### Running a Lambda function

- Using brackets after the body: `{ println(42) }()`.
- Using run library function: `run { println(42) }`.

### Breaking down syntax

- `people.maxBy({ p: Person -> p.age })`.
- The type can be inferred from the context and therefore omitted: `people.maxBy({ p -> p.age })` .
- You don’t need to assign a name to the lambda argument in this case.
- You can move a lambda expression out of parentheses if it’s the last argument in a function call: `people.maxBy(){ p -> p.age }`.
- When the lambda is the only argument to a function, you can remove the empty parentheses from the call: `people.maxBy { p -> p.age }`.
- if the context expects a lambda with only one argument, and its type can be inferred: `people.maxBy { it.age }`.

### Lambda, capturing variables from the context

```kotlin
fun printProblemCounts(responses: Collection<String>) {
  var clientErrors = 0
  var serverErrors = 0
  responses.forEach {
    if (it.startsWith("4")) {
      clientErrors++
    } else if (it.startsWith("5")) {
      serverErrors++
    }
  }
  println("$clientErrors client errors, $serverErrors server errors")
}
```

### Member references, a feature that lets you easily pass references to existing functions

- A member reference has the same type as a lambda that calls that function, so you can use the two interchangeably.
- It’s convenient to provide a member reference instead of a lambda that delegates to a function taking several parameters.
- `people.maxBy { person: Person -> person.age }` can be replaced by
- `people.maxBy (Person::age)`.

### Anonymous functions

- Used to pass function as arguments and/or return function as value.

### Local functions: function with in a function

- Local function allows code reuse(?).

### Anonymous functions Vs lambda expression

- Anonymous function allows mutliple return calls.
- Anonymous function: multiple returns, can specify return type.
- Like named functions, anonymous functions can contain any number of expressions. The returned value of the function is the result of the final expression.

### Lambda: Return and local return

- Use label to perform local returns from lambdas.
- return@mylabel, label@ function definition.
- Non local return is allowed only from inline function.
- Anonymous function does a local return by default. Whereas lambda does a non local return by default.

### Tail recursion

- Allows for TCO(tail call optimization).
- Tail recursive function: the last call should be to the function itself.
- Tail recursive function can be optimised in kotlin usin the keyword "tailrec".

### Lambda extension: lambda with receivers

This help in creating a DSL like code. You can access the class properties in the lambda function.

### Invoking instances in Kotlin

- Use member function "invoke" with "operator" keyword.
- Now we can use "()" on the instance of the class, eg classInstance().
- Lambda extension and Instance invoking lets you create DSL which is used in Android development and Gradle scripting.
- Also groovy style Kotlin HTML builders.
- Also JSON DSL and SQL dialects.

### Function Inlining

- Lambda is represented as an object instance on the JVM.
- The JVM also performs memory allocations for all variables accessible to the lambda.
- This introduce memory overhead that can in turn cause a performance impact.
- Inlining removes the need for the JVM to use an object instance and to perform variable memory allocations for the lambda.
- To inline a lambda, you mark the function that accepts the lambda using the `inline` keyword.
- It is generally a good idea to mark functions that accept lambdas as arguments with the inline keyword.
- One situation where inlining is not permitted, for example, is a `recursive` function that accepts a lambda.
- "inline" keyword, used for flattening a higher order function which takes lambda expression as parameter. Helps in optimization, no call stack.
- Optimize higher order function by inlining calls.
- Overhead, no anonymous class for lambda expression in parameter.
- You can use "noinline" for lambda expression if you don't want to inline it.
- Inline doesn't work if you assign lambda to a variable (ie store it).
- Inlining is good when function body is small.
- Stack trace and debugging for inline functions. Goto call site/function body.

### Infix functions

- Applied to member function and extension function with single parameter.
- Use "infix" keyword in function definition.
- Infix function allows to create more fluent call, for eg. `1 to "name"` is same as `Pair(1, "name")`.

### Function References

- They can be passed as arguments instead of lambda functions.
- Function reference converts a named function (a function defined using the fun keyword) to a value that can be passed as an argument.
- You can use a function reference anywhere you use a lambda expression.
- To obtain a function reference, you use the `::` operator with the function name you would like a reference for.

### Using Java functional interfaces

- Interface like OnClickListener has only one abstract method. Such interfaces are called functional interfaces,
  or SAM interfaces, where SAM stands for single abstract method.
- You can pass a lambda to any Java method that expects a functional interface.

### Kotlin’s Lambdas Are Closures

- Difference in Kotlin closures is that internal function **captures value everytime**.
- This is unlike other languages where value is captured only once.

### Kotlin vs Java: Functional programming

- Java 8 includes support for OOP & lambda expressions but does not include the ability to define a function as a parameter to a function or variable.
- Instead, Java provides anonymous inner classes – nameless classes that are defined within another class to implement a single method definition.
- You can pass anonymous inner classes as an instance, like a lambda.

```kotlin
public interface Runnable {
  public abstract void run();
}

fun runMyRunnable(runnable: () -> Unit) = { runnable() }
runMyRunnable { println("hey now") }()
```

# Nullability

- Some elements in Kotlin can be assigned a value of null, and some cannot.
- We say that the former are nullable and the latter are non-nullable.
- Kotlin variables can't hold null values by default.
- By default Kotlin is null safe.
- You cannot assign null to any default variable type.
- A nullable variable has to be declared using "?" (**elvis operator**).
- For e.g. `var personName: String? = "Saurabh"`.
- Implicit also works eg. `var personName = null`.
- Calling methods on nullable variable, eg. `personName?.length`.
- You can **override compiler** error by using "!!" personName!!.length

```kotlin
val languageName: String = null //Invalid code, fails to compile
val languageName: String? = null //Valid code
```

### Use of `?`, `let` and `!!` with nullable values

### Null coalescing/Elvis operator, `?:`

- If the thing on the lefthand side of me is null, do the thing on the righthand side instead.

### Precondition functions

- **checkNotNull()**: Throws an `IllegalStateException` if argument is null. Otherwise returns the non-null value.
- **require()**: Throws an `IllegalArgumentException` if argument is false.
- **error()**: Throws an `IllegalArgumentException` with a provided message if argument is null. Otherwise returns the non-null value.
- **requireNotNull()**: Throws an `IllegalArgumentException` if argument is null. Otherwise returns the non-null value.
- **assert()**: Throws an `AssertionError` if argument is false and the assertion compiler flag is enabled.

### String functions

- **String.indexOf()**: Gives index of a a character in string.
- **String.subString(IntRange)**: Returns a substring with using range.
- **String.split()**: Returns list of strings split on the character provided.

### Destructuring

- val (type, name, price) = "shandy, Dragon's Breath, 5.91".split(',')

### String Templates

- We can use a simple variable(using `$`) or an arbitrary expression(using `${expression}`) in a string.

### Strings in kotlin are immutable.

- The replace function below creates a new string instead of mutating the original string.
- Though the string variables can be reassigned.

### Using replace method of string

```kotlin
fun toDragonSpeak(phrase: String) =
  phrase.replace(Regex("[aeiou]")) {
    when (it.value) {
      "a" -> "4"
      "e" -> "3"
      "i" -> "1"
      "o" -> "0"
      "u" -> "|_|
      "else -> it.value
      }
  }
```

### Specifying unicode characters

- Use '\u' prefix.
- val myChar: Char = '\u0950'

### Iterating over a String

- Use forEach to iterate over every character in the string

```kotlin
"Dragon's Breath".forEach {
  println("$it\n")
  }
```

# Numbers in Kotlin

| Type   | Bits | Max Value              | Min Value            |
| ------ | ---- | ---------------------- | -------------------- |
| Byte   | 8    | 127                    | -128                 |
| Short  | 16   | 32767                  | -32768               |
| Int    | 32   | 2147483647             | -2147483648          |
| Long   | 64   | 9223372036854775807    | -9223372036854775808 |
| Float  | 32   | 3.4028235E38           | 1.4E-45              |
| Double | 64   | 1.7976931348623157E308 | 4.9E-324             |

- Operation between Ints will give an Int, If you want decimal values use one operand as double/float.
- All numeric types in kotlin are signed.
- Decimal number is `Double` type by default.
- There is not implicit widening conversions in kotlin, for eg., a function with a double parameter will not accept float or int parameter.

### Every number type supports the following conversions:

- `toByte()`: Byte
- `toShort()`: Short
- `toInt()`: Int
- `toLong()`: Long
- `Explicit conversions`???
- `toFloat()`: Float
- `toDouble()`: Double
- `toChar()`: Char

### No implicit conversions of types while assignment

- Smaller types are NOT implicitly converted to bigger types.
- We cannot assign a value of type Byte to an Int variable without an explicit conversion.

### Implicit conversion of types on arithmetic operation

- Type is inferred from context and Arithmetical operations are overloaded for appropriate conversions, for example

```kotlin
val l = 1L + 3 // Long + Int => Long
```

### Literal constants

- **Integral**: eg. 100
- **Long integer**: eg. 100L
- **Hexadecimal**: Preceded by `0X` eg. 0X0F
- There are no octal literals in kotlin

```kotlin
// Use of underscore in number constants
val oneMillion = 1_000_000
val creditCardNumber = 1234_5678_9012_3456L
val socialSecurityNumber = 999_99_9999L
val hexBytes = 0xFF_EC_DE_5E
val bytes = 0b11010010_01101001_10010100_10010010
```

### Boxing/unboxing/autoboxing

- **Boxing**: Conversion of primitve type to an object.
- **Unboxing**: Conversion of object type to an primitve.
- **Autoboxing**: Automatic conversion of primitve type to an object.

**Note**: In JVM, the numbers are internally stored as primitive types, unless they are nullable or generics is involved.

### Arithmetic operations

- Division of integers gives an integer.
- Division of integer and a float gives float/double.

### Converting a String to a Numeric Type

- `String.toInt()`:
- `toLong()`:
- `toBigDecimal()`:
- `String.toIntOrNull()`: Return null instead of exception.
- `String.toIntOrNull()`: Return null instead of exception.
- `String.toFloat()`
- `String.toDouble()`
- `String.toDoubleOrNull()`: Return null instead of exception.

### Format double values

- `println("Balance: ${"%.2f".format(4.1899999999)}")`

### Converting doubles to Int

- `Double.toInt()`
- `Double.roundToInt()`

### Bit manipulation on Int

- Bitwise operations Don't have a special character, instead use function name in infix form
- They are available for Int and Long only.
- `Integer.toBinaryString()`: Integer.toBinaryString(42)
- `shl()`: 42.shl(2)
- `shr()`: 42.shr(2)
- `ushr(bits)`: unsigned shift right
- `inv()`: 42.inv()
- `xor()`: 42.xor(33)
- `and()`: 42.and(10)
- `or(bits)`: bitwise or

```kotlin
val x = (1 shl 2) and 0x000FF000
```

# Standard Functions in Kotlin

- **receiver**: The subject of an extension function.
- Kotlin’s standard functions are extension functions under the hood.

### Apply function

- Can be thought of as a `configuration function`.
- It allows you to call a series of functions on a receiver to configure it for use.
- After the lambda provided to apply executes, apply returns the configured receiver.
- Apply passes nothing to lambda you provide.
- All the function calls within the lambda are now called relative to the receiver, ie. they are implicitly called on the receiver.

```kotlin
val menuFile = File("menu-file.txt")
menuFile.setReadable(true)
menuFile.setWritable(true)
menuFile.setExecutable(false)

// Above can be written as
val menuFile = File("menu-file.txt").apply {
  setReadable(true) // Implicitly, menuFile.setReadable(true)
  setWritable(true) // Implicitly, menuFile.setWritable(true)
  setExecutable(false) // Implicitly, menuFile.setExecutable(false)
}
```

### Run function

- Similar to `apply` in that it provides the same relative scoping behavior.
- However, unlike apply, run does not return the receiver, but returns the lambda result.
- Run can also be used to execute a function reference on a receiver.
- There is a second flavor of run that is not called on a receiver.

```kotlin
fun nameIsLong(name: String) = name.length >= 20
// run with a function reciever
"Madrigal".run(::nameIsLong)  // False

// Less common use of run
val status = run {
          if (healthPoints == 100) "perfect health" else "has injuries"
      }
```

### Let function

- `let` scopes a variable to the lambda provided and makes the keyword `it`.
- Passes the receiver to the lambda you provide.
- Returns the last line of the lambda (the lambda result).

### Also function

- `also` function works very similarly to the `let` function.
- Just like let, `also` passes the receiver you call it on as an argument to a lambda you provide.
- But also returns the receiver, rather than the result of the lambda.
- Since also returns the receiver instead of the result of the lambda, you can continue to chain additional function calls on to the original receiver.

### Let vs apply

- `let` passes the receiver to the lambda you provide, but `apply` passes nothing.
- `apply` returns the current receiver once the anonymous function completes. `let`, on the other hand, returns the last line of the lambda (the lambda result).

### With function

- `with` is a variant of run. It behaves identically, but it uses a different calling convention.
- With requires its argument to be accepted as the first parameter rather than calling the standard function on a receiver type.
- The second parameter is the lambda.
- It is not used often due to different syntax than other library functions.

```kotlin
val nameTooLong = with("Polarcubis, Supreme Master of NyetHack") {
          length >= 20
}
```

### TakeIf function

- `takeif` evaluates a condition providedin a lambda, called a `predicate`, that returns either true or false depending on the conditions defined.
- If the condition evaluates as true, the receiver is returned from takeIf. If the condition is false, null is returned instead.

```kotlin
// with takeIf
val fileContents = File("myfile.txt")
.takeIf { it.canRead() && it.canWrite() }
?.readText()

// Without takeIf
val file = File("myfile.txt")
val fileContents = if (file.canRead() && file.canWrite()) {
    file.readText()
} else {
    null
}
```

### TakeUnless function

- It returns the original value(receiver) if the condition you define is false.
- It is confusing and not used often, takeIf is used instead.

| Function   | Passes receiver to lambda as argument? | Provides relativescoping? | Returns                      |
| ---------- | -------------------------------------- | ------------------------- | ---------------------------- |
| let        | Yes                                    | No                        | Lambda result                |
| apply      | No                                     | Yes                       | Receiver                     |
| run        | No                                     | Yes                       | Lambda result                |
| with       | No                                     | Yes                       | Lambda result                |
| also       | Yes                                    | No                        | Receiver                     |
| takeIf     | Yes                                    | No                        | Nullable version of receiver |
| takeUnless | Yes                                    | No                        | Nullable versionof receiver  |

# Collections, List, Set, and Map

- lists, sets, and maps come in two distinct varieties: `mutable` and `read-only`.
- Collections are immutable by default.

### parameterized type

- The type defined for the contents of a collection.
- For eg. List\<String\>.

### List

- Lists hold an ordered collection of values and allow duplicate values.
- **listOf()** returns a read-only list. The read-only nature of the list has nothing to do with the val or var keyword.
- List is a generic type.

### Immutable list creation

- Declare list of strings : `var list = listOf("string1", "string2"..)`
- Declare list of strings : `val list = Arrays.asList("string1", "string2"..)`
- Declare empty list of strings : `var list = emptyList<String>() or listOf()`
- Declare list of numbers : `val list = 1..100`

### Accessing a list’s elements

- Using the element’s index and the `[]` operator.
- First and last elements: `List.first()`, `List.last()`.
- Attempting to access an element at an index that does not exist throws an `ArrayIndexOutOfBoundsException`.

### Accessing a list’s elements safely

- No exception, lambda as an alternative: `List.getOrElse(index) {"Element doesn't exist"}`.
- No exception, null as an alternative: `List.getOrNull(index)`.

```kotlin
val patronList = listOf("Eli", "Mordoc", "Sophie")
patronList.getOrElse(4) { "Unknown Patron" }

val fifthPatron = patronList.getOrNull(4) ?: "Unknown Patron"
```

### Checking the contents of a list

- List.contains(): Check whether an element is present in the list.
- List.containsAll(List): Check whether elements in the given list are present.

### Mutable list

- Use `mutableListOf()` function. You can add or delete elements in this list.
- `[]=`: Set operator, Sets the value at the index.
- `+=`: Adds an element or collection of elements to the list.
- `-=`: Removes an element or collection of elements from the list.
- `remove(element)`: Remove an element from the list.
- `add(element)`: Add an element at the end of the list.
- `add(index, element)`: Add an element at given index of the list.
- `toList()`: Method on mutable list to change to read only list.
- `addAll(collection)`: Adds all of another collection with contents of the same type to the list.
- `clear()`: Removes all the elements from the list.
- `removeIf{}`: Removes elements from the list based on a predicate lambda.
- `shuffled()`: Shuffles the contents of a list.

### Iterting a list

```kotlin
val patronList = listOf("Alex", "Tony", "Rocky", "Tina")
  // Normal iteration
  for (patron in patronList) {
      println("Good evening, $patron")
  }
  // functional style iteration
  patronList.forEach { println("Good evening, $it!")}
  // Iterating with index
  patronList.forEachIndexed {index, s -> println("$s you're $index")}
```

### Changing between mutable and immutable list

- Use `toList()` or `toMutableList()` method.

### What is an iterable

- An iterable allows traversing the elements it holds, performing some action for each element.
- A collection supporting `forEach()` and `forEachIndexed()` methods.
- List ,Set, Map, IntRange(ranges like 0..9)

### Reading a File into a List

```kotlin
// readText() returns the contents of the file
// as a String. Then split on newline
val fileList = File("Data/tavern-menu-data.txt")
        .readText()
        .split('\n').forEach { println(it) }
```

### Destructuring a list

- List offers the ability to destructure up to the `first five elements` it contains.
- Destructuring, allows you to declare and assign multiple variables in a single expression.

```kotlin
val (type, name, price) = menuData.split(',')

// Using _ to skip unwanted elements
val (type, _, price) = menuData.split(',')
```

# Sets in Kotlin

- Unlike list enforces unique element.
- Set does not index its contents, you cannot use `[]` operator with index to access elements.
- Set also have a mutable version.

### Creating a set

```kotlin
//Empty Set, notice type specification
val stars = setOf<String>()

val planets = setOf("Mercury", "Venus", "Earth")
```

### Set methods

- `contains(element)`: Check whether an element is present in the Set.
- `containsAll(collection)`: Check whether elements in the given collection are present.

### Accessing Set elements

- `elementAt(index)`: Access element at the given index. This method is very slow as the set iterates to the index you provide, one element at a time.
- So if you want index-based access, you probably want a List, not a Set.

### MutableSet

- Supports adding and removing elements, likeMutableList, it does not provide index-based mutator functions.

### Mutable set mutator functions

- `add(element)`: Adds an element to set.
- `addAll(collection)`: Adds the elements of the collection to the set.
- `+=`: Adds the value(s) to the set.
- `-=`: Removes the value(s) from the set.
- `remove(element)`: Removes the element from the set.
- `removeAll(collection)`: Removes all elements in another collection from the set.
- `clear()`: Removes all elements from the set.

### Using while loops to iterate over collection

- It is more flexible as they can represent state that is not purely based on iteration.

### Use `break` to break out of any loop

### Collection Conversion

- Convert a list to a set using `toSet()` to drop the non-unique elements in a list.
- To drop duplicate element in a list, use `distinct()` as it calls `toSet()` then `toList()` internally.

### Arrays in Java and Kotlin

- In Java we have arrays of primitive types, like `intArray`.
- Kotlin includes a number of reference types, called Arrays, that compile down to Java primitive arrays.
- Arrays are included primarily to support interoperability between Kotlin and Java.
- Unlike a List, an Array is backed by a primitive type when compiled to bytecode.
- A Kotlin collection is a better choice in most cases because collections provide the concept of “read-only-ness” versus “mutability” and support a more robust set of features.

| Array type   | Creation function |
| ------------ | ----------------- |
| IntArray     | intArrayOf        |
| DoubleArray  | doubleArrayOf     |
| LongArray    | longArrayOf       |
| ShortArray   | shortArrayOf      |
| ByteArray    | byteArrayOf       |
| FloatArray   | floatArrayOf      |
| BooleanArray | booleanArrayOf    |
| Array        | arrayOf           |

**Note**: Array compiles to a primitive array that holds any reference type.

### Creating empty collection

- You need to specify parametrized type as it cannot be inferenced from the content.

# Maps in Kotlin

- Read-only by default, use parameterized types to tell the compiler the type of their contents.
- Maps also support iteration.
- Map's elements consist of key-value pairs, and instead of index-based access using an integer, a map provides key-based access.
- Keys are unique and identify the values in the map.
- The values, on the other hand, need not to be unique.
- The keys in a map must all be of the same type.
- The values in a map must be of the same type.
- When a map is printed, it is shown in curly braces, while lists and sets are both shown in square brackets.

### Specifying type of a map

- For eg `val employeeMap: Map<String, Int>`

### Creating a Map

- Use `mapOf()` and `mutableMapOf()`

```kotlin
// Using to keyword
val patronGold = mapOf("Eli" to 10.5, "Mordoc" to 8.0, "Sophie" to 5.5)

// Using Pair() method
val patronGold = mapOf(Pair("Eli", 10.75),
  Pair("Mordoc", 8.00),
  Pair("Sophie", 5.50))
```

### To keyword in kotlin

- It is a special type of function that allows you to drop the dot and the parentheses around its arguments.
- The `to` function converts the values on its lefthand and righthand sides into a Pair.
- A pair is a type for representing a group of two elements.
- Maps are built using key-value pairs.

### Tuples

- Tuples has been **removed** from Kotlin.
- Tuples are implemented using **Pair()** and **Triple()**.
- Bigger Tuples can be constructed using data classes.

### Adding a duplicate key in map

- The existing pair will be replaced with the new one.

### Map accessor functions (Accessing Map Values)

- `[key]` (get/indexoperator): Gets the value for a key; return snull if the key does not exist.
- `getValue(key)`: Gets the value for a key; throws an exception if the key provided is not in the map.
- `getOrElse(key){value}`: Gets the value for the key or returns a default using an anonymous function.
- `getOrDefault(key, default)`: Gets the value for the key or returns a default using a value you provide.

### Mutable map mutator functions

- `=`(assignment operator): Adds or updates the value in the map for the key specified.
- `+=`(plus assign operator): Adds or updates an entry or entries inthe map based on the entry or map specified.
- `put(key, value)`: Adds or updates the value in the map for the key specified.
- `putAll(listOf(Pairs))`: Adds all of the key-value pairs provided to the map
- `getOrPut(key){value}`: Adds an entry for the key if it does not exist already and returns the result, otherwise returns the existing entry.
- `remove(key)`: Removes an entry from the map and returns the value.
- `-`(minus operator): Returns a new map, excluding the entries specified.
- `-=`(minus assign operator): Removes entry or map of entries from the map.
- `clear()`: Removes all entries from the map.

# Kotlin collections summary

| Collection type | Ordered? | Unique? | Stores          | Supports destructuring? |
| --------------- | -------- | ------- | --------------- | ----------------------- |
| List            | Yes      | No      | Elements        | Yes                     |
| Set             | No       | Yes     | Elements        | No                      |
| Map             | No       | Keys    | Key-value pairs | No                      |

# Classes in Kotlin

### Defining Classes

- A class can be defined in its own file or alongside other elements, like functions or variables.
- Defining a class in its own file gives it room to grow as the program scales up over time.
- A class is often declared in a file matching its name, but it does not have to be.
- You can define multiple classes in the same file.
- Classes are **first class citizen**.
- **No need** of **new** operator when **instantiating** classes.
- Classes by **default** are **final**, so you cannot inherit from them. You need to declare class as **open** to **inherit** from them.
- Secondary constructor should always call primary constructor first either explicitly or implicitly (in case primary constructor is not defined).

### Property vs field

- Property has getters and setters and are accessible publicly.
- Field is private and has no getters and setters.
- Java has fileds but Kotlin do not.
- You can define get() and set() for a property using `field` keyword.
- Field can back only one property.

### Properties

- Classes represent **state** using **properties**.
- A property is a class-level variable that can include a getter, a setter, and a backing field.
- To customize how a property is referenced, you can provide a custom getter and setter. For example, if you would like to expose a property’s getter while restricting access to its setter, you can designate that setter as private.
- When an instance of a class is constructed, all of its properties must have values. This means that, unlike other variables, class properties must be assigned an initial value.
- Like normal variables, properties can represent either read-only or mutable data using the val and var keywords, respectively.
- Properties model the `characteristics` of each instance of a class.
- For each property you define, Kotlin will generate a `field`, a `getter`, and, if needed, a `setter`.
- A field is where the data for a property is stored. You cannot directly define a field on a class. Kotlin encapsulates the fields for you, protecting the data in the field and exposing it via getters and setters.
- A setter is generated only when a property is writable, that is, when the propertyis a `var`.
- You can override the default generated getter and setter, when you want to specify how the data will be read or written.
- By default, the visibility of a property’s getter and setter match the visibility of the property itself.
- A getter or a setter’s visibility cannot be more permissive than the property onwhich it is defined. This implies that you can `restrict` access to a property via a getter or a setter,but they are not intended for making properties more visible.
- We use the terms “writable” and “read-only” rather than “mutable” and “immutable” for properties as for read-only computed properties the value may change on each access, for eg a randomly computed property.

### Concept of backing properties

- If a class has two properties which are conceptually the same but one is part of a public API and another is an implementation detail.

```kotlin
class C {
    private val _elementList = mutableListOf<Element>()

    val elementList: List<Element>
         get() = _elementList
}
```

### Constructing Instances

- A class's primary constructor is called by suffixing the class name with parentheses, creating an instance.
- The parenthesis for primary constructor in class definition are optional if there are no constructor arguments.
- A body of a class is optional (but then class will not be of much use).
- By default, any function or property without a visibility modifier is public.

```kotlin
// Code below is valid
fun main(args: Array<String>) {
    class Player
    val player = Player()
}
```

### Visibility and Encapsulation

- A `public` class function can be invoked anywhere in the program
- A `private` class function cannot be invoked outside of the class on which it is defined.
- This idea of restricting visibility to certain class functions or properties drives a concept in object-oriented programming known as `encapsulation`.

| Modifier        | Description                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public(default) | The function or property will be accessible by code outside of the class. By default, functions and properties without a visibility modifier are public. |
| private         | The function or property will be accessible only within the same class.                                                                                  |
| protected       | The function or property will be accessible only within the same class or its subclass.                                                                  |
| internal        | The function or property will be accessible within the same module                                                                                       |

**Note**: Unlike Java, `package private` visibility level is not included in Kotlin.

### Top level declarations:

2. **private**: Available anywhere inside the file containing declaration
3. **internal**: Available anywhere in the same module.

### Class declaration options

- Syntax: `class ClassName` (shortest form).
- **Init block** in class declaration run when instance is created. Class can have multiple init blocks.
- Properties in a class can be accessed directly instead of getter and setter (unlike java).
- All **init blocks** run before **secondary constructor**.
- **Getters and setters** are **automatically defined** for properties in kotlin.
- You can override default getter and setter in kotlin.
- Classes in kotlin are final(closed) by default. You need to "open" it to inherit from it. Same holds true for properties.
- A factory can have private primary constructor(See below). It restricts the user from invoking primary constructor.
- `class myClass private constructor (val prop1: String)`.
- Static class declared using object don't have constructors.

```kotlin
// Overriding default getter & setter
fun main(args: Array<String>) {
    class Player {
        var name = "madrigal"
            get() = field.capitalize()
            private set(value) {
                field = value.trim()
            }
    }
}
```

### Computed properties

- A computed property is a property that is specified with an overridden get and/or set operator in a way that makes a `field` unnecessary.
- It has no initial or default value and no backing field to hold a value.

```kotlin
// Computed property
fun main(args: Array<String>) {
    class Dice() {
        val rolledValue
            get() = (1..6).shuffled().first()
    }
}
```

### Using Packages in Kotlin

- A package is like a folder for similar elements that helps give a logical grouping to the files in your project.
- For eg., the `kotlin.collections` package contains classes to create and manage lists and sets.
- Packages allow you to organize your project as it becomes more complex, and they also prevent naming collisions.
- Name your package in reverse-DNS style for eg. `com.bignerdranch.nyethack`. This scales with the number of applications that you write.
- Organizing code using classes, files, and packages will help you to make sure that your code is clear as your application grows in complexity.

### Guarding Against Race Conditions

- The compiler prevents the code from compiling because of the possibility of what is known as a `race condition`.
- A race condition occurs when some other part of your program simultaneously modifies the state of your code in a manner that leads to unpredictable results.

```kotlin
// gaurding against race condition
fun main(args: Array<String>) {
    class Weapon(val name: String)
    class Player {
        var weapon: Weapon? = Weapon("Ebony Kris")
        fun printWeaponName() {
            if (weapon != null) {
                // Compiler error in line below
                // Smart cast to weapon is impossible as
                // it is a mutable property and could change
                // after the null check
                println(weapon.name)
            }
        }

        // This will not give compile error
        // as "it" is a local variable, accessible
        // only within the lambda scope.
        fun printWeaponName1() {
            weapon?.also { println(it.name) }
        }
    }

    fun main(args: Array<String>) {
        Player().printWeaponName()
    }
}
```

### Private visibility vs internal visibility

- By default, Java uses `package private` visibility.
- It means that methods, fields, and classes with no visibility modifier are usable from classes belonging to the same package only.
- In practice, it is easily circumvented by creating a matching package and adding a class to it.
- A visibility level Kotlin provides that Java does not is the `internal` visibility level.
- Internal visibility marks a function, class, or property as public to other functions, classes, and properties within the same module.
- A `module` is a discrete unit of functionality that can be run, tested, and debugged independently.
- Modules include such things as source code, build scripts, unit tests, deployment descriptors, and so on.
- Modules can also depend on other modules for source files and resources.
- Internal visibility is useful for sharing classes within a module while disallowing access from other modules, which makes it a great choice for building libraries in Kotlin.

# Initialization in Kotlin

- When you initialize a variable, property, or class instance, you assign it an initial value to make it ready for use.
- `Initialization` is used to mean “everything required to make a variable, property, or class instance ready to use,”
- `Instantiation` tends to be limited to “creating an instance of a class.”

## Constructors

### Primary constructors

- Allows its caller to specify the initial values that an instance of a class will require in order to be constructed.
- Those values are then available for assignment to the properties defined within the class.
- You can also specify `default values` that should be assigned if an argument is not provided for a specific parameter.
- `Named arguments` can be used while calling a constructor just like functions, they allow you to specify the arguments to a function or constructor in any order.
- Primary constructor is optional.
- To hide the constructor being called use `private constructor` keyword(s) after class keyword.
- This way you can force the user to use only the factory method of the class for creatng instances of that class.
- If the primary constructor has annotations or visibility modifiers, the `constructor` keyword is required, and the modifiers go before it.

```kotlin
// Class with "constructor" keyword due to annotation
// and visibility modifier
class Customer public @Inject constructor(name: String) { /*...*/ }
```

### Why prepend variable names with underscores

- Temporary variables, including parameters that you do not need to reference more than once, are often given a name starting with an underscore to signify that they are single-use.

```kotlin
fun main(args: Array<String>) {
  // Properties defined in the class body
  class Player(_name: String,
            _healthPoints: Int,
            _isBlessed: Boolean,
            _isImmortal: Boolean) {
    var name = _name
        get() = field.capitalize()
        private set(value) { field = value.trim() }
      var healthPoints = _healthPoints
      val isBlessed = _isBlessed private
      val isImmortal = _isImmortal
    }
}
```

### Defining properties in a primary constructor

- For properties that use the default getter and setter, you can specify both in one definition.
- This is preferred way as it leads to less duplication of code.

```kotlin
fun main() {
  // Properties defined in primary constructor
  // Primary constructor with default argument
  class Player(
      _name: String,
      var _healthPoints: Int = 100,
      val _isBlessed: Boolean,
      private val _isImmortal: Boolean
  ) {
      var name = _name
        get() = field.capitalize()
        private set(value) {
            field = value.trim()
        }

      // Init block for argument validation
        init {
          require(_healthPoints > 0) { "healthPoints must be greater than zero." }
          require(name.isNotBlank()) { "Player must have a name." }
        }

      // Secondary constructor with
      // initialization logic
      constructor(name: String) : this(
        name,
        _isBlessed = true,
        _isImmortal = false ) {
          if (name.toLowerCase() == "kar") _healthPoints = 40
        }
    }
}
```

### Secondary constructors

- The `primary constructor` specifies the parameters required for any instance of the class.
- The `secondary constructor`, specifies the alternative ways to construct the class (while still meeting the requirements of the primary constructor).
- Secondary constructors are prefixed with constructor.
- If the class has a primary constructor, each secondary constructor needs to delegate to the primary constructor, either directly or indirectly through another secondary constructor(s). Delegation to another constructor of the same class is done using the `this` keyword:
- You can also use a secondary constructor to define initialization logic, code that will run when your class is instantiated.
- You can define multiple secondary constructors for different combinations of parameters.
- Secondary constructors cannot be used to define properties like primary constructors.

```kotlin
class Person(val name: String) {
    var children: MutableList<Person> = mutableListOf<>()
    constructor(name: String, parent: Person) : this(name) {
        parent.children.add(this)
    }
}
```

### Initializer Blocks

- The initializer block is a way to set up variables or values as well as perform validation.
  – Like checking to make sure that the arguments to the constructor are valid ones.
- The code it holds is executed when the class is constructed.

### Property initialization

- Properties can be initialized using function return values.
- If your property requires complex initialization logic like multiple expressions consider pulling this initialization logic into a function or an initializer block.
- The rule that states that properties must be assigned on declaration does not apply to variables in a smaller scope, like a function in the class.
- Properties have more strict rules on initialization because they can be accessed from other classes if they are public.
- Variables local to a function, on the otherhand, are scoped to the function in which they are defined and cannot be accessed from outside of it.

### Initialization Order

1. The primary constructor’s inline properties.
2. Required class-level property assignments.
3. init block property assignments and function calls.
4. secondary constructor property assignments and function calls.
5. Initialization order of the init block (item 3) and the class-level property assignments (item 2) depends on the order they are specified in.

### Delaying Initialization

#### Late initialization

- Any `var` property declaration can be appended with the `lateinit` keyword, and the Kotlin compiler will let you put off initializing the property until you assign it.
- You could implement this pattern using a nullable type instead, but you would then be required to handle your property’s nullability throughout your codebase,which is burdensome.
- Kotlin does provide a way to check whether a late-initialized variable has been initialized, the `isInitialized` check.
- `lateinit` keyword for variable to be initialized by the framework, not by the user, user will later access this property.
- This also helps in getting meaningful exception.
- However, `isInitialized` should be used sparingly.

#### Lazy initialization

- Some properties may involve some more computationally intensive task when being initialized, like reading from a file.
- If your class does not require access to a property right away, then lazy initialization could be a good choice.
- Lazy initialization is implemented in Kotlin using a mechanism known as a `delegate`.
- Delegates define templates for how a property is initialized.
- You use a '`lazy` delegate with the `by` keyword.
- Lazy initialization takes a lambda in which you define any code that you wish to execute when your property is initialized.

```kotlin
// Use of lazy property
fun main() {
  class Player(
      _name: String,
      var healthPoints: Int = 100,
      val isBlessed: Boolean,
      private val isImmortal: Boolean
  ) {
      var name = _name
        get () = "${field.capitalize()} of $hometown"
        private set(value) { field = value.trim() }

      val hometown by lazy { selectHometown() }

      private fun selectHometown() = File("towns.txt")
          .readText()
          .split("\n")
          .shuffled()
          .first()
    }
}
```

# Inheritance

### Creating a Subclass

- A `subclass` shares all properties with the class it inherits from, commonly known as the parent class or `superclass`.
- In Kotlin classes are closed, they prohibit subclassing by default.
- For a class to be subclassed, it must be marked with the `open` keyword.
- To override a function or property, it must be marked `open` in the parent class.
- To access any member of superclass from subclass, use `super` keyword.
- When you override a function in Kotlin, the overriding function in the subclass is, by default, open to being overridden (as long as the subclass is marked open).
- If you do not want this, then use `final` keyword, then the function can't be overridden.
- By requiring the explicit use of the open and override keywords, Kotlin requires you to opt in to inheritance. This reduces the chances of exposing classes that were not meant to be subclassed and prevents from overriding functions that were never meant to be overridden.
- Every class in Kotlin descends from a common superclass, known as `Any`, without you having to explicitly subclass it in your code.
- Kotlin enforced immutability by forcing you to explicitly declare classes, properties, and methods to be open for extension/override.

```kotlin
// Example of extandable class
fun main() {
  open class Room(val name: String) {
    protected open val dangerLevel = 5
    fun description() = "Room: $name"
    open fun load() = "Nothing much to see here..."
  }

  // Create subclass
  class TownSquare : Room("Town Square")

  // subclass another version
  open class TownSquare1 : Room("Town Square") {
    override val dangerLevel = super.dangerLevel - 3
    final override fun load() = "The villagers rally and cheer as you enter!"
  }

  // Room can hold TownSquare type
  // the functions called will be from
  // TownSquare, this is polymorphism
  var currentRoom: Room = TownSquare1()
  println (currentRoom.description())
  println (currentRoom.load())

  // true
  currentRoom is Room
}
```

### Polymorphism

- A variable can hold the subclass types and the members(properties and methods) accessed will be of the subtype.
- So dependending on the subtype the members will be accessed, this is called `polymorphism`.
- So, a function can take a class and its subclass as parameter, and only the appropriate member will be accessed/invoked.

### Type Checking

- `is` operator lets you query whether an object is of a certain type.
- A subtype is type of parent type.

### Type casting

- Type casting allows you to treat an object as if it were an instance of a different type.
- This gives you the power to do anything with an object that you would do with an object of the type you specify (such as call functions on it).
- The `as` operator denotes a type cast.
- You have to use it safely. An example of a safe cast would be casting from an `Int` to a more precise number type like `Long`.
- Cast from String to Int would cause a `ClassCastException`.
- Cast is different from a conversion, Some strings can be converted to integers; no String can be cast to an Int.
- If you must make an unsafe cast, then surrounding it with a try/catch block is a good idea.
- It is best, however, to avoid type casting unless you are sure that the cast will succeed.

```kotlin
fun main() {
  fun printIsSourceOfBlessings(any: Any) {
    val isSourceOfBlessings = if (any is Player) {
      // smart casting done by conpiler
      any.isBlessed
    } else {
        (any as Room).name == "Fount of Blessings"
    } println ("$any is a source of blessings: $isSourceOfBlessings")
  }
}
```

### Smart casting

- The Kotlin compiler is smart enough to recognize a type of a class based on the check.
- Smart casting in kotlin, done by compiler.

### Any class

- Any provides abstract definitions for common functions like `toString()`, `equals()` and `hashCode()` which are backed by an implementation found on the platform that your project targets.
- The Any type is one of the ways that Kotlin allows for platform independence. It provides an abstraction above the class that represents a common superclass on each specific platform, like the JVM.

# Objects

### The object Keyword

- There are three ways to use the object keyword: `object declarations`, `object expressions`, and `companion objects`.

### Object declarations(Singleton)

- Object declarations are used to create singleton.
- We can create objects, without them being instances of any class (just like javascript).
- Use the keyword `object`.
- They are useful for organization and state management, especially when you need to maintain some state consistently throughout the lifespan of your program.
- Because an object declaration is instantiated for you, you do not add a custom constructor with code to be called at initialization. Instead, you need an initializer block for any code that you want to be called when your object is initialized.
- An object is initialized when an object declaration is referenced by one of its properties or functions.

```kotlin
// Name of class is the name of the singleton object (for eg. Global)
object Global {
  val PI = 3.14
}
```

### Object expressions (Anonymous inner class)

- Suppose we want to override only one or two functions of a class and pass it to a function (it could be an event listener like onclick() , onkeypress()).
- In this case we can create an anonymous class, in place, using `object` keyword and pass it, rather than creating a separate object and then passing it. Since This object will not be used anywhere after it has been passed to the function, anonymous class approach is preferred.
- Defining a new, named class is not always necessary. Perhaps you need a class instance that is a variation of an existing class and will be used for a one-off purpose.
- In fact, it will be so temporary that it does not even require a name.
- It adheres to the rules of the object keyword in that there will only ever be one instance of it alive at a time, but it is significantly smaller in scope than a named singleton.
- An object expression takes on some of the attributes of where it is declared. If declared at the file level, an object expression is initialized immediately. If declared within another class, it is initialized when its enclosing class is initialized.
- Anonymous Inner class using "object expression". It is used in android development to implement click listener.
  object: parentClass { }
- Syntax: `var myIntance = object: MyInterface{ }`.
- Used to implement an interface for an anonymous class.

```kotlin
fun main() {
  // subclass of TownSquare, object expression
    val abandonedTownSquare = object : TownSquare() {
        override fun load() = "You anticipate applause, but no one is here..."
    }
}
```

### Companion objects

- kotlin does not have static class or method. We can create a top level method or create a method in top level object.
- In kotlin static method are implemented using companion objects. These are accessible from Java code.
- You can directly access the methods of inner class by using `companion` keyword. This way you can skip the derefrencing of inner class.
- A class can have only single companion object.
- The methods of inner class can be accesed from java by annotating them by `@JvmStatic`.
- Ties the initialization of an object to a class instance.
- Companion objects are scoped to instance of other class.
- A companion object is declared within another class declaration using the companion modifier.
- There are two cases in which a companion object will be initialized. First, a companion object is initialized when its enclosing class is initialized. This makes it a good place for singleton data that has a contextual connection to a class definition. Second, a companion object is initialized when one of its properties or functions is accessed directly.
- The contents of this companion object will not be loaded until either PremadeWorldMap is initialized or load is called. And no matter how many times PremadeWorldMap is instantiated, there will only ever be one instance of its companion object.
- Syntax: `companion object {}`
- Can be used for Factory for pattern.

```kotlin
fun main() {
    class PremadeWorldMap {
        companion object {
            private const val MAPS_FILEPATH = "nyethack.maps"
            fun load() = File(MAPS_FILEPATH).readBytes()
        }
    }

    // call method of companion object
    PremadeWorldMap.load()
}
```

### Nested Classes and Inner classes

- Not all classes defined within other classes are declared without a name. You can also use the class keyword to define a named class nested inside of another class.
- Nested class is only relevant to outer class; it does not need to be accessed from anywhere else in the application.
- Making GameInput a private, nested class means that GameInputcan be used within Game but does not clutter the rest of your API.
- You can access like a namespace (if it's not private) nested class and can instantiate it .
- You can also access it from Java code in same manner.
- Nested class with "inner" keyword can access the properties of outer class.
- You can access Inner classes only by instance of the outer class and not as a namespace.
- A nested class is accessible without instance of outer class.
- Inner class is only accessible from instance of outer class.

### Data Classes

- Give default methods like to String(), equals(), hashCode(), copy() etc.
- Data classes/objects are called **Java beans**. They just hold the data, for eg. fetching from a dB or network.
- Data classes are classes designed specifically for holding data, and they come with some powerful data manipulation benefits.
- Data classes provide implementations for toString, equals, and hashCode functions that may work better for your project.
- They provides `toString()` etc method for properties declared in Coordinate’s `primary constructor`.
- Data classes also provide a 'copy` function that makes it easy to create a new copy of an object.
- Classes that are often compared or copied or have their contents printed out are candidates for being made data classes.
- Data classes are not permitted to be superclasses.
- Data class only consider the properties in the constructor when equating the objects.

```kotlin
// create a new instance of Player that has all of the same
// property values as another player except for isImmortal
val mortalPlayer = player.copy(isImmortal = false)

// Destructuring in data class
val (x, y) = Coordinate(1, 0)

// Copying with some properties changed
customer2 = customer1.copy(name="saurabh")
```

- value, ordinal, values.
- Only use of semicolon in Kotlin.

### Destructuring declarations in data classes

- Data classes automatically enable your class’s data to be destructured.

### Limitations and requirements on data classes

- Must have a primary constructor with at least one parameter
- Require their primary constructor parameters to be marked either val or var
- Cannot be abstract, open, sealed, or inner

### Enumerated Classes

- Special type of class useful for defining a collection of constants, known as enumerated types.
- You can reference enumerated types using the name of the enum class, a dot, and the name of the type.
- enums can represent more than simple naming constants.
- Enums, like other classes, can also hold function declarations.
- You call functions on enumerated types, not on the enum class itself.
- `valueOf` is a function available on all enum classes that returns an enumerated type with a name that matches the String value that you pass to it.
- Enum classes are a simple form of ADT(Algebraic Data Types).
- For more complex ADTs, you can use `sealed` classes to implement more sophisticated definitions.
- Enum are set of constants representing possible values for a variable.
- Enum constants are objects and instances of enum class.
- Enum class can't be instantiated.
- Allows only single instance of each value/subclass.
- Values() gives list of all constants in the enum.
- `.name` gives the name of the enum constant.
- `.ordinal` gives the 0 indexed number of the enum constant.

```kotlin
enum class Direction(private val coordinate: Coordinate) {
    NORTH(Coordinate(0, -1)),
    EAST(Coordinate(1, 0)),
    SOUTH(Coordinate(0, 1)),
    WEST(Coordinate(-1, 0));

    fun updateCoordinate(playerCoordinate: Coordinate) =
        Coordinate(playerCoordinate.x + coordinate.x,
            playerCoordinate.y + coordinate.y)
}

data class Coordinate(val x: Int, val y: Int) {
    val isInBounds = x >= 0 && y >= 0
    // Operator Overloading
    operator fun plus(other: Coordinate) = Coordinate(x + other.x,
                                                    y + other.y)
}

fun main() {
    Direction.EAST
    Direction.EAST.updateCoordinate(Coordinate(1, 0))
}
```

### Operator Overloading

- When you want to use built-in operators with your custom types, you have to override the operators’functions to tell the compiler how to implement them for your type. This is known as `operator overloading`.
- You can overload the `plus` operator prepending the function declaration with the `operator` modifier.
- If you override equals yourself, you should also override afunction called hashCode.
- Certain operators can be overloaded using conventions.
- In kotlin we can't define a symbol as an operator, but we can overload certain operators.
- For eg. You can define a data class method with keyword "operator" and name "plus" to overload + operator.
- We can also use "operator" key with extension function.

### Algebraic Data Types

- Allow you to represent a closed set of possible subtypes that can be associated with a given type. Enum classes are a simple form of ADT.

### Sealed classes

- Sealed classes are used for representing restricted class heirarchy which means we know how many subclasses are there for a particular class.
- subclasses can have their own properties. So subclasses can have different properties in different instances.
- Their can be multiple instances of the sealed subclasses.
- Sealed classes let you specify an ADT similar to an enum, but with more control over the specific subtypes than an enum provides.
- Sealed class has a limited number of subclasses that must be defined within the same file where it is defined, otherwise it is ineligible for subclassing.
- Kotlin doesn't have algebric data types.
- But you can simulate them using sealed classes.
- Sealed classes puts restriction on what type of classes can inherit from base class.
- Inner(nested classes) inheriting from outer class to implement two different return types for http request, viz. "success" and "failure".
- The "sealed" keyword before the "class" keyword ensures that no other class can inherit from the outer class.
- Starting Kotlin v1.1, the inner class restriction was removed. Now classes can be defined anywhere within the same file.
- list.filterNotNull() vs. String.orEmpty()

# Interfaces and Abstract Classes

- Interfaces can define methods and properties.
- Property initializer is not allowed in interface. An interface can't have properties with a backing field and a constructor.
- You can override the interface properties.
- Using an interface, a group of classes can have properties or functions in common without sharing a superclass or subclassing one another.
- An interface outlines the `what`, and the `how` must be provided in the classes that implement it.
- Interface allows you to specify common properties and behavior that are supported by a subset of classes in your program without being required to specify how they will be implemented.
- Abstract classes are similar to interfaces in that they can specify the what without the how, but they are different in that they can also define constructors and act as a superclass.
- Functions in an interface need not have a body.
- The `open` keyword is not required on function declarations in an interface. This is because all properties and functions you add to an interfac emust be open implicitly, since they would serve no purpose otherwise.

### Interface

- Declared using `interface` keyword.
- Very similar to abstract class, but they cannot have state (ie only **abstract property** allowed).
- An interface cannot specify a constructor.
- A class can inherit from only one base class and multiple interfaces. This is called **single inheritance model**.
- Interface is similar to abstract classes but they dont have a state(properties), they only have (abstract)methods.
- Methods in interface are abstract by default.
- Abstract methods in interface don't require `abstract` keyword unlike abstract classes.
- kotlin/Java support multiple inheritance ONLY for interfaces and not for classes.
- In Java we `extend` a class and `implement` an interface.
- From Java 8 onwards interface can have defined methods, this allows to change interface without breaking code.

```kotlin
fun main() {
// Interface
  interface Fightable {
    var healthPoints: Int
    val diceCount: Int
    val diceSides: Int
    val damageRoll: Int
    fun attack(opponent: Fightable): Int
  }

  // Implementing interface
  class Player(
    _name: String,
    override var healthPoints: Int = 100,
    var isBlessed: Boolean = false,
    private var isImmortal: Boolean
  ) : Fightable { ... }
}
```

### Implementing an Interface

- First, you declare that the class implements the interface.
- Then, you must ensure that the class provides implementations for all of the properties and functions specified in the interface.
- All implementations of interface properties and functions must be marked with `override`.

### Default Implementations in interface

- You can provide a default implementation for property getters and functions in an interface.

### Abstract Classes

- It is never instantiated. It's purpose is to provide function implementations through inheritance to subclasses that are instantiated.
- It is defined by prepending the `abstract` keyword to a class definition. In addition to function implementations, abstract classes can include abstract functions.
- Can have abstract methods and properties.

# Generics

### Defining Generic Types

- A generic type is a class that accepts an input of any type in its constructor.
- Generic type parameter: The parameter specified for a generic type, such as \<T\>.

```kotlin
class LootBox<T>(item: T) {
  private var loot: T = item
}

interface repository<T> {
  fun getById(id:Int):T
  fun getAll():List<T>
}

interface Repo {
  fun<T> getById(id:Int):T
}
```

### Generic type parameter naming convention

- The convention is to use `T`.
- For a `collection` class or `interface` the convention is to use `E` instead (for `Element`).
- For a `map` the convention is `K` and `V` (for `Key` and `Value`) if it’s a map.

### Restrict T to a specific supertype

```kotlin
// Restrict T to Pet or its subclasses
class Contest<T: Pet> {

}
```

### Use of `in` and `out` for generic parameters

- There are two roles a generic parameter can be assigned, `producer` or `consumer`.
- `Producer`: `Covariance`, Means that a generic parameter will be readable (but not writable). Use `out` for this case.
- `Consumer`: `Contravariance`, Means that a generic parameter will be writable (but not readable). Use `in` for this case.

```kotlin
// Use of "out" keyword fot generics
class Barrel<out T>(val item: T)

fun main() {
  var fedoraBarrel = Barrel(Fedora("a generic-looking fedora", 15))
  var lootBarrel = Barrel(Coin(15))

  // Allowed because of "out"
  lootBarrel = fedoraBarrel

  val myFedora: Fedora = lootBarrel.item
}

// Use of "in" keyword fot generics
class Barrel<in T>(var item: T)

fun main() {
  var fedoraBarrel = Barrel(Fedora("a generic-looking fedora", 15))
  var lootBarrel = Barrel(Coin(15))

  // Not Allowed because of "in"
  lootBarrel = fedoraBarrel

  // Allowed because of "in"
  fedoraBarrel = lootBarrel

  val myFedora: Fedora = lootBarrel.item
}
```

### The `reified` Keyword

- There are cases where it is useful to know the specific type that is used for a generic parameter.
- The `reified` keyword allows you to check a generic parameter’s type.
- Using the reified keyword allows you to inspect the type of a genericparameter without requiring reflection

# Kotlin Extensions

- Allows you to add functionality to a type without directly modifyingthe type’s definition.
- You can use extensions with your own types and also typesyou do not control, like List, String etc.
- They are a good fit for adding functionality to a type when you do not control the definition of the class or when a class is not marked with the open keyword, making it ineligible for subclassing.
- Kotlin standard functions are defined as extensions.
- When you specify an extension function, you also specify the Receiver type.
- `Receiver type`: The type an extension adds functionality to.
- The `this` keyword refers to the receiver instance the extension function was called on.
- Defining an extension on a superclass makes it available to subclasses. For eg you can define a print function on `Any` class, which could be accessed from all the classes.
- Extensions can be used with generics.

### Extension Properties

- Just like extension functions, you can also define extension properties.

### Kotlin annotations

- Used in testing to annotate functions as **@test** etc.

### Strong reference in Java/Kotlin

- Default behaviour.
- Garbage collected when there are no references left for an object.

### Weak Reference in Java/Kotlin

- GC responsible to determine reachability for garbage collection.
- Eager GC.

### Soft Reference in Java/Kotlin

- GC responsible for garbage collection.
- Lazy GC(Only on OutOfMemoryError).

### Delegated properties use cases

- `Lazy properties`: the value gets computed only upon first access;
- `Observable properties`: listeners get notified about changes to this property;
- Storing properties in a map, instead of a separate field for each property.

**Note**: The convention is, if the last, or in this case the only, parameter of a
function is another function, it doesn't need to go into brackets.

### Extension functions

- Using this you can extend existing class without inheriting them.
- The scope of extension functions is the file.
- They can be imported in another file for accessing them.
- Extension functions are statically resolved.

```kotlin
// Extension function to add function to string class
fun String.hello() {
  println("Hi there!!")
}
```

### Interoperability with Java

- Talk to Java from Kotlin
- When using a java class, Kotlin allows accessing properties directly.
- Rather than using getters and setters.
- When extending an interface with single function, we don't need to extend the interface traditionally, we can simply pass the lambda function, which will become the definition of the interface function.

### Working with nulls from java

- Platform types in Kotlin, "!". Used when there is no equivalent in kotlin.
- Using jetbrains annotation.

### Talking Kotlin in Java

- Use "@JvmField" to access property in Kotlin from Java code , as field.
- Use "@JvmOverloads" to call a Kotlin function with default values.
- Use "@JvmName" to call a Kotlin function with a different name.
- "@JvmName" handles the problem of generics and type erasure.
- Use "@Throws("IOException::class)" to use use a Kotlin function which throws an exception.

### Top level functions and properties in Kotlin (how to access them from Java):

- To invoke a Kotlin top level function from java, use "fileName.functionName()"
- Where fileName is the class file in which the top level functionName resides.
- Kotlin compiler creates static class and static function, which is used by Java.
- We can change the fileName by using "@JvmName("newFileName")
- Kotlin properties can also be accessed similary by using suitable getter.
- If we want to access the property as field then we need to declare it "const val propName" in Kotlin file.

### Accessing top level function from Java

- To invoke a Kotlin top level function from java, use "fileName.functionName(className)"
- Where fileName is the class file in which the top level functionName resides.
- className is the class instance containing the extension function.

### Interoperatbility with Java7 and 8

- Kotlin is compatible with Java 6.
- Lambda function is implemented as anonymous class.
- There are two new libraries targetting java 7 and 8.

### Kotlin standard library

- Kotlin does not have its own collections.
- Higher order functions are implemented as extensions.
- Kotlin provides interfaces (mutable/immutable) on top of java collections.
- Kotlin collecions:
  Lists,
  Arrays, (including equivalent primitive types viz, charArrays, IntArrays etc)
  Maps,
  Sets,
  HashMap,
  etc..

### Hashmap creation

- Declare hashmap : var hashmap = hashMapOf(Pair("string1", "stringa"), pair("string2", "stringb") ....)
- setOf()
- hashSetOf()

### Filtering, Mapping, Flatmapping in Kotlin

- `forEach` : Takes a lambda operation to be executed on each element of iterable, for eg., `iterable.forEach {i -> i<1}`
- `iterable.filter()`: Returns an iterable with elements that matches the predicate in filter, for eg., `iterable.filter { it.match == 1}`
- `iterable.map { }`:
- `iterable.flatMap { }`:

### Concept of map and flatmap

- Map: `[a,b,c] f(x) => [f(a),f(b),f(c)]`
- Flatmap: `[[a,b],[c,d]] f(x) => [f(a),f(b),f(c), f(d)]`

### Lazy evaluation with sequences in Kotlin

- Programming concept: Lazy evaluation vs eager evaluation.
- Haskell by default is lazy evaluated.
- In Kotlin asSequence() converts an iterable to be lazily evaluated.
- `asSequence().take(30)...` execute logic on first 30 elements only.
- `generateSequence(1) {x -> x + 10}`, it does more than isSequence()

### Functional constructs in Kotlin

- Currying, composition not supported in standard Kotlin lib.
- But the above can be implmented using Kotlin language.
- There are open source libs which implements them.
- Kotlin language can be easily extended with new functionality, eg. currying and composition functions.

### Type aliases in Kotlin

- Type aliases allow us to provide aliases for certain types, while keeping the underlying characteristics the same.
- For eg. typealias Name = String

### Delegation

### Problems with inheritance

- Long heirarchies
- Bloated classes
- Kotlin has single inheritance model
- Composition Vs inheritance
- Compose functionality of different classes into one class. Eg log + permissions = controller.
- Leads to better design.
- Composition in kotlin is achieved by **delegation**.
- Delegation of classes
- Delegation pattern.

### Delegation of properties

### Delegating member function in kotlin

Syntax:
Class xyz(repository: Repository): Repository by repository {}

Now xyz can call the methods of Repository directly, without dereferencing .
This is possible because the repository instance is passed to the constructor.
We should not inject too many dependencies, at most two.

- Local delegates in kotlin
- Extension properties in kotlin

### Metaprogramming:

- Using java reflection in kotlin
- Using kotlin reflection
- Type erasure on jvm
- Reified generics in kotlin
- Custom annotations in kotlin

### Coroutines and reactive extensions in kotlin

# Kotlin coroutines

- A `suspend function` can only be called from either a coroutine or another suspend function.
- When a suspend function returns, it means that it has completed. This contract makes the code easy to manage.
- Coroutine can suspend execution without blocking the thread.
- Under the hood coroutines implements a callback called `continuation`. It is a generic callback interface with extra information in continuation implements a state machine internally.
- `withContext(Dispatchers.IO){}` : A suspend function from coroutines library which move the execution to a different thread. It takes the parameter as the thread pool to which the execution is suspended. It also takes the lambda function as a parameter which is a blocking code. It can be used as a body of suspend function.
- Dispatchers.IO: N/W and disk operations.
- Dispatchers.Main: UI/Non blocking code.
- Dispatchers.Default: CPU intensive.

### What is a coroutine:

- Runnable with superpowers.
- takes a block of code and run it in a particular thread.
- It comes with exception handling and cancellation.
- How to call a suspend function from a normal function?Use coroutines, See below.

```kotlin
onButtonClicked() {
    scope.launch {
    //suspend function
  }
}
```

- `launch`: Triggers a coroutine. But it should be specified with a scope.

### Structured concurrency:

- solves the problem of 'who can cancel a subroutine' and 'who gets exception if subroutine fails'. Think of onButtonClicked(), what to do with coroutine, if user moves to a different screen.
- It is a design pattern which takes care of memory leaks.
- It introduces the concept of coroutine scope.

### Coroutine scope:

- Keeps track of lifecycle of coroutines it creates.
- It has ability to cancel the coroutines.
- It is notified in case of exception/failure.

### How to create coroutine scope

- `val scope = CoroutineScope(Dispatchers.Main)`.
- The above function also takes a job, which defines lifecycle of both scope and the coroutine.
- `Val scope = CoroutineScope(Dispatchers.Main + job())`.

### How to cancel all coroutines created in a scope. After this you cannot launch any coroutines from this scope.

- `scope.cancel()`

### How to launch a coroutine within a scope.

- `scope.launch{}`

### Handling exceptions in a scope

### Scope with a job

- When we pass job to the scope then it Handles the exceptions in a particular way.

### Asynchronous programming

- Kotlin does not bind user to any particular approach of asynchronous programming.
- Kotlin uses coroutines for asynchronous programming.
- Suspendible computation.

### Async await in kotlin

These are std library functions and not keywords.

### Yields in kotlin

- yield is a function and not keyword.

**DSL** : Domain specific language.

### Java Bean

- JavaBeans are classes that encapsulate many objects into a single object (the bean).
- It is a java class that should follow following conventions:
- Must implement Serializable.
- It should have a public no-arg constructor.
- All properties in java bean must be private with public getters and setter methods.
