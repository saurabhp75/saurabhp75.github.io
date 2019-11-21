---
layout: single
title: "Python3"
excerpt: "Python3 Notes"
---

### Difference between list.sort() and sorted()
- **list.sort()** sorts the list in place and returns none.
- **sorted(list)** creates and returns a new copy of the sorted list.

The fragments of program code that produce or calculate new data values are called **expressions**. The simplest kind of expression is a **literal**.

### Formatting strings:
Print statement in Python: {[**index**] : [ \< | \> | - ] [**format-specifier**]}

**format-specifier** : [width].[precision][type]
- **width** : Minimum width of field.
- **precision** : Decimal precision, only used for floats.
- **type** : **s**, **d**, **f** for **str**, **int** and **float** respectively.

For e.g. 

**{0:0.2f}** : 0th index, 0 min. width and 2 decimal precision.

`<`, `>`, and `-` for left, right, and center justification.

### Return value of functions
All functions in Python return a value, regardless of whether the function actually contains a return statement. Functions without a return always hand back a special object, denoted **None**.

### Formal parameters & actual parameters:
The parameters appearing in the function definition are called **formal parameters**, and the expressions appearing in a function call are known as **actual parameters**.

Python passes parameters **by value.** If the value being passed is a mutable object (e.g. list), then changes made to the object may be visible to the caller.

### Importing of Python modules:
Importing a Python modules executes them. When a module is imported, Python creates a special attribute, **__name __**, inside that module and assigns it a string representing the module's name.

However, when Python code is being run directly (not imported), Python sets the value of __name __  to be **__main __**. 


### Exception handling in Python
- try:
- except: (If there is no exception name after except then all exceptions will be caught)
- else: (Run if no exceptions occur)
- finally: (Run in any case)


x and y : If x is false, return x. Otherwise, return y.  
x or y : If x is true, return x. Otherwise, return y.


### Python names (references) and values
Every object has an identity, a type and a value. Once an object is created, the **type and identity can’t be changed**. Whether or not the object’s value can change after creation determines if the object is mutable or immutable.

**Immutable Object**: Native types(int, float, long, complex, string, bool), tuple.

**Mutable Object**: list, dict, set, byte array, user-defined classes.

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

### Inbuilt functions:

1. **id()** returns the identity (memory address) of the object. No two objects have the same identity.
    
2. **is** and **is not** operators: these identity operators evaluates whether or not the objects have the same identity, i.e. if they are the same object.

### Difference between += and + operator on mutable objects(e.g. list)

For mutable objects '+=' changes the object in place, whereas '+' gives a new object and assign to the name. '+=' calls __iadd__() whereas '+' calls __add()__.

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
When we said “y = x”, that doesn’t mean that they will always be the same forever. 	Reassigning x leaves y alone. For eg.  
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
All assignment works the same: it makes a name refer to a value. But with an 	immutable value, no matter how many names are referring to the same value, the 	value can’t be changed in-place, so you can never get into a surprising Presto-Chango situation.

6. References can be more than just names

Anything that can appear on the left-hand side of an assignment statement is a reference, and everywhere I say “name” you can substitute “reference”.

my_obj.attr = 23  
my_dict[key] = 24  
my_list[index] = 25  
my_obj.attr[key][index].attr = "etc, etc"

Note that “i = x” assigns to the name i, but “i[0] = x” doesn’t, it assigns to the first element of i’s value.It’s important to keep straight what exactly is being assigned to. Just because a name appears somewhere on the left-hand side of the assignment 	statement doesn’t mean the name is being rebound.

7. Lots of things are assignment
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
Inner functions  are defined functions inside other functions.

### Python closure :
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

### Functions as First-Class Objects :
In Python, functions are first-class objects. This means that functions can be passed 
around and used as arguments, just like any other object in Python.

### Iterable and Iterators :
**Iterable** : An iterable is an object that has an **__iter__()** method which returns an **iterator**, 
or which defines a **__getitem__()** method that can take sequential indexes starting from zero 
(and raises an **IndexError** when the indexes are no longer valid or
**StopIteration** when the end of iterable has reached).

**Iterator** : An iterator is an object with a next (Python 2) or **__next__()** (Python 3) method.
**__next__()** method signals when it is done by raising StopIteration exception.Iterator also 
implements **__iter__()** method which returns self object.

### Generators function: 
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

When calling next() the first time, execution begins at the start of the function body and continues until the next yield statement where the value to the right of the statement is returned, subsequent calls to next() continue from the yield statement, and loop around and continue until another yield is called. If yield is not called (which in our case means we don’t go into the if function because num <= 0) a **StopIteration** exception is raised:
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

### Generator Expressions :
They are just like list comprehensions, except the parenthesis '( )' instead of '[ ]'. They return a generator object rather than a list. Generator expressions can run slower than list comprehensions (unless you run out of memory, of course), but they use less space, as can be seen from the code below.
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
sum(x*x for x in s) <------ Generator expression with parens droppped.  

**Decorators** :  Decorator is a function that takes another function and extends the behavior of the latter function without explicitly modifying it.
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

### variable scope
### LEGB rule
### global/nonlocal keyword

### List/Set/Dict Comprehension
**List Comprehension**: [ x for x in range(20) if x % 2 == 0]  
**Dictionary Comprehension**: {k:v for (k,v) in dict1.items() if v>2}  
**Excercise** : Make a list of all possible 2 letter combinations, where, letters = 'abcdef...xyz'.  
**Solution**: [a + b for a in letters for b in letters] 


### Data Classes :

### Metaclasses :

### Python descriptors :
Python descriptors gives us a powerful technique to write  reusable code that can be used between classes.  

 @classmethod, @staticmethod, and @property. 

The @classmethod and @staticmethod decorators are used to define methods inside a class namespace that are not connected to a particular instance of that class. 

The @property decorator is used to customize getters and setters for class attributes. 

### Use case for '@property'
Suppose in a class there are two properties, radius and circumference. circumference is calculated using radius.
But if we modify radius then circumference will not change automagically. We define a function circumference()
with decorator property (this now becomes a getter) and then access it like a normal attribute, ie obj.circumference (not obj.circumference()).

### Background
Attributes(method and otherwise) of an objects are stored in dict on the object. (obj.\__dict__). 

If you access an attribute of an object (obj.foo). It gets you one of the following three.
- Result of a property of same name if it is defined.
  Result of the \__get__ method of 'data descriptor' of the same name attached to the class, if it exists. 
- Corresponding value in obj.\__dict__ if it exists.
- fall back to look in type(obj).\__dict__. i.e in the class attribute 'list'
- Repeating for each type until it exists in MRO.
- And Assignment always creates an entry in obj.\__dict__.
- Unless there was a setter property in which case you are callling a function.

### What is a Data descriptor :
- Descriptors is any object that implements atleast one of the methods named \__get__, \__set__, \__delete__.
- A data descriptor implements both \__get__ and \__set__ methods.
- implementing only \__get__ makes it a non data descriptor.

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
Syntax : lambda arguments : expression i.e. lambda x, y : x + y


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
Head : First element of the list.  
Tail : all elements except the head in the list.  
Bad head : Present in the tail of other sequence.  
Good head : Not in the tail of any other list/sequence.

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
L[O] = O,	L[D] = [D, O],	L[E] = [E, O],	L[F] = [F, O]  
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


### Numpy
```python
np.array(list)
np.arange(0, 100, 3)
np.linspace(0, 10, 20) # evenly spaced 20 items
np.shape
np.reshape()
np.resize() : inplace
np.ones((x,y))
np.zeros((x,y))
np.eye(x)
np.diag(list) # create diagonal array/matrix
np.repeat(list, k) # create a list k times larger than "list".
np.vstack(arr1, arr2) # stack vertically
np.hstack(arr1, arr2) # stack hozizontally
```

### Element-wise array operations
**Note**: array should be of same size.
```python
arr1 + arr2
arr1 - arr2
arr1 * arr2

# more operations
arr1.dot(arr2) : arrays should have compatible shape
arr1.T : transpose 

arr1.dtype : type of elements in array
arr1.astype(type) : change type of the array elements to type 

arr1.sum()
arr1.max()
arr1.min()
arr1.mean()
arr1.std()
arr1.argmax() : get index of max value
arr1.argmin() : get index of min value
```

**Note**: len() gives no. of rows in a 2D array.

### Array indexing/Slicing
For a 1D array (Note index ~= x:y:z in each dimension of the array)  
arr1[index]  
arr1[x:y:z] : If x:start index, y:end index, z: step size. if z is negative then counting is from the end of array

For a 2D array,   
arr1[index1, index2]  
arr1[x1:y1:z1, x2:y2:z2]  

Conditional indexing and assignment  
arr1[arr1 > 30]  
arr1[arr1 > 30] = 50  

### creating an array of random ints of a certain shape
```python
np.random.randint(low, high, (array shape)) 
```

### Iterating over arrays
- for a 2d arr, we can iterate over rows using for loop.
- len() gives no. of rows.
- enumerate gives (rowindex, row) touple 
- We can also zip two 2D arrays to get a touple containing row index of each array.


### class decorators


### web dev security
- CSRF
- XSRF

### OWASP (Open Web Application Security Project) Top 10

1. Injection
2. Bad Authentication
3. Sensitive Data Exposure
4. XML External Entity (XXE)
5. Bad Access Control
6. Security Miscofiguration
7. Cross Site Scripting
8. Insecure deserialization
9. Using component with Vulnerabilities
10. Insufficient logging and monitoring



### DEVOPS :
Definition of DevOps :
DevOps is a new term emerging from the collision of two major related trends. The first was also called “agile infrastructure” or “agile operations”; it sprang from applying Agile and Lean approaches to operations work.  
The second is a much expanded understanding of the value of collaboration between development and operations staff throughout all stages of the development lifecycle when creating and operating a service, and how important operations has become in our increasingly service-oriented world.

DevOps is a set of software development practices that combines software development with information technology operations to shorten the systems development life cycle while delivering features, fixes, and updates frequently in close alignment with business objectives.


### Microservices :
The microservices architecture is a design approach to build a single application as a set of small services. Each service runs in its own process and communicates with other services through a well-defined interface using a lightweight mechanism, typically an HTTP-based application programming interface (API). Microservices are built around business capabilities; each service is scoped to a single purpose. You can use different frameworks or programming languages to write microservices and deploy them independently, as a single service, or as a group of services.

### Metaclasses (TBD)



### Python requests

```shell
Simple GET request
>>> import requests 
>>> r = requests.get('http://google.com')

Pass the parameters in GET URLs (Passed in query string eg. httpbin.org/get?key=val)
>>> parameters = {'key1': 'value1', 'key2': 'value2'} 
>>> r = requests.get('https://httpbin.org/get', params=parameters)
>>> print(r.url)
https://httpbin.org/get?key1=value1&key2=value2

Simple POST request
>>> r = requests.post('https://httpbin.org/post', data = {'key':'value'})

Simple PUT request (Not allowed 405)
>>> r = requests.put('https://httpbin.org/put', data = {'key':'value'})

Simple DELETE request
>>> r = requests.delete('https://httpbin.org/delete')

Simple HEAD request
>>> r = requests.head('https://httpbin.org/get')

Simple OPTIONS request
>>> r = requests.options('https://httpbin.org/get')

Logging in using credentials 
>>> r = requests.get('https://api.github.com/user', auth=('myemailid. mail.com', 'password'))
>>> r.status_code 
200 
>>> r.url 
u'https://api.github.com/user' 
>>> r.request
<PreparedRequest [GET]>
```

### r.content vs r.text vs r.encoding 
- r.content : raw data (bytes, no meaning)
- r.text : when r.encoding is applied to r.content (meaning/code point applied to a chunk of byte(s))
- r.encoding : Encoding to be applied to r.content to get r.text.

**Note** : Unicode is 4 bytes encoding.  
```shell
# raw content
>>> r.content
# return a string as per ‘r.encoding’
# ‘r.apparent_encoding’ is used if ‘r.encoding’ is None
>>> r.text  
>>> r.encoding
‘utf-8’
>>> r.apparent_encoding
‘ascii’

```
