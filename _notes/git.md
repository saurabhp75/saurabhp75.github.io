---
layout: single
title: "Git"
excerpt: "Intro to Plotly Dash"

sidebar:
  - title: "Git personal notes"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---

### To add a remote github to local repo
```shell
$ git remote add origin git@github.com:saurabhp75/ytechlabs.git
```

### To remove a specific file from staged area
```shell
$ git rm --cached <file_name>
```

### Type of diffs
- Git diff : working vs staging
- Git diff --cached/staged : staging vs last commit
- Git diff HEAD : working vs last commit

### Skipping the staging command (git add)
commits all tracked modified files.
```shell
$ Git commit -a -m "Commit message".
```

### fetch all data of all branches of remote which you don't have.
```shell
$ git fetch [remote-name]
``` 
**Note**: It’s important to note that the git fetch command only downloads 
the data to your local repository – it doesn’t automatically merge it with any of 
your work or modify what you’re currently working on. You have to merge it
manually into your work when you’re ready.

**git pull** fetches the data from remote branch and merge with local branch.

by default, the **git clone** command automatically sets up your local master branch to "track" the remote master branch (or whatever the default branch is called) on the server you cloned from.

### Pushing to Your Remotes
```shell
$ git push origin master
```

### Inspecting a Remote 
If you want to see more information about a particular remote, you can use:
```shell
$ git remote show [remote-name]
```

### Removing and Renaming Remotes
```shell
$ git remote rename oldname newname
```

If you want to remove a remote for some reason – you’ve moved the server or are no longer using a particular mirror, or perhaps a contributor isn’t contributing anymore – you can use:
```shell
$ git remote rm paul
```

### Tagging
Like most VCSs, Git has the ability to tag specific points in history as being important. Typically people use this functionality to mark release points (v1.0, and 
so on). In this section, you’ll learn how to list the available tags, how to create
new tags, and what the di€erent types of tags are.

### Listing Your Tags 
Listing the available tags in Git is straightforward.
```shell
$ git tag 
v0.1
v1.3
```
### search for tags with a particular pattern. eg
```shell
$ git tag -l "v1.8.5*" 
v1.8.5 
v1.8.5-rc0 
v1.8.5-rc1 
v1.8.5-rc2 
v1.8.5-rc3 
v1.8.5.1 
v1.8.5.2
v1.8.5.3
```


### Creating Tags 
Git uses two main types of tags: lightweight and annotated. 
A lightweight tag is very much like a branch that doesn’t change – it’s just a 
pointer to a specific commit.
Annotated tags, however, are stored as full objects in the Git database.

### Annotated Tags
$ git tag -a v1.4 -m "my version 1.4"

$ git show v1.4 
tag v1.4 
Tagger: Ben Straub <ben@straub.cc> 
Date: Sat May 3 20:19:12 2014 -0700 
my version 1.4 
commit ca82a6dff817ec66f4434200720269 
Author: Scott Chacon <schacon@gee-mail.com>
Date: Mon Mar 17 21:52:11 2008 -0700

### Lightweight Tags

$ git tag v1.4-lw

### Tagging Later
You can also tag commits a‚er you’ve moved past them.

$ git tag -a v1.2 9fceb02

### Sharing Tags 
By default, the git push command doesn’t transfer tags to remote servers. You will have to explicitly push tags to a shared server a‚er you have created them. This process is just like sharing remote branches – you can run git push 
origin [tagname]. 
$ git push origin v1.5
Counting objects: 14, done.


### To transfer all of your tags 
to the remote server that are not already there.
$ git push origin --tags

### Checking out Tags 
You can’t really check out a tag in Git, since they can’t be moved around. If you 
want to put a version of your repository in your working directory that looks 
like a specific tag, you can create a new branch at a specific tag with git
checkout -b [branchname] [tagname]:

$ git checkout -b version2 v2.0.0
Switched to a new branch 'version2'


## git workflow for remote repo


### clone the repo
git clone url

#### list all branches, local and remote
git branch -a

### create a new branch to add your changes/feature
git branch BranchName

### switch to the new branch
git checkout BranchName

### make the changes in file
#See the status before adding and committing
git status

### Add the modified files to staging area
git add -A

### Commit changes to the new branch
git commit -m "Commit message"

### optional, push the new branch to remote
git push -u origin BranchName

### switch branch to master
git checkout master

### pull all the changes to master from remote before merging your changes from your branch (BranchName)
git pull origin master

### merge your branch in local master
git merge BranchName

### push your changes to remote master
git push origin master

### optional, delete the newly created local branch
git branch -d BranchName

### optional, delete the pushed branch at remote
git push origin --delete BranchName

git remote -v (show remote repo branches/status)

git status (status of local repo)
git log (history of commits)
git diff (changes done on current branch)
git diff hash1 hash2 (to see changes between two commit points)
git reset #unstage the changes back to wd. opposite of git add

note : ".gitignore" file contain the list of files which are not monitored bt git 


## Fixing Common Mistakes and Undoing Bad Commits
## some commits change git history/log and some dont


### to undo changes done to a file
git checkout filename

### to change commit message of last commit 
#(this will change commit hash as message is used in hash calculation)
# the changed hash is not desirable if others also use our code 
# If we are thde only one who see commit history(before git push) then this makes for a cleaner log
git commit --amend -m "new message"

### to add a file to the previuos commit (this will also change commit hash)
git add filename
git commit --amend

### to move a commit from one branch to other, first cherrypick the commit then remove from original branch

git checkout newbranch #change branch
git cherry-pick commithash #copy commit
git checkout oldbranch
git reset --soft commithash #this will keep changes in staging area
git reset commithash #this will keep changes in working directory
git reset --hard commithash #this will reset changes to the tracked files and keep untracked files(files added after the reset position) as they were

git clean -df #clean untracked directories and files

git reflog #shows the logs in order they were referenced? the reset can be undone before garbage collection by git

# if we want to keep the hashes while undoing the changes, we use revert(add new commits which undo reviuos commits)
git revert hashname #reates a new commit to undo the change



### git stash indexes can bde used across branches

git stash save "message"
git stash list
git stash apply stashindex # bring changes to WD and do not remove from stash list
git stash pop #bring changes to WD andremoves from stash list
git stash drop stashindex
git stash drop clear #clear the stash stack


### git stash workflow
git stash save->git pop->git add->git commit


### git workflow for remote repo

#clone the repo
git clone url

#list all branches, local and remote
git branch -a

#create a new branch to add your changes/feature
git branch BranchName

#switch to the new branch
git checkout BranchName

#make the changes in file
#See the status before adding and committing
git status

#Add the modified files to staging area
git add -A

#Commit changes to the new branch
git commit -m "Commit message"

#optional, push the new branch to remote
git push -u origin BranchName

#switch branch to master
git checkout master

#pull all the changes to master from remote before merging your changes from your branch (BranchName)
git pull origin master

#merge your branch in local master
git merge BranchName

#push your changes to remote master
git push origin master

#optional, delete the newly created local branch
git branch -d BranchName

#optional, delete the pushed branch at remote
git push origin --delete BranchName

git remote -v (show remote repo branches/status)

git status (status of local repo)
git log (history of commits)
git diff (changes done on current branch)
git diff hash1 hash2 (to see changes between two commit points)
git reset #unstage the changes back to wd. opposite of git add

note : ".gitignore" file contain the list of files which are not monitored bt git 

#############################################################
##### Fixing Common Mistakes and Undoing Bad Commits ########
## some commits change git history/log and some dont ########
#############################################################

#to undo changes done to a file
git checkout filename

#to change commit message of last commit 
#(this will change commit hash as message is used in hash calculation)
# the changed hash is not desirable if others also use our code 
# If we are thde only one who see commit history(before git push) then this makes for a cleaner log
git commit --amend -m "new message"

#to add a file to the previuos commit (this will also change commit hash)
git add filename
git commit --amend

# to move a commit from one branch to other, first cherrypick the commit then remove from original branch

git checkout newbranch #change branch
git cherry-pick commithash #copy commit
git checkout oldbranch
git reset --soft commithash #this will keep changes in staging area
git reset commithash #this will keep changes in working directory
git reset --hard commithash #this will reset changes to the tracked files and keep untracked files(files added after the reset position) as they were

git clean -df #clean untracked directories and files

git reflog #shows the logs in order they were referenced? the reset can be undone before garbage collection by git

#if we want to keep the hashes while undoing the changes, we use revert(add new commits which undo reviuos commits)
git revert hashname #reates a new commit to undo the change


#########################################################
### git stash indexes can be used across branches #######
#########################################################

git stash save "message"
git stash list
git stash apply stashindex # bring changes to WD and do not remove from stash list
git stash pop #bring changes to WD andremoves from stash list
git stash drop stashindex
git stash drop clear #clear the stash stack


#############################
#### git stash workflow #####
#############################
git stash save->git pop->git add->git commit




#############################
#### git commands ###########
#############################
Git diff : working vs staging
Git diff --cached/staged : staging vs last commit
Git diff HEAD : working vs last commit

Skipping the staging command (git add) :
#commits all tracked modified files.
Git commit -a -m "Commit message".


$ git fetch [remote-name] # fetch all data of all branches of remote which you don't have.
#It’s important to note that the git fetch command only downloads 
the data to your local repository – it doesn’t automatically merge it with any of 
your work or modify what you’re currently working on. You have to merge it
manually into your work when you’re ready.

#git pull fetches the data from remote branch and merge with local branch.

#by default, the git clone command automatically sets up your local master 
branch to "track" the remote master branch (or whatever the default branch is
called) on the server you cloned from.

Pushing to Your Remotes
$ git push origin master
#git push origin master


#Inspecting a Remote 
#If you want to see more information about a particular remote, you can use:
git remote show [remote-name]

#Removing and Renaming Remotes

$ git remote rename oldname newname

#
If you want to remove a remote for some reason – you’ve moved the server
or are no longer using a particular mirror, or perhaps a contributor isn’t contributing anymore – you can use:

$ git remote rm paul

#Tagging #
Like most VCSs, Git has the ability to tag specific points in history as being important. Typically people use this functionality to mark release points (v1.0, and 
so on). In this section, you’ll learn how to list the available tags, how to create
new tags, and what the di€erent types of tags are.

#Listing Your Tags 
Listing the available tags in Git is straightforward.
$ git tag 
v0.1
v1.3

#search for tags with a particular pattern.eg

$ git tag -l "v1.8.5*" 
v1.8.5 
v1.8.5-rc0 
v1.8.5-rc1 
v1.8.5-rc2 
v1.8.5-rc3 
v1.8.5.1 
v1.8.5.2
v1.8.5.3


#Creating Tags 
Git uses two main types of tags: lightweight and annotated. 
A lightweight tag is very much like a branch that doesn’t change – it’s just a 
pointer to a specific commit.
Annotated tags, however, are stored as full objects in the Git database.

#Annotated Tags
$ git tag -a v1.4 -m "my version 1.4"

$ git show v1.4 
tag v1.4 
Tagger: Ben Straub <ben@straub.cc> 
Date: Sat May 3 20:19:12 2014 -0700 
my version 1.4 
commit ca82a6dff817ec66f44342007202690a93763949 
Author: Scott Chacon <schacon@gee-mail.com>
Date: Mon Mar 17 21:52:11 2008 -0700

#Lightweight Tags

$ git tag v1.4-lw

#Tagging Later
You can also tag commits a‚er you’ve moved past them.

$ git tag -a v1.2 9fceb02

#Sharing Tags 
By default, the git push command doesn’t transfer tags to remote servers. 
You will have to explicitly push tags to a shared server a‚er you have created 
them. This process is just like sharing remote branches – you can run git push 
origin [tagname]. 
$ git push origin v1.5
Counting objects: 14, done.


#To transfer all of your tags 
to the remote server that are not already there.
$ git push origin --tags

#Checking out Tags 
You can’t really check out a tag in Git, since they can’t be moved around. If you 
want to put a version of your repository in your working directory that looks 
like a specific tag, you can create a new branch at a specific tag with git
checkout -b [branchname] [tagname]:

$ git checkout -b version2 v2.0.0
Switched to a new branch 'version2'

Git diff : working vs staging
Git diff --cached/staged : staging vs last commit
Git diff HEAD : working vs last commit

Skipping the staging command (git add) :
#commits all tracked modified files.
Git commit -a -m "Commit message".













































