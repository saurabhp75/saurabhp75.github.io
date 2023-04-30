---
title: "Python3"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Python3"]
draft: false
description: "Introduction to Python3"
---

### Difference between list.sort() and sorted()

- **list.sort()** sorts the list in place and returns none.
- **sorted(list)** creates and returns a new copy of the sorted list.

The fragments of program code that produce or calculate new data values are called **expressions**. The simplest kind of expression is a **literal**.

### Formatting strings:

- Print statement in Python: `{[**index**] : [ \< | \> | - ] [**format-specifier**]}`

- **format-specifier** : `[width].[precision][type]`
- **width** : Minimum width of field.
- **precision** : Decimal precision, only used for floats.
- **type** : **s**, **d**, **f** for **str**, **int** and **float** respectively.

For e.g.

- `{0:0.2f}` : 0th index, 0 min. width and 2 decimal precision.

- `<`, `>`, and `-` for left, right, and center justification.

### Return value of functions

All functions in Python return a value, regardless of whether the function actually contains a return statement. - Functions without a return always hand back a special object, denoted **None**.

### Formal parameters & actual parameters

The parameters appearing in the function definition are called **formal parameters**, and the expressions appearing in a function call are known as **actual parameters**.

Python passes parameters **by value.** If the value being passed is a mutable object (e.g. list), then changes made to the object may be visible to the caller.

### Importing of Python modules

Importing a Python modules executes them. When a module is imported, Python creates a special attribute, **name**, inside that module and assigns it a string representing the module's name.

However, when Python code is being run directly (not imported), Python sets the value of **name** to be **main**.

### Exception handling in Python

- **try**:
- **except**: (If there is no exception name after except then all exceptions will be caught)
- **else**: (Run if no exceptions occur)
- **finally**: (Run in any case)

- `x and y`: If x is false, return x. Otherwise, return y.
- `x or y`: If x is true, return x. Otherwise, return y.

### Python names (references) and values

Every object has an identity, a type and a value. Once an object is created, the **type and identity can’t be changed**. Whether or not the object’s value can change after creation determines if the object is mutable or immutable.

- **Immutable Object**: Native types(int, float, long, complex, string, bool), tuple.

- **Mutable Object**: list, dict, set, byte array, user-defined classes.

Assignment statements bind a name (identifier) to an object. **Assignment creates a new object, with few exceptions**. For e.g.

```shell
>>> x = 100
```

**Aliasing**: Two variables referring to the same object.

```shell
>>> x = 100
>>> y = x # aliasing
```

### How the objects are garbage collected

- When number of references(names) to an object becomes 0, it is garbage collected by interpreter.
- When names get out of scope, the reference count to the object decreases.

### Inbuilt functions

1. **id()** returns the identity (memory address) of the object. No two objects have the same identity.
2. **is** and **is not** operators: these identity operators evaluates whether or not the objects have the same identity, i.e. if they are the same object.

### Difference between += and + operator on mutable objects(e.g. list)

For mutable objects '+=' changes the object in place, whereas '+' gives a new object and assign to the name. '+=' calls **iadd**() whereas '+' calls **add()**.

for e.g.

```shell
>>> lst = [1,2,3]
>>> lst += [4,5,6] # here id of lst doesn't change
>>> lst = lst + [7,8,9] # here id of lst changes.
```

### Exceptions to the rule "Assignment creates a new object"

Though each assignment creates a new object. There are few exceptions due to optimizations done in CPython.

1. For integers between -5 and 256, there is an internal array maintained and no new object is created. For e.g.

```shell
>>> a = 256
>>> b = 256
>>> a is b
True
```

2. For small strings, if the same value string is assigned to another name, the old string object is used.
   For e.g

```shell
>>> a = "python"
>>> b = "python"
>>> a is b
True   # a and b refer to the same object!
```

3. Empty immutable objects

```shell
# No new objects are created for empty tuples (immutable objects).
For e.g
>>> a = ()
>>> b = ()
>>> a is b
True  # a and b both refer to the same object in memory
```

## Names and values(Ned batchelder)

1. Names refer to values/objects.

2. Many names can refer to one value/object. For e.g.  
   x = 23  
   y = x

3. Names are reassigned independently of other names
   When we said “y = x”, that doesn’t mean that they will always be the same forever. Reassigning x leaves y alone. For eg.  
   x = 23  
   y = x  
   x = 12 # this will not change the value refered to by the name 'y'

### Assignment:

4. Assignment never copies data:

```shell
>>> x = 4 # bind 'x' with  object whose value is 4.
>>> y = x # bind y to the value pointed to by x
>>> x = 8 # rebind x to object whose value is 8.
>>> print(y) # will print 4, as 'y' is still bound to 4.
```

**IMPORTANT**: There is no way in python where a name can refer to another name. A name can only refer to values.

5. Changes in a value are visible through all of its names.

### Rebinding the name vs. mutating the value

```python
x = 1
x = x + 1 # rebind the name to a new value

nums = [1, 2, 3]
nums.append(4) # mutating the value
```

**Myth** : Python assigns mutable and immutable values differently.
All assignment works the same: it makes a name refer to a value. But with an immutable value, no matter how many names are referring to the same value, the value can’t be changed in-place, so you can never get into a surprising Presto-Chango situation.

6. References can be more than just names

Anything that can appear on the left-hand side of an assignment statement is a reference, and everywhere I say “name” you can substitute “reference”.

my_obj.attr = 23  
my_dict[key] = 24  
my_list[index] = 25  
my_obj.attr[key][index].attr = "etc, etc"

Note that “i = x” assigns to the name i, but “i[0] = x” doesn’t, it assigns to the first element of i’s value.It’s important to keep straight what exactly is being assigned to. Just because a name appears somewhere on the left-hand side of the assignment statement doesn’t mean the name is being rebound.

7. Lots of things are assignment

```
- X = ...
- for X in ...
- [... for X in ...]
- (... for X in ...)
- {... for X in ...}
- class X(...):
- def X(...):
- def fn(X): ... ; fn(12)
- with ... as X:
- except ... as X:
- import X
- from ... import X
- import ... as X
- from ... import ... as X
```

8. Python passes function arguments by assigning to them.

**Fact**: Python passes function arguments by assigning to them.

```shell
>>> l = [1,2,3]
>>> id(l)
140581310766344
>>> x = l[0]
>>> id(x)
10910400
```

### Concurrency vs Parallelism vs Multiprocessing

- **Concurrency** : CPU takes turns and switches between the code to be executed.
- **Parallelism** : Parallel execution of code on multiple CPU cores.
- **Multiprocessing** :???

### Coroutine

A function that uses **yield** as a signal to the scheduler, indicating that the coroutine will be **waiting** until an event (such as IO) is completed.

### Python nonlocal keyword :

Below code will print 'Hello' 2 times, due to use of nonlocal keyword.

```python
def function_outside():
    msg = 'Hi'
    def function_inside():
        nonlocal msg   <-- Now msg refers to the enclosing msg label
        msg = 'Hello'
        print(msg)
    function_inside()
    print(msg)

function_outside()
```

### Inner Functions

Inner functions are defined functions inside other functions.

### Python closure

Closure is a function object that remembers values in enclosing scopes even if they are not present in memory.
Basically, the method of binding data to a function without actually passing them as parameters is called closure. When the interpreter detects the dependency of inner nested function on the outer function, it stores or makes sure that the variables in which inner function depends on are available even if the outer function goes away.

In conclusion here are the three criteria’s for a closure:

1. There must be a nested function (a function inside another function).
2. This nested function has to refer to a variable defined inside the enclosing function.
3. The enclosing function must return the nested function.

The code below implements a closure.

```python
def func1():  #Outer function
  msg = 'I belong to func1'
  def func2(): #Nested function
      print (msg)
  return func2

>>> obj = func1()  #binding the function to an object
>>> obj() # contains inner function reference
I belong to func1 # the value of msg is retained even after the outer function goes out of scope.
```

### Functions as First-Class Objects

In Python, functions are first-class objects. This means that functions can be passed
around and used as arguments, just like any other object in Python.

### Iterable and Iterators

**Iterable** : An iterable is an object that has an **iter()** method which returns an **iterator**,
or which defines a **getitem()** method that can take sequential indexes starting from zero
(and raises an **IndexError** when the indexes are no longer valid or
**StopIteration** when the end of iterable has reached).

**Iterator** : An iterator is an object with a next (Python 2) or **next()** (Python 3) method.
**next()** method signals when it is done by raising **StopIteration** exception.Iterator also
implements **iter()** method which returns self object.

### Generators function

Generators are functions that can be paused and resumed on the fly, returning an object that can be iterated over. Unlike lists, they are lazy and thus produce items one at a time and only when asked. So they are much more memory efficient when dealing with large datasets.

```shell
>>> def countdown(num):
...     print('Starting')
...     while num > 0:
...         yield num
...         num -= 1
...
>>> val = countdown(5) # the function does not execute as 'Starting' is not printed. Instead a generator is returned.

>>> val
<generator object countdown at 0x10213aee8>
```

When calling `next()` the first time, execution begins at the start of the function body and continues until the next yield statement where the value to the right of the statement is returned, subsequent calls to `next()` continue from the yield statement, and loop around and continue until another yield is called. If yield is not called (which in our case means we don’t go into the if function because `num <= 0`) a **StopIteration** exception is raised:

```shell
>>> next(val)
Starting
5
>>> next(val)
4
>>> next(val)
3
>>> next(val)
2
>>> next(val)
1
>>> next(val)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

### Generator Expressions

They are just like list comprehensions, except the parenthesis `( )` instead of `[ ]`. They return a generator object rather than a list. Generator expressions can run slower than list comprehensions (unless you run out of memory, of course), but they use less space, as can be seen from the code below.

```shell
>>> import sys
>>> g = (i * 2 for i in range(10000) if i % 3 == 0 or i % 5 == 0)
>>> print(sys.getsizeof(g))
72
>>> l = [i * 2 for i in range(10000) if i % 3 == 0 or i % 5 == 0]
>>> print(sys.getsizeof(l))
38216
```

### Generator Expressions vs List comprehension

1. Does not construct a list.
2. Only useful purpose is iteration
3. Once consumed, can't be reused

The parens on a generator expression can dropped if used as a single function argument, for e.g:  
`sum(x\*x for x in s) <------ Generator expression with parens droppped.`

**Decorators** : Decorator is a function that takes another function and extends the behavior of the latter function without explicitly modifying it.

```python
say_whee = my_decorator(say_whee) is equivalent to below expression.

@my_decorator
def say_whee():
    print("Whee!")

# Below is a decorator which takes arguments and also return values It also gives correct name of wrapped functional
import functools

def decorator(func):
    # This will give correct name to func.__name__
    @functools.wraps(func)
    def wrapper_decorator(*args, **kwargs):
        # Do something before
        value = func(*args, **kwargs)
        # Do something after
        return value
    return wrapper_decorator
```

### Variable scope

We call the part of a program where a variable is accessible its `scope`, and the duration for which the variable exists its `lifetime`.

A variable which is defined in the main body of a file is called a `global` variable. It will be visible throughout the file, and also inside any file which imports that file. Global variables can have unintended consequences because of their wide-ranging effects – that is why we should almost never use them. Only objects which are intended to be used globally, like functions and classes, should be put in the global namespace.

The inside of a class body is also a new local variable scope. Variables which are defined in the class body (but outside any class method) are called `class attributes`.

Attributes set on instances are called `instance attributes`. Class attributes are shared between all instances of a class, but each instance has its own separate instance attributes.

In some languages defining a variable can be done in a separate step before the first value assignment. It is thus possible in those languages for a variable to be defined but not have a value – which could lead to errors or unexpected behaviour if we try to use the value before it has been assigned. In Python a variable is defined and assigned a value in a single step, so we will almost never encounter situations like this.

By default, the assignment statement creates variables in the local scope. So the assignment inside the function does not modify the global variable, it creates a new local variable called, and assigns the value 3 to that variable.

### global/nonlocal keyword

- `nonlocal`: Useful when an inner method wants to access outer methods local variable, without making it a global variable.

- `global`: Used inside a function to prevent creating a local variable.

### LEGB rule

- The LEGB rule is a kind of name lookup procedure, which determines the order in which Python looks up names.
- local, enclosing, global, built-in.

## \*args and \*\*kwargs

- the variable that we associate with the \* becomes an iterable meaning you can do things like iterate over it, run some higher-order functions such as map and filter, etc.

- One can think of the kwargs as being a dictionary that maps each keyword to the value that we pass alongside it. That is why when we iterate over the kwargs there doesn’t seem to be any order in which they were printed out.

## range function

- The range() function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and stops before a specified number.

- Syntax: range(start, stop, step)

### List/Set/Dict Comprehension

**List Comprehension**: [ x for x in range(20) if x % 2 == 0]

- syntax: [expression for item in list]

- Nested IF with List Comprehension
- `num_list = [y for y in range(100) if y % 2 == 0 if y % 5 == 0] print(num_list)`

**Dictionary Comprehension**: `{k:v for (k,v) in dict1.items() if v>2} `
**Excercise** : Make a list of all possible 2 letter combinations, where, letters = 'abcdef...xyz'.  
**Solution**: `[a + b for a in letters for b in letters]`

### Data Classes

A data class is a class typically containing mainly data, although there aren’t really any restrictions. It is created using the new @dataclass decorator.

A data class comes with basic functionality already implemented. For instance, you can instantiate, print, and compare data class instances straight out of the box.

If value of dataclass instance is same, then they are equal.

By default, data classes implement a ._repr() method to provide a nice string representation and an .eq_() method that can do basic object comparisons.

### Metaclasses

## fstrings in python

## named tuple

- namedtuples are, well…named tuples. Each object stored in them can be accessed through a unique (human-readable) identifier. This frees you from having to remember integer indexes, or resorting to workarounds like defining integer constants as mnemonics for your indexes.

### Python descriptors

Python descriptors gives us a powerful technique to write reusable code that can be used between classes.

@classmethod, @staticmethod, and @property.

The @classmethod and @staticmethod decorators are used to define methods inside a class namespace that are not connected to a particular instance of that class.

The @property decorator is used to customize getters and setters for class attributes.

### Use case for '@property'

Suppose in a class there are two properties, radius and circumference. circumference is calculated using radius.
But if we modify radius then circumference will not change automagically. We define a function circumference()
with decorator property (this now becomes a getter) and then access it like a normal attribute, ie obj.circumference (not obj.circumference()).

### Background

Attributes(method and otherwise) of an objects are stored in dict on the object. (obj.\_\_dict\_\_).

If you access an attribute of an object (obj.foo). It gets you one of the following three.

- Result of a property of same name if it is defined.
  Result of the \_\_get\_\_ method of 'data descriptor' of the same name attached to the class, if it exists.
- Corresponding value in obj.\_\_dict\_\_ if it exists.
- fall back to look in type(obj).\_\_dict\_\_. i.e in the class attribute 'list'
- Repeating for each type until it exists in MRO.
- And Assignment always creates an entry in obj.\_\_dict\_\_.
- Unless there was a setter property in which case you are callling a function.

### What is a Data descriptor :

- Descriptors is any object that implements atleast one of the methods named \_\_get**, \_\_set**, \_\_delete\_\_.
- A data descriptor implements both \_\_get** and \_\_set** methods.
- implementing only \_\_get\_\_ makes it a non data descriptor.

### Descriptor protocol :

### map/filter functions

They can be easily replicated by list comprehensions.  
**syntax**: map(function_object, iterable1, iterable2,...)
e.g.

```python
def myfunc(a, b):
  return a + b

x = map(myfunc, ('apple', 'banana', 'cherry'), ('orange', 'lemon', 'pineapple'))
```

The filter() function returns an "iterator" were the items are filtered through a function to test if the item is accepted or not.
**filter syntax** : filter(function, iterable)
e.g.

```python
ages = [5, 12, 17, 18, 24, 32]

def myFunc(x):
  if x < 18:
    return False
  else:
    return True

adults = filter(myFunc, ages)

for x in adults:
  print(x)
```

### lambda functions :

- Syntax : lambda arguments : expression i.e. lambda x, y : x + y

- anonymous functions are defined using the lambda keyword.

- Hence, anonymous functions are also called lambda functions.

lambda arguments: expression

Lambda functions can have any number of arguments but only one expression. The expression is evaluated and returned. Lambda functions can be used wherever function objects are required.

### zip and enumerate builtins:

enumerate() gives index along with value of a sequence, for eg :

```shell
>>> a = ["a", "b", "c"]
>>> for i, v in enumerate(a):
        print i, v
0 a
1 b
2 c
```

zip() takes two or more sequences of same length and returns a sequence of tuple containing two or more elements.
for e.g.

```shell
>>> a = [1, 2, 3]
>>> b = [3, 4, 5]
>>> c = [6, 7, 8]
>>> for i, j, k in zip(a, b, c):
        print i, j, k
1 3 6
2 4 7
3 5 8
```

## Python OOP:

### Python MRO(Method resolution order)

**Head** : First element of the list.  
**Tail** : all elements except the head in the list.  
**Bad head** : Present in the tail of other sequence.  
**Good head** : Not in the tail of any other list/sequence.

### How to compute the merge

Take the head of the first list, if this head is not in the tail of any of the other lists, then add it to the linearization of C and remove it from the lists in the merge, otherwise look at the head of the next list and take it, if it is a good head. Then repeat the operation until all the class are removed or it is impossible to find good heads. In this case, it is impossible to construct the merge, Python 2.3 will refuse to create the class C and will raise an exception.

### Linearization of class C :

It is sum of C plus the merge of linearization of the parents and the list of parents, i.e.

Given  
Class C(B1, B2...Bn)  
Then, Linearization of class C = L[C(B1, B2...Bn)]  
L[C(B1, B2...Bn)] = C + merge(L[B1], L[B1] .... L[Bn], B1, B2...Bn)

### Consider an example

```python
# Object (Base class for all classes)

Class D(Object):
	pass

Class E(Object):
	pass

Class F(Object):
	pass

Class C(D, F):
	pass

Class B(D, E):
	pass

Class A(B, C):
	pass
```

### In the above scenario:

L[O] = O  
L[D] = [D, O]  
L[E] = [E, O]  
L[F] = [F, O]  
L[B] = B + merge(L[D], L[E], [D, E])  
L[B] = B + merge([D, O], [E, O], [D, E])  
L[B] = [B, D] + merge([O], [E, O], [E])  
L[B] = [B, D, E] + merge([O], [O])  
L[B] = [B, D, E, O]

### Static method vs Class method in Python :

class method :

- Decorated using @classmethod, it is distinct from instance methods, which are default.
- Bound to the class and not the object of the class.
- They have the access to the state of the class as it takes a class parameter that points to the class and not the object instance.
- It can modify a class state that would apply across all the instances of the class. For example it can modify a class variable that will be applicable to all the instances.
- They are used as alternative constructors.

### Static method :

- Decorated using @staticmethod.
- A static method is also a method which is bound to the class and not the object of the class.
- A static method can’t access or modify class state.
- It is present in a class because it makes sense for the method to be present in class.

**Instance variables**: Contains data unique to each instance. They are visible in namespace of class instance.

**Class variables**: Contains data which is same in each instance. Can be accessed from instance as well as class. When we access class variable from instance, python first look for variablew in the instance, then look for it in the class. They are not visible in namespace of class instance, but in namespace of the class.

```python
class Employee:

    raise_amt = 1.04

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.email = first + '.' + last + '@email.com'
        self.pay = pay

    def fullname(self):
        return '{} {}'.format(self.first, self.last)

    def aply_raise(self):
        self.pay = int(Self.pay*self.raise_amt)

   @classmethod
    def set_raise_amt(cls, amount):
        cls.raise_amt = amount

    @classmethod           <-- Alternative constructor
    def from_string(cls, emp_str):
        first, last, pay = emp_str.split('-')
        return cls(first, last, pay)

    @staticmethod              <- Observe that neither class or instance is passed to them
    def is_workday(day):
        if day.weekday() == 5 or day.weekday() == 6:
            return False
        return True
```

### These two are same :

```python
emp1 = Employee('saurabh', 'prakash', 190000)
Employee.fullname(emp1)
emp1.fullname()
```

### To print namespace of emp1

```python
print(emp1.__dict__)
```

### Classmethods and static methods

### Classmethods as alternative constructors

### Inheritance

**Note** : Below code will create a variable 'raise_amt' and will not affect the class variable.

```python
emp1.raise_amt = 1.05
class Developer(Employee):      <---- Developer is derived class and Employee is base class
    raise_amt = 1.10

    def __init__(self, first, last, pay, prog_lang):
        super().__init__(first, last, pay)
        self.prog_lang = prog_lang
```

### python builtin functions

- type()
- len()
- next()
- isinstance(obj1, obj2): Returns True if obj1 is instance of obj2 or its subclass.

### Class decorators

### Metaclasses

- A class is a blueprint for an object.
- A metaclass is a blueprint for a class.
