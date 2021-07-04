---
layout: single
title: "Deploy Express app on Heroku"
excerpt: "Intro to Deployment of Express app on Heroku"
---

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
