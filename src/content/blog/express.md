---
title: "ExpressJS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["ExpressJS", "Heroku"]
draft: false
description: "Introduction to ExpressJS"
---

## Library vs framework

- On library you have the control.
- In framework the control is inverted. The control is with framework.
- Framework tells where to put the code.

## Planning a Web project

- User stories: Who(user), what(action) and why(benefit).
- Features/flowcharts:
- Architecture:
- Implementation:

## Express

- Web dev framework, unopinionated, minimal framework.
- Starts up a server to listen for requests.
- working with Query string: Parse incoming request using req.parse() to parse query string.
- App.use(): Handles all paths. use to add middleware.
- `*`: This route Catch all request
- Working with Params: parsing the variable path using req.params()
- Nodemon: No need to rstart nodejs server when any file changes. Just refresh the page.
- Handling assets in express: `app.use(express.static('public'))`.
- ejs partials: Include html/ejs files
- ejs: use `<%= %>` to add escaped html and `<% %>` to add JS code. Use `<%- %>` to add unescaped HTML.

## Get vs Post request

- get is used to retrieve info
- data is sent via query string (a string starting with ? and params seperated by &)
- Info is plainly visible in url.
- limited amount of data can be sent.

- post is used to post data to the server.
- used to write/create/update.
- data is sent via request body and not query string.
- can send any sort of data (json).

## Passing variabler to ejs template

- `res.render('template-name', {key[: value]})`

## Handling variable paths

- Use `:variable` in the route.
- Use `request.params` to extract the variable.

## Handling get request from forms in express

- Extract query params usring `req.query` property.

## Handling post request from forms in express

- Handling post request: Use req.body() to retrieve data. also include the middleware.
- Use middleware: `app.use(express.urlencoded({ extended: true }))`

## Handling posting of json data

- Handling post request: Use req.body() to retrieve data. also include the middleware.
- Use middleware: `app.use(express.json()) // for parsing application/json`

## Enable PUT and PATCH verbs in the forms

- Install `method-override` using npm.

## Redirect

- res.redirect('/comments').

## What is REST

- Representational state transfer.
- Set of guidlines for client server communication.
- We need this guidline to create restful routes.
- Path/route is based on resource (on the server).
- HTTP verbs: GET, PUT/PATCH, PATCH, DELETE.

1. Client–server architecture
2. Statelessness: no session information is retained by the server. Every http reuest is independent.
3. Cacheability: clients and internediaries can cache data. Response should contain info if it is cachable or not.
4. Layered system: There can be proxies and load balancers between client and server. They are not visible to client.
5. Code on demand (Optional): Client side scripts, server can transfer executable scripts to the clients.
6. Uniform interface

### RESTFul routes

| **Description**               | **Route** | **Method**         |
| :---------------------------- | :-------- | :----------------- |
| Display all comments          | GET       | /comments          |
| Display details of a comments | GET       | /comments/:id      |
| Add a comment                 | POST      | /comments          |
| Form to add new comment       | GET       | /comments/new      |
| Update a comment              | PUT/PATCH | /comments/:id      |
| Form to update a comment      | GET       | /comments/:id/edit |
| Delete a comment              | DELETE    | /comments/:id      |

# Mongo DB

## BSON

- Binary JSON.
- Faster than JSON.
- Support more data types.

## Inserting into mongo db

- A db contains many colections.
- Entry in the collection need not follow any schema.
- We insert data into collections.
- Inserting into a non existent collection will create it.

1. db.collection.insertOne(): Inserts a single document into a collection.
2. db.collection.insertMany(): inserts multiple documents into a collection.
3. db.collection.insert(): inserts a single document or multiple documents into a collection.

- Create a new db: `use dbname` create if not already existing.
- Show dbs: `show dbs`
- Show current db: `db`
- Show collections: `show collections`

- Show items in collection: `db.collectionName.find()`

## Quering mongo db

- `db.collection.find({breed: "Corgy"})`
- `db.collection.findOne({breed: "Corgy"})`
- find returns a cursor whereas findOne returns actual item.

## Updating mongodb

- Consist of two steps, first find and then update.

- `db.collection.updateOne()`: Updates at most a single document that match a specified filter even though multiple documents may match the specified filter.

- `db.collection.updateMany()`: Update all documents that match a specified filter.

- `db.collection.replaceOne()`: Replaces at most a single document that match a specified filter even though multiple documents may match the specified filter.

```json
db.restaurant.updateOne(
      { "name" : "Central Perk Cafe" },
      { $set: { "violations" : 3 } }
   );
```

## Deleting in mongo db

- `db.collection.deleteOne()`: Delete at most a single document that match a specified filter even though multiple documents may match the specified filter.
- `db.collection.deleteMany()`: Delete all documents that match a specified filter.
- `db.collection.remove()`: Delete a single document or all documents that match a specified filter.

```json
 db.orders.deleteOne( { "_id" : ObjectId("563237a41a4d68582c2509da") } );

```

## delete everything in a collection

- `db.dogs.deleteMany({})` : Delete everything from dogs collection.

## Additional mongo operators

- `gt`, `lt`, `in`, `nin`, `ne`.

## Mongoose

- It is ODM (object database mapper).
- The classes represents a collection.
- Mongoose provides methods for the model class object, once it is created.
- First create a schema, then define a model.

## Mongoose model operations

- InsertMany().then()
- find().then()
- findById().then()
- updateOne().then()
- updateMany()
- update() : If we want the updated document back, we should use the one starting with find
- findOneAndUpdate().then()
- findByIdAndUpdate().then()
- remove() : If we want the updated document back, we should use the one starting with find
- findOneAndDelete()
- findByIdAndDelete()

## Creating mongoose schema

- validators and options in schema.
- Validators don't run by default when updating, need to be enabled manually.

### Mongoose instance methods

- productSchema.methods.addCategory() = function (){}
- Used to add additional functionality to update a document in the collection.

### Mongoose static methods

- productSchema.statics.fireSale() = function (){}
- Used to update entire collection in one go

### Mongoose virtuals

- Gives ability to add properties to schema, they don't exist in db though.
- The properties are derived from the info in db.
- for eg. full name from first and last name.
- personSchema.irtual.('fullName').get(function (){}).
- Can also be used to set/update the db.

## Mongoose middleware

- Ability to run some code before or after a db operation.
- For eg if we remove a user, we also need to delete his posts.
- pre/post save/validate/remove/update etc.
- They are added to schema object.

## express middleware

- next vs send/render

## protecting a specific route

## Data validation library Joi.js

## mongodb relations

- one to few: embed actual data.
- one to many: keep reference n child in an array, then populate. use push to add to array in parent
- one to bazilions: keep reference in child, then populate. Assign to field in the child.
- When deleting an item in related collections we need to also delete the related items.

## ejs tool (ejs-mate)

## handling errors in express

- For synchronous route handlers just throw an error.
- This error will be caught by our custom error handler app.use(err, req, res, next).
- For Async route handlers put the error object in the next() call.
- This error will be caught by our custom error handler app.use(err, req, res, next).
- This is because if we pass anythin as argument to next(), then the error handler is trigerred.
- For handling mongoose errors, put them in try catch and put a next(err) in the catch block.

## Mongoose middleware

- These are functions we can run before or after an db operation.
- Qery vs document middlewarte: this refers to query or document.

## Express router

- Used to group/organize express app.
- Routes can be grouped by prefix.
- They can have their own middleware.

## HTTP/Web Cookies

- Enable HTTP request to have some state using client side data store.
- They can be used for session management, personalization, tracking.
- Sent by server to the browser/client, when they visit a webpage.
- The client then send these cookies in later interatcions on the website.
- Cookies are key value pair.
- Need to install Express module cookie-parser.
- res.cookie, req.cookies, req.signedCookies.
- Signing cookies: Used to prevent tampering the cookies at the client side.
- cookie size and number limited.

## HTTP sessions

- Attempt to make HTTP sateful by server side data store.
- It's not stored in db but something like Redis, a short term storage.
- Need to install expression-session package.
- This make available req.session.

## flash

- Need to install connect-flash package.
- Used when we want to flash something to user for one time.
- This is generally done when logging in, or when user does something.
- It depends upon express-session.
- req.flash(key:value/message)

# Security

## Authentication vs authoriation

- Authentication: Indentify. Finding out who the person is. They are who they say they are.
  Who is this person.
- Authorization: Verifying what a user has access to. Generally happens after authentication.
  What this person can and cannot do.

- Never store password in plaintext.
- Store hashed password only. Use a hashing function.
- Password salt: Salt is random value added to the password before we salt it.
  it helps ensure unique hashes and mitigate common attacks.

- bcrypt: hashing algo frequently used. based on blowfish.

### Hashing

- It maps the input data of arbitrary size to fixed size output values.
- We can never get the input data from the hash values(output of hash)
- Plaintext password entered by the user is compared with stored hash value.

## MVC pattern

- Model view controller.

## Submitting image file via form

- Use enc type `multi-part/form data` instead of `url-encoded` in the form attribute.
- Use `multer` package to send files in form.
- Use `multer-sorage-cloudinary` to store the files in the cloud.
- cloudinary: serice to store the files.
- files are stored in req.file(s) object and normal form fields in req.body object.

## mapbox

- Install @mapbox/mapbox-sdk.

## Security

- Mongo injection/ sql injection: Putting sql in the text input.
- `express-mongo-sanitize` package: remove dollar and period characters from user input.
- XSS cross site scripting: Inject client side script to someone's web page.
- Install `helmet` package. It manipulates the response headers for security.

## Storing API keys and secret info in the app

- Use dotenv package.

## Deploying express app on Heroku

1. Heroku login.
2. Git status → git init.
3. Git add filename.
4. Git commit -m “commmit message”
5. Heroku login.
6. Heroku create.
7. Git remote -v.
8. git push heroku master.
9. Heroku logs (shows logs for app in current dir)
10. we can run any command (ls, npm etc) using.

```shell
$Heroku run bash-command
```

### mlabs

To connect using the mongo shell:

```shell
$ mongo ds135003.mlab.com:35003/yelpcampsp -u <dbuser> -p <dbpassword>
```

Heroku password : S**\*\***3!

### To connect using a driver via the standard MongoDB URI:

```js
//saurabh:Se*****3!@ds135003.mlab.com:35003/yelpcampsp
mongodb: app.listen(process.env.PORT, process.env.IP);
```

App deployed [here](https://immense-gorge-49961.herokuapp.com/)
