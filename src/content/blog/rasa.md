---
title: "RASA"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["RASA", "NLP"]
draft: false
description: "Introduction to RASA"
---

`<br><br>`
**Note**: Rasa NLU and Rasa Core are now merged.

## Workflow:

1. Create a New Project

```shell
$ rasa init
```

2. View Your NLU Training Data

```shell
$ vi data/nlu.md
```

3. Define Your Model Configuration

```shell
$ vi config.yml
```

4. Write Your First Stories

```shell
$ vi data/stories.md
```

5. Define a Domain

```shell
$ vi domain.yml
```

6. Train a Model

```shell
$ rasa train
```

7. Talk to Your Assistant

```shell
$ rasa shell
```

### Rasa NLU:

**User Input --> Intents and entities**  
A library for natural language understanding (NLU) which does the classification of intent and extract the entity from the user input and helps bot to understand what the user is saying.

### Rasa Core:

**Intent and entities --> Action**  
A chatbot framework with machine learning-based **dialogue management** which takes the structured input from the NLU and predicts the next best action using a probabilistic model like LSTM neural network.

## RASA Terminology

### Intent

Intent is nothing but **what the user is aiming for**. For eg. if the user says “Reserve a table at Cliff House tonight” the intent can be classified as to book the table.

### Entity

Entity is to extract the **useful information** from the user input. From the example above “Reserve a table at Cliff House tonight” the **entities** extracted would be **place** and **time**. Place — Cliff House and Time — tonight.

### Stories

Stories define the **sample interaction** between the user and chatbot in terms of **intent and action** taken by the bot. They are defined in `data/stories.md`.

### Actions

Actions are basically the **operations performed by the bot** either asking for some more details to get all the entities or integrating with some APIs or querying the database to get/save some information. There are **3 kinds of actions** in Rasa Core: default actions, utter actions & custom actions.

- Utterance actions: Starts with utter\_, just send a message to the user
- Custom actions: Any other action, these actions can run arbitrary code
- Default actions: e.g. action_listen, action_restart, action_default_fallback

### Domain

The domain consists of **five key parts** consisting of **intents, entities, slots, actions, and templates**. The domain defines the universe your assistant lives in file `domain.yml`.
**intent**:  
**entity**:  
**Slots**: Slots are basically bot’s memory. They act as a key-value store which can be used to store information the user provided (e.g their home city) as well as information gathered about the outside world (e.g. the result of a database query).
**Actions**:
**Templates**: Templates are messages the bot will send back to the user.

Sample domain file.

```yaml
intents:
  - greet
  - goodbye
  - affirm
  - deny
  - mood_great
  - mood_unhappy

actions:
  - utter_greet
  - utter_cheer_up
  - utter_did_that_help
  - utter_happy
  - utter_goodbye

templates:
  utter_greet:
    - text: "Hey! How are you?"

  utter_cheer_up:
    - text: "Here is something to cheer you up:"
      image: "https://i.imgur.com/nGF1K8f.jpg"

  utter_did_that_help:
    - text: "Did that help you?"

  utter_happy:
    - text: "Great carry on!"

  utter_goodbye:
    - text: "Bye"
```

### Defining the pipeline

**Intent classification** is independent of **entity extraction**. So sometimes NLU will get the intent right but entities wrong, or the other way around. You need to provide enough data for both intents and entities.

Pipeline defined in `config.yml`

```yaml
pipeline:
  - name: "CountVectorsFeaturizer"
  - name: "EmbeddingIntentClassifier"
    intent_tokenization_flag: true
    intent_split_symbol: "+"
```

**CountVectorsFeaturizer**: Defines how model features are extracted.  
**EmbeddingIntentClassifier**: states that we are going to use TensorFlow embeddings for intent classification.  
**intent_tokenization_flag**: true -> tells the model that we want to split intent labels into tokens which means that the model will know which intents are multi-intents.  
**intent_split_symbol**: define which character should be used to make a split, which in this case is a +.

`data/nlu_data.md` : contains training data in markdown.

Sample `data/nlu_data.md` file

```markdown
### intent: meetup

- I am new to the area. What meetups I could join in Berlin?
- I have just moved to Berlin. Can you suggest any cool meetups for me?

### intent: affirm+ask_transport

- Yes. How do I get there?
- Sounds good. Do you know how I could get there from home?
```

### Training and testing only the NLU model

**Note**: You can specify parameters like number of epochs used in training inside the config.yml file.

```shell
$ rasa train nlu
$ rasa shell nlu
```

### Train both NLU and core model

To train both NLU and Core models and save them as a compressed tar.gz file

```shell
$ rasa train
$ rasa shell
```

### Generating the stories

To train a dialogue management model we need some **stories**. Stories are defined in `data/stories.md` file.
stories contain intent(defined in nlu_data.md) and the corresponding action(defined in domain.yml)

sample `data/stories.md` file:

```yaml
* greet # intent followed by action.
    - utter_greet
* meetup
    - utter_meetup
* affirm+ask_transport
    - utter_affirm_suggest_transport
* thanks+goodbye
    - utter_thanks
    - utter_goodbye
```

### Note:

The stories definition is entirely upto dev/domain, there can be single/multiple actions for a single/multiple intents.

It is important to note that you should consider using multi-intents only when the logic of your chatbot requires it. Excessive use of multi-intents can overcomplicate the chatbot so we suggest using them only when they are really necessary to ensure the natural flow of the conversation with your chatbot. TensorFlow pipeline is only performing intent classification tasks.
Check if TF is used for entity recognition in current version.

### Types of actions:

- default actions (action_restart)
- utter actions (utter_greet, utter_reply ….)
- custom actions (action_get_news)
- utter_default: a fallback in case bot is not able to understand the user message

### Policies (policy.yml)

Rasa core policies decide which action to take at every step in the conversation.

```yaml
policies:
  - name: KerasPolicy
    epochs: 100
    max_history: 3
  - name: MemoizationPolicy
    max_history: 3
  - name: FallbackPolicy
    nlu_threshold: 0.1
    core_threshold: 0.2
    fallback_action_name: "utter_default"
  - name: FormPolicy
```

FallbackPolicy: comes in to picture when ‘nlu_threshold’ & ‘core_threshold’ don't meets the levels defined in the policy which means that bot is not able to understand the user message and it responds with ‘utter_default’.

### Custom Actions (actions.py)

They run code instead of replying in text for eg. turning on the lights, adding an event to a calendar, check a user’s bank balance, etc.

Rasa Core calls an endpoint specified by us when a custom action is predicted. This endpoint should be a web server that reacts to this call, runs the code and optionally returns information to modify the dialogue state.

To specify, our action server we use the endpoints.ymland pass it to the scripts using --endpoints endpoints.yml

Natural Language Understanding: means turning user messages into structured data

```shell
$ rasa init --no-prompt
```

Creates rasa project with basic files.

`data/nlu.md`: contains NLU training data.

`config.yml`: defines model cofig data.

dialogue management: handled by your Core model.

A story is a real conversation between a user and an assistant. user intent -> asisstant action
Core models learn from real conversational data in the form of training “stories”. file location data/stories.md.

### RASAX:

Rasa X is a tool to learn from real conversations and improve your assistant.
Using it is totally optional. If you don’t want to, you can just use Rasa on its own.

### What Rasa X is not:

It’s not a hosted service. It’s not an all-in-one, point-and-click bot platform.

Docker shares the host OS/kernel.

A **container** is a runtime instance of an **image**.

A container runs natively on Linux and shares the kernel of the host machine with other containers.

It runs a discrete process, taking no more memory than any other executable, making it lightweight

**virtual machine(VM)** runs a full-blown “guest” operating system with virtual access to **host resources** through a **hypervisor**.
In general, VMs provide an environment with more resources than most applications need.

### List of running containers

```shell
$ docker ps
```

### Misc

To see details about a package in ubuntu

```bash
$ apt-cache showpkg
```

[Rasa Docker Images(Core + NLU)](https://hub.docker.com/r/rasa/rasa_nlu/)

### Run(and train) rasa with Docker

```shell
$ docker run -v $(pwd):/app rasa/rasa init --no-prompt
```

### Train the rasa

```shell
$ docker run -v $(pwd):/app rasa/rasa:latest train --domain domain.yml --data data --out models
```

### Run the chatbot

```shell
$ docker run -it -v $(pwd):/app rasa/rasa shell
```

### Componenets of pipeline

### Word Vector Sources

- SpacyNLP

### Featurizers

- SpacyFeaturizer
- NGramFeaturizer
- RegexFeaturizer
- CountVectorsFeaturizer

### Intent Classifiers

- KeywordIntentClassifier
- SklearnIntentClassifier
- EmbeddingIntentClassifier

### Tokenizers

- WhitespaceTokenizer
- SpacyTokenizer

### Entity Extractors

- SpacyEntityExtractor
- EntitySynonymMapper
- CRFEntityExtractor
- DucklingHTTPExtractor

If you want to split intents into multiple labels, e.g. for predicting **multiple intents** or for modeling **hierarchical intent structure**, you can only do this with the **supervised embeddings pipeline**.

```yaml
language: "en"
pipeline: "pretrained_embeddings_spacy"
```

### Is same as

```yaml
language: "en"

pipeline:
  - name: "SpacyNLP"
  - name: "SpacyTokenizer"
  - name: "SpacyFeaturizer"
  - name: "RegexFeaturizer" # also used in embedding pipeline
  - name: "CRFEntityExtractor" # also used in embedding pipeline
  - name: "EntitySynonymMapper" # also used in embedding pipeline
  - name: "SklearnIntentClassifier"
```

**Pre-configured Pipelines**: A template is just a shortcut for a full list of components.
The two configurations below are equivqlent.

```yaml
language: "en"
pipeline: "supervised_embeddings"
```

### Is same as

```yaml
language: "en"

pipeline:
  - name: "WhitespaceTokenizer"
  - name: "RegexFeaturizer"
  - name: "CRFEntityExtractor"
  - name: "EntitySynonymMapper"
  - name: "CountVectorsFeaturizer"
  - name: "EmbeddingIntentClassifier"
```

### RegexFeaturizer

- Supports intent and entity classification.
- Outputs `text_features` and `tokens.pattern`.
- During training, the regex intent featurizer creates a list of regular expressions defined in the training data format.
- For each regex, a feature will be set marking whether this expression was found in the input, which will later be fed into intent classifier / entity extractor to simplify classification (assuming the classifier has learned during the training phase, that this set feature indicates a certain intent).
- Regex features for entity extraction are currently only supported by the CRFEntityExtractor component!

### CRFEntityExtractor

- Conditional random field entity extraction
- Output: appends `entities`
- Performs named entity recognition.

### EntitySynonymMapper

- Maps synonymous entity values to the same value.

### CountVectorsFeaturizer

- Creates bag-of-words representation of intent features.
- Used as an input to intent classifiers that need bag-of-words representation of intent features.

### EmbeddingIntentClassifier

- Outputs `intent` and `intent_ranking`.

### Forms

One of the most common conversation patterns is to collect a few pieces of information from a user in order to do something (book a restaurant, call an API, search a database, etc.). This is also called **slot filling**.

If you need to collect multiple pieces of information in a row, we recommended that you create a **FormAction**. When you define a form, you need to add it to your domain file.

To use forms, you also need to include the FormPolicy in your policy configuration file. For example:
``yaml
policies:

- name: "FormPolicy"

```

```
