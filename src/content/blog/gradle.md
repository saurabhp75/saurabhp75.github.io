---
title: "Intro to Gradle"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Gradle"]
draft: false
description: "Introduction to Gradle"
---

- Gradle is open source build tool and uses groovy or kotlin DSL.
- Project and tasks in gradle.
- Gradle build contain one or more projects.
- Project might represent a library, jar or, web application.
- Project might represent a distribution zip assembled from jars produced by other projects.
- Project might be deploying your applications to staging or production environment.
- Project contain one or more tasks. Task is atomic piece of work a build performs.

## Gradle tasks

- Task could be compiling some classes.
- Creating a jar.
- Generating javadoc.
- Publishing some archives(jar) to repository.
- What is ". gradle" folder?
- It is local repo and contains jar files downloaded for the project.

## list default tasks in gradle:

```shell
$ gradle tasks
```

## Creating a custom task in gradle (using groovy):

In `build.gradle` file add following lines:

```groovy
task myCustomTask {
	group "Custom"
	description "This is a custom task"
	doLast {
		println "Executing custom task"
  	}
}
conditional execution of tasks:
myCustomTask.onlyIf {
project.hasProperty('doOperation')

}
```

To run it from command line:

```shell
$ gradle myCustomTask -P doOperation
```

Project dependencies Vs external dependencies.
Eclipse plugin.  
Custom gradle task.  
Running custom tasks.  
gradle customTaskName.  
Copy tasks in gradle.

Types : copy, zip, javadoc etc.  
doFirst block  
doLast block  
How to skip tasks in gradle.

### Task dependencies in gradle:

```groovy
task doSomeOperation1 {
	group "MyCustomTasks"
	doLast{
	println "This is operation 1"
	}
}

task doSomeOperation2(dependsOn: 'doSomeOperation1') {
	group "MyCustomTasks"
	doLast{
	println "This is opeartion 2"
	}
}
```

How to create zip file using custom gradle task?
