---
layout: single
title: "NLP"
excerpt: "Intro to NLP"

sidebar:
  - title: "NLP personal notes"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---


Lexicon Normalization

Stemming
Lemmatization


Bag-of-Words Model :
-  no order of words
- just count the occurence of words


convert text to word count vectors with CountVectorizer.
both tokenize a collection of text documents and build a vocabulary of known words



convert text to word frequency vectors with TfidfVectorizer.
    • Term Frequency: This summarizes how often a given word appears within a document.
    • Inverse Document Frequency: This downscales words that appear a lot across documents.



convert text to unique integers with HashingVectorizer.
one way hash of words to convert them to integers