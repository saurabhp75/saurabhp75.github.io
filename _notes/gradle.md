---
layout: single
title: "Gradle Notes"
excerpt: "Intro to Gradle"

sidebar:
  - title: "Gradle personal notes"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---


Gradle

- gradle is open source build tool.
- Project and tasks in gradle.
- it uses groovy or kotlin DSL.
- gradle build contain one or more projects.
- project might represent a library, jar or,  web application.
- project might represent a distribution zip assembled from jars produced by other projects.
- project might be deploying your applications to staging or production environment.
- project contain one or more tasks. Task is atomic piece of work a build performs.

Gradle tasks
- task could be compiling some classes.
- creating a jar.
- generating javadoc.
- publishing some archives(jar) to repository.
- What is ". gradle" folder?
- it is local repo and contains jar files downloaded for the project.

list default tasks in gradle:
$ gradle tasks
Creating a custom task in gradle (using groovy):
in "build.gradle" file add following lines:
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
To run it from command line:
$ gradle myCustomTask -P doOperation

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
Task dependencies in gradle:
task doSomeOperation1 {
	group "MyCustomTasks"
	doLast{
	println "This is opeartion 1"
	}
}
task doSomeOperation2(dependsOn: 'doSomeOperation1') {
	group "MyCustomTasks"
	doLast{
	println "This is opeartion 2"
	}
}
How to create zip file using custom gradle task.