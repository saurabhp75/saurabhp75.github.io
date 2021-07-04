---
layout: single
title: "PCA"
excerpt: "Intro to PCA"
---

Source: Victor lavrenko youtube PCA :

1. Curse of dimensionality
   With increase in dimensions, the density of data decrease sharply. Leading to sparse data.
   for eg if we have 3 regions/groups/classes in 1D, they become 3\*\*2 in 2D and so on.

2. Dealing with high dimensionality

- Domain knowledge.

- Make assumptions about dimensions

  - Independence : (like naive bayes) that they are independent
    and treat each dimension/feature independently.
  - Smoothness : Nearby regions in space should have similar distrubutions of classes.
  - Symmetry : aka exchangability, means order of attributes/dimenasion doesn't matter.
    ie x1 low and x2 high is same as x1 high and x2 low.

- Reduce the dimensionality of data
  Create a new set of smaller dimensions.

## Dimesionality reduction goals :

- Try to preserve as much "structure" in the data as possible. Any kind of "structure"
  useful for classification/regression. Structure is usually variance of data.

## PCA :

- Pick the dimension with highest variance.

## How to get the pricipal components :

- Centre(not scale it?) the data (subtract the mean from each data point).
  So that the origin is in the centre of data cloud.
- Compute the covariance matrix (Sigma) of dimeansions x1 and x2
- do x1 and x2 increase together (+ve covariance)
- or x2 decrease as x1 increase (-ve covariance)
- or x1 decrease as x2 increase (-ve covariance)
- None of the above (no covariace)

Covariance Matrix :

           x1        x2

      x1   2.0      0.8

      x2   0.8      0.6

variance of x1 = 2.0  
variance of x2 = 0.6  
covariance x1/x2 = 0.8 (x1 and x2 increase together)
covariance x2/x1 = 0.8

cov(a,b) = 1/n Σ(i=1,n)[xia*xib] (observe there is no subtraction of mean from xia or xib as data is centred)

n = no. of samples.

xia = ath feature in ith sample.  
xib = bth feature in ith sample.

Covarinace = 1/n Σ(xi – µx )(yi - µi )

Variance (σ2) = 1/n Σ(i=1,n)[xi - µ ]2

standard deviation (σ) = The square root of the variance is known as the standard deviation.

[Covariance](http://mathworld.wolfram.com/Covariance.html)  
[Variance](http://mathworld.wolfram.com/Variance.html)

Now take any vectore in feature space and multiply it by covariance matrix repeatedly, it’s direction will ultimately converge to the direction of eigen vector.
