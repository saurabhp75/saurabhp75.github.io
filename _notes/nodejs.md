---
layout: single
title: "Nodejs"
excerpt: "Intro to Nodejs"
---

### Update nodejs using nvm (node version manager)
1. Install nvm. 
```shell
$ curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```
2. Activate env variables, you can also open new terminal. 
```shell
$ source ~/.bashrc
```
3. Find available node versions
```shell
$ nvm ls-remote
```
4. Install required node verison. You can install multiple node versions. 
```shell
$ nvm install v10.16.2
```
5. To set default node version.
```shell
$ nvm use v10.16.2
```
6. Run Applition with Specific Version
```shell
$ nvm run v10.16.2 app.js
```
7. Remove unused node version
```shell
$ nvm uninstall v10.16.2
```


