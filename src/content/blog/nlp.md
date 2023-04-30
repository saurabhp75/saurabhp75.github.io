---
title: "NLP"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["NLP"]
draft: false
description: "Introduction to NLP"
---

## Lexicon Normalization

- Stemming
- Lemmatization

## Bag-of-Words Model :

- no order of words
- just count the occurence of words

Convert text to word count vectors with **CountVectorizer**.
Both tokenize a collection of text documents and build a vocabulary of known words

Convert text to word frequency vectors with **TfidfVectorizer**.

- Term Frequency: This summarizes how often a given word appears within a document.
- Inverse Document Frequency: This downscales words that appear a lot across documents.

Convert text to unique integers with **HashingVectorizer**.

- one way hash of words to convert them to integers
