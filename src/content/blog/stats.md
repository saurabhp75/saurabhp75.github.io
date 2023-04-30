---
title: "Statistics"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Maths"]
draft: false
description: "Introduction to Statistics"
---

**Mean** : sensitive to outliers

```python
np.mean()
np.nammean()
```

**Median** : Not sensitive to outliers

```python
np.median()
```

when a distribution is symmetrical, the mean and the median value coincide.

**Mode** : The most frequently occurring value in a distribution.

Python Code :

```python
from scipy import stats.
data = [1, 3, 4, 4, 7]
stats.mode(data)
(array([4]), array([ 2.]))
```

**Geometric Mean** : Can be useful to describe the location of a distribution

Python Code :

```python
x = np.arange(1,101)
stats.gmean(x)
37.992689344834304
```

**Range** : It is simply the difference between the highest and the lowest data value.

Python Code :

```python
range = np.ptp(x) # peak to peak
```

### Percentiles :

The simplest way to understand centiles, also called percentiles, is to first define the
Cumulative Distribution Function (CDF):

The CDF is the integral of the PDF from minus infinity up to the given value, and thus
specifies the percentage of the data that lie below this value.

### Standard Deviation and Variance :

Python Code :

```python
data = np.arange(7,14)
np.std(data, ddof=0)
2.0
np.std(data, ddof=1)
2.16025
```

### Chi Squared test :

The chi-squared test is used to determine whether there is a significant difference
between the expected frequencies and the observed frequencies in one or more categories.

### A/B testing:

Randomized experiment with two variants, A and B. It includes application of statistical hypothesis
testing or "two-sample hypothesis testing" as used in the field of statistics. A/B testing is a way
to compare two versions of a single variable, typically by testing a subject's response to variant
A against variant B, and determining which of the two variants is more effective.
