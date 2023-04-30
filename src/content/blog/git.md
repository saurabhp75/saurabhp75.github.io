---
title: "Intro to Git"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Git"]
draft: false
description: "Introduction to Git"
---

### To revert uncommitted changes including files and folders

```shell
# Revert changes to modified files.
$ git reset --hard

# Remove all untracked files and directories.
# '-f' is force, '-d' is remove directories.
$ git clean -fd
```

### Initial repo configuration

```shell
# To list all config variables
$ git config -l

$ git config user.name "saurabhp75"
$ git config user.email "saurabhp75@gmail.com"
$ git remote add origin git@github.com-saurabhp75:saurabhp75/repo-name.git
$ git push -u origin master
```

### To add a remote github to local repo

```shell
$ git remote add origin git@github.com-saurabhp75:saurabhp75/repo-name.git
```

### To remove a specific file from staged area

```shell
$ git rm --cached <file_name>

$ git reset filename # alternate command

$ git reset HEAD # to remove all files from index
```

### Type of diffs

- `git diff` : working vs staging
- `git diff --cached/staged` : staging vs last commit
- `git diff HEAD` : working vs last commit

### Skipping the staging command (git add)

commits all tracked modified files.

```shell
$ git commit -a -m "Commit message".
```

### Fetch all data of all branches of remote which you don't have.

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

### Search for tags with a particular pattern. eg

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

```shell
$ git tag -a v1.4 -m "my version 1.4"

$ git show v1.4 
tag v1.4 
Tagger: Ben Straub <ben@straub.cc> 
Date: Sat May 3 20:19:12 2014 -0700 
my version 1.4 
commit ca82a6dff817ec66f4434200720269 
Author: Scott Chacon <schacon@gee-mail.com>
Date: Mon Mar 17 21:52:11 2008 -0700
```

### Lightweight Tags

```shell
$ git tag v1.4-lw
```

### Tagging Later

You can also tag commits a‚er you’ve moved past them.

```shell
$ git tag -a v1.2 9fceb02
```

### Sharing Tags 

By default, the git push command doesn’t transfer tags to remote servers. You will have to explicitly push tags to a shared server a‚er you have created them. This process is just like sharing remote branches – you can run git push 
origin [tagname].

```shell
$ git push origin v1.5
Counting objects: 14, done.
```

### To transfer all of your tags 

to the remote server that are not already there.

```shell
$ git push origin --tags
```

### Checking out Tags 

You can’t really check out a tag in Git, since they can’t be moved around. If you 
want to put a version of your repository in your working directory that looks 
like a specific tag, you can create a new branch at a specific tag with

```shell
$ git checkout -b [branchname] [tagname]:

$ git checkout -b version2 v2.0.0
Switched to a new branch 'version2'
```

## git workflow for remote repo

### Clone the repo

```shell
$ git clone url
```

### List all branches, local and remote

```shell
$ git branch -a
```

### Create a new branch to add your changes/feature

```shell
$ git branch BranchName
```

### Switch to the new branch

```shell
$ git checkout BranchName
```

### Make the changes in file

Note: See the status before adding and committing

```shell
$ git status
```

### Add the modified files to staging area

```shell
$ git add -A
```

### Commit changes to the new branch

```shell
$ git commit -m "Commit message"
```

### Push the new branch to remote(optional)

```shell
$ git push -u origin BranchName
```

### Switch branch to master

```shell
$ git checkout master
```

### Pull all the changes to master from remote before merging your changes from your branch (BranchName)

```shell
$ git pull origin master
```

### Merge your branch in local master

```shell
$ git merge BranchName
```

### Push your changes to remote master

```shell
$ git push origin master
```

### Delete the newly created local branch(optional)

```shell
$ git branch -d BranchName
```

### Delete the pushed branch at remote(optional)

```shell
$ git push origin --delete BranchName

$ git remote -v (show remote repo branches/status)

$ git status (status of local repo)
$ git log (history of commits)
$ git diff (changes done on current branch)
$ git diff hash1 hash2 (to see changes between two commit points)
$ git reset #unstage the changes back to wd. opposite of git add
```

**Note** : `.gitignore` file contain the list of files which are not monitored by git

## Fixing Common Mistakes and Undoing Bad Commits

**Note**: some commits change git history/log and some don't.

### To undo changes done to a file

```shell
$ git checkout filename
```

### To revert changes made to your working copy

```shell
$ git checkout .
```

### To revert changes made to the index (i.e., that you have added)

```shell
$ git reset
```

### To revert a change that you have committed

```shell
$ git revert <commit 1> <commit 2>
```

### To remove untracked files (e.g., new files, generated files):

```shell
$ git clean -f
```

### To remove untracked directories (e.g., new or automatically generated directories):

```shell
$ git clean -fd
```

### To change commit message of last commit

- This will change commit hash as message is used in hash calculation.
- The changed hash is not desirable if others also use our code.
- If we are the only one who see commit history(before git push) then this makes for a cleaner log.

```shell
$ git commit --amend -m "new message"
```

### To add a file to the previous commit(this will also change commit hash)

```shell
$ git add filename
$ git commit --amend
```

### To move a commit from one branch to other, first cherrypick the commit then remove from original branch

```shell
$ git checkout newbranch #change branch
$ git cherry-pick commithash #copy commit
$ git checkout oldbranch
$ git reset --soft commithash #this will keep changes in staging area
$ git reset commithash #this will keep changes in working directory
$ git reset --hard commithash #this will reset changes to the tracked files and keep untracked files(files added after the reset position) as they were

$ git clean -df #clean untracked directories and files

$ git reflog #shows the logs in order they were referenced? the reset can be undone before garbage collection by git
```

### If we want to keep the hashes while undoing the changes, we use revert(add new commits which undo previuos commits)

```shell
$ git revert hashname #reates a new commit to undo the change
```

### git stash indexes can be used across branches

```shell
$ git stash save "message"
$ git stash list
$ git stash apply stashindex # bring changes to WD and do not remove from stash list
$ git stash pop #bring changes to WD andremoves from stash list
$ git stash drop stashindex
$ git stash drop clear #clear the stash stack
```

### git stash workflow

```shell
$ git stash save->git pop->git add->git commit
```
