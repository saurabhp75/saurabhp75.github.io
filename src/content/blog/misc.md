---
title: "Miscellaneous"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Misc"]
draft: false
description: "Miscellaneous Notes"
---

### To search recursively (including some filetypes)

```shell
$ grep -r --include "*.txt" texthere .
```

### To search recursively (excluding some filetypes)

```shell
$ grep -r --exclude "*.txt" texthere .
```

### To change only directory permissions recursively :

```shell
$ find . -type d -exec chmod 755 {} \;
```

### To change only file permissions recursively :

```shell
$ find . -type f -exec chmod 644 {} \;
```

### To search for a string recursively in directories :

```shell
$ grep -r "string" .
```

### To list only directories

```shell
$ ls -l | grep '^d'
```

### To selectivey download folder from github:

**url**: https://github.com/ParrotPrediction/docker-course-xgboost/tree/master/notebooks notebooks  
**command**: svn export https://github.com/ParrotPrediction/docker-course-xgboost/trunk/notebooks notebooks

**url**: https://github.com/CoreyMSchafer/code_snippets/tree/master/Python/Flask_Blog  
**command**: svn export https://github.com/CoreyMSchafer/code_snippets/trunk/Flask_Blog corey_flask

### pandas get_dummies :

pd.get_dummies(train, columns = ['Month', 'DayofMonth', 'DayOfWeek', 'UniqueCarrier'], drop_first = True)

### To see laptop information :

```shell
$ sudo dmidecode | grep -A 9 "System Information"
```

### To update conda

```shell
$ conda update conda
$ conda update anaconda
```

### To see all jupyterlab installed extensions

```shell
$ jupyter labextension list
```

### Jupyter rate limit

```shell
$ jupyter notebook --NotebookApp.iopub_data_rate_limit=10000000000
```

### To remove a certain file type/extension recursively in folders

```shell
$ find . -name "*.mp4" -type f -delete
```

### If you are using two different github accounts. Use seperate ssh keys.

- Create a new key for each github a/c using command below. This will create keys in "~/.ssh/id_rsa_ytechlabs"
  file.

```shell
$ ssh-keygen -t rsa -C "contact@ytechlabs.com"
```

- Add the keys in ssh using command below.

```shell
$ ssh-add ~/.ssh/id_rsa_ytechlabs
```

- Delete all cached keys before using command below.

```shell
$ ssh-add -D
```

- Check your saved keys using command below.

```shell
$ ssh-add -l
```

- Important: you need to add the generated ssh public key (.pub)to github account also.

- Add following lines in `~/.ssh/config`. This create ssh alias, which should be used when cloning a repo.
  Otherwise you have to change the [remote "origin"]/url field in `.git/config` the after cloning.

#personal account
Host github.com-saurabhp75 # ssh alias
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa
IdentitiesOnly yes

#org account
Host github.com-ytechlabs # ssh alias
HostName github.com
User git
IdentityFile ~/.ssh/id_ytech
IdentitiesOnly yes

- When cloning a repo don't use "a", use "b". Where "saurabhp75" is ssh alias.
  (a)

```shell
$ git clone git@github.com:saurabhp75/saurabhp75.github.io.git
```

(b)

```shell
$ git clone git@github.com-saurabhp75:saurabhp75/saurabhp75.github.io.git
```

https://www.codeacademy.com

https: Protocol
www: subdomain
academy: second level domain
com: top level domain
