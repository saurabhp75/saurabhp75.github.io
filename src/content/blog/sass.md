---
title: "Sass and Koala"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["SASS", "CSS"]
draft: false
description: "Introduction to Sass and Koala"
---

1. Copy ‘scss’ folder including files to your project.
2. By default koala output directory is ‘scss’ but we need to change it to our ‘css’ folder.
3. Uncheck ‘auto compile’ and ‘source map’ options from bootstrap-grid.scss and bootstrap-reboot.scss.
4. keep only ‘auto compile’ option on bootstrap.scss.
5. Right click on ‘ bootstrap.scss’ and ‘set ouput path’ to ‘bootstrap.css’ file in your ‘css’ folder.
6. Right click on ‘ style.scss’ and ‘set ouput path’ to ‘style.css’ file in your ‘css’ folder.
7. Uncheck ‘combined import’ option from ‘style.css’.
8. Select ‘ bootstrap.scss’ and click compile.
9. Select ‘ style.scss’ and click compile.
10. Delete ‘style.css’ and ‘bootstrap.css’ from ‘scss’ folder in the project.
11. ‘\_variables.scss’ has all the variables which we can play with and customize bootstrap as per our needs. When we change this file, ‘bootstrap’ file gets automatically compiled if koala is opened.
12. Change the CDN import of bootstrap css file to the newly compiled ‘bootstrap.css’ in ‘css’ project.
