---
layout: single
title: "Intro to RASA"
excerpt: "Intro to RASA conversational AI"

sidebar:
  - title: "Intro to RASA"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---

---
---

<p style="text-align: center;"># Rasa NLU and Core</p>

# Defining the pipeline

*Intent classification* is independent of *entity extraction*. So sometimes NLU will get the intent right but entities wrong, or the other way around. You need to provide enough data for both intents and entities.

Pipeline defined in config.yml

pipeline:
- name: "CountVectorsFeaturizer"
- name: "EmbeddingIntentClassifier"
  intent_tokenization_flag: true
  intent_split_symbol: "+"

CountVectorsFeaturizer: defines how model features are extracted
EmbeddingIntentClassifier: states that we are going to use TensorFlow embeddings for intent classification
intent_tokenization_flag: true  -> tell the model that we want to split intent labels into tokens which means that the model will know which intents are multi-intents
intent_split_symbol: define which character should be used to make a split, which in this case is a +.
	

data/nlu_data.md : contains training data in markdown.

sample data/nlu_data.md file:

## intent: meetup
- I am new to the area. What meetups I could join in Berlin? 
- I have just moved to Berlin. Can you suggest any cool meetups for me?

## intent: affirm+ask_transport
- Yes. How do I get there?
- Sounds good. Do you know how I could get there from home?

# Training and testing the NLU model:
You can specify parameters like number of epochs used in training inside the config.yml file.

$ rasa train nlu
$ rasa shell nlu

# train both NLU and core model:
trains both NLU and Core models and saves them as a compressed tar.gz file
$ rasa train
$ rasa shell


# Defining the domain and training data

The domain file(domain.yml) contains templates, which dialogue management model will use to respond to the user.

Sample domain.yml file:
templates:
  utter_greet:
    - text: "Hey, how can I help you?"
  utter_goodbye: # Note this, have more than one possible response
    - text: "Talk to you later!"
    - text: "Goodbye :("
    - text: "Bye!"
    - text: "Have a great day!"
  utter_confirm:
    - text: "Done - I have just booked you a spot at the Bots Berlin meetup."
    - text: "Great, just made an RSVP for you."

Generating the stories:

to train a dialogue management model we need some stories. stories are defined in data/stories.md file.
stories contain intent(defined in nlu_data.md)  and the corresponding action (defined in domain.yml)

sample data/stories.md file:

* greet # intent followed by action.
    - utter_greet
* meetup
    - utter_meetup
* affirm+ask_transport
    - utter_affirm_suggest_transport
* thanks+goodbye
    - utter_thanks
    - utter_goodbye


Note: 

the stories definition is entirely upto dev/domain, there can be single/multiple actions for a single/multiple intents.

it is important to note that you should consider using multi-intents only when the logic of your chatbot requires it. Excessive use of multi-intents can overcomplicate the chatbot so we suggest using them only when they are really necessary to ensure the natural flow of the conversation with your chatbot.

TensorFlow pipeline is only performing intent classification tasks.
Check if TF is used for entity recognition in current version.

Rasa NLU — 
a library for natural language understanding (NLU) which does the classification of intent and extract the entity from the user input and helps bot to understand what the user is saying.

Rasa Core — 
a chatbot framework with machine learning-based dialogue management which takes the structured input from the NLU and predicts the next best action using a probabilistic model like LSTM neural network.

Intent — 
Intent is nothing but what the user is aiming for. For example — if the user says“Reserve a table at Cliff House tonight” the intent can be classified as to book the table.

Entity — 
Entity is to extract the useful information from the user input. From the example above “Reserve a table at Cliff House tonight” the entities extracted would be place and time. Place — Cliff House and Time — tonight.

Stories —
Stories define the sample interaction between the user and chatbot in terms of intent and action taken by the bot

Actions — 
Actions are basically the operations performed by the bot either asking for some more details to get all the entities or integrating with some APIs or querying the database to get/save some information.


Domain(domain.yml)
The domain consists of five key parts consisting of intents, entities, slots, actions, and templates.

slots: slots are basically bot’s memory. They act as a key-value store which can be used to store information the user provided (e.g their home city) as well as information gathered about the outside world (e.g. the result of a database query).

actions: are nothing but bots response to user input. There are 3 kinds of actions in Rasa Core: default actions, utter actions & custom actions

templates: templates are messages the bot will send back to the user.

Types of actions:

default actions (action_restart)
utter actions (utter_greet, utter_reply ….) 
custom actions (action_get_news)
utter_default: a fallback in case bot is not able to understand the user message

Policies (policy.yml)
rasa core policies decide which action to take at every step in the conversation.

policies:
  - name: KerasPolicy
    epochs: 100
    max_history: 3
  - name: MemoizationPolicy
    max_history: 3
  - name: FallbackPolicy
    nlu_threshold: 0.1
    core_threshold: 0.2
    fallback_action_name: 'utter_default'
  - name: FormPolicy

FallbackPolicy: comes in to picture when ‘nlu_threshold’ & ‘core_threshold’ don't meets the levels defined in the policy which means that bot is not able to understand the user message and it responds with ‘utter_default’.


Custom Actions (actions.py)
They run code instead of replying in text for eg. turning on the lights, adding an event to a calendar, check a user’s bank balance, etc.

Rasa Core calls an endpoint specified by us when a custom action is predicted. This endpoint should be a web server that reacts to this call, runs the code and optionally returns information to modify the dialogue state.

To specify, our action server we use the endpoints.ymland pass it to the scripts using --endpoints endpoints.yml


Natural Language Understanding: means turning user messages into structured data

rasa init --no-prompt 

Creates rasa project with basic files.

data/nlu.md: contains NLU training data.

config.yml: defines model cofig data.

dialogue management: handled by your Core model. 

A story is a real conversation between a user and an assistant. user intent -> asisstant action
Core models learn from real conversational data in the form of training “stories”. file location data/stories.md.


The domain defines the universe your assistant lives in: file domain.yml


workflow:
1. Create a New Project
2. View Your NLU Training Data
3. Define Your Model Configuration
4. Write Your First Stories
5. Define a Domain
6. Train a Model
7. Talk to Your Assistant


RASAX:
What Rasa X is:
Rasa X is a tool to learn from real conversations and improve your assistant.
Using it is totally optional. If you don’t want to, you can just use Rasa on its own.

What Rasa X is not:
It’s not a hosted service.
It’s not an all-in-one, point-and-click bot platform.

