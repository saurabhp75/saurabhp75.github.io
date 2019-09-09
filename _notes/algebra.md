---
layout: single
title: "Linear Algebra"
excerpt: "Intro to Linear Algebra"
---

### Vector Multiplication
c = a × b  
c = (a1b1, a2b2, a3b3)  
c = a * b  

### Vector Division
c = a/b  
c = (a1/b1, a2/b2, a3/b3)  
c = a/b  


### Vector Dot Product
c = a · b  
c = (a1b1 + a2b2 + a3b3)  
c = a.dot(b)  


### Vector-Scalar Multiplication
c = s * a


## Vector Norms

### Vector L1 Norm
||v|| 1 = |a1| + |a2| + |a3|  
l1 = norm(a, 1)

### Vector L2 Norm
l2 = norm(a)


### Vector Max Norm
The length of a vector can be calculated using the maximum norm, also called max norm
```python
maxnorm = norm(a, inf)
```


## Matrix Multiplication (Hadamard Product)
```python
C = A * B
```

## Matrix-Matrix Multiplication (aka matrix dot product)
```python
C = A.dot(B)
# multiply matrices with @ operator
D = A @ B
```

## Matrix-Vector Multiplication
```python
C = A.dot(B)
```

### Square Matrix

### Symmetric Matrix
type of square matrix where the top-right triangle is the same as the
bottom-left triangle. A symmetric matrix is always square and equal to its own transpose.

### Triangular Matrix
type of square matrix that has all values in the upper-right or lower-left
of the matrix with the remaining elements filled with zero values.

```python
lower = tril(M)
print(lower)
# upper triangular matrix
upper = triu(M)
```

### Diagonal Matrix
A diagonal matrix is one where values outside of the main diagonal have a zero value, where the
main diagonal is taken from the top left of the matrix to the bottom right.

```python
# extract diagonal vector
d = diag(M)
print(d)
# create diagonal matrix from vector
D = diag(d)
```

### Identity Matrix :
square matrix that does not change a vector when multiplied. The
values of an identity matrix are known. All of the scalar values along the main diagonal (top-left
to bottom-right) have the value one, while all other values are zero.

```python
I = np.identity(3)
```

### Orthogonal Matrix:
Two vectors are orthogonal when their dot product equals zero. The length of each vector is 1
then the vectors are called orthonormal because they are both orthogonal and normalized.

v · w = 0  
v · wT = 0


An orthogonal matrix is a square matrix whose rows are mutually orthonormal and
whose columns are mutually orthonormal. A matrix is orthogonal if its transpose is equal to its inverse.
Multiplication by an orthogonal matrix preserves lengths.


## Matrix Operations
- Transpose
- Inverse
- Trace

A trace of a square matrix is the sum of the values on the main diagonal of the matrix (top-left
to bottom-right).

### Determinant:
The determinant of a square matrix is a scalar representation of the volume of the matrix.

### Rank:
The rank of a matrix is the estimate of the number of linearly independent rows or columns in
a matrix.

















