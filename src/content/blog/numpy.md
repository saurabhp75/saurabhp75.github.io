---
title: "Numpy"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Numpy"]
draft: false
description: "Introduction to Numpy"
---

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

### Creating an array of random ints of a certain shape

```python
np.random.randint(low, high, (array shape))
```

### Iterating over arrays

- for a 2d arr, we can iterate over rows using for loop.
- len() gives no. of rows.
- enumerate gives (rowindex, row) touple
- We can also zip two 2D arrays to get a touple containing row index of each array.
