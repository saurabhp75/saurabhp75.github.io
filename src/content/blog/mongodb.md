---
title: "Mongodb"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Mongodb"]
draft: false
description: "Introduction to Mongodb"
---

## Installing mongodb on Ubuntu

1. Add the official repository key.

```shell
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
```

2. Add MongoDB repository to your system

```shell
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
```

3. Install mongodb

```shell
$ sudo apt update
$ sudo apt install -y mongodb-org
```

4. Enter following command

```shell
$ mkdir data
$ echo "mongod --dbpath=data --nojournal" > mongod
$ chmod a+x mongod
```

5. Now run ./mongod

## Mongodb Shell

Run mongo (after running mongod server).

Mongodb commands (to be run from shell)

1. help
2. show dbs : Show database names.
3. Show collections : Show collections in current database
4. Use database-name :
   Use demo (Use a database, create if it doen’t exist.)
5. Insert :

```
   db.dogs.insert({name:”Rusty”, breed:”mutt”}) _ This will create dogs collection if it doesn’t exit _
   show collections
   db.dogs.find() _ show all dogs _/
```

6. find :
   `db.dogs.find({name:”Rusty”})`
7. update :

```
   db.dogs.update({name:”Rusty”}, {breed:”poodle”}) /_ will over-write entire row/entry _/
   db.dogs.update({name:”Rusty”}, {$set: {breed:”poodle”}}) _ correct way to update entry _/
```

8. remove :

```
   db.dogs.remove({name:”Rusty”})
   db.dogs.remove({}) /_ remove all _/
```

9. drop a collection?

```
   db.dogs.drop()
```

## Mongoose

```javascript
var mongoose = require(“mongoose”);
/* will connect to a db, create a new db if doen’t exist */
mongoose.connect(“mongodb://localhost/db_name”);

var catSchema = new mongoose({
name : String,
age : Number,
temperament : String
});

/* Compile the schema into a model. It also adds the methods to access
   the model/db via “Cat” variable. It is singular version of collection name (Cats)
   which is automatically created by  mongoose. So we will use “db.Cats.methodname” */
var Cat = mongoose.model(“Cat”, catSchema);

Cat.find()
Cat.remove()
Cat.create()
cat.findById()
```
