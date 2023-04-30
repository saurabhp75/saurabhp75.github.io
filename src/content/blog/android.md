---
title: "Android development"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Android"]
draft: false
description: "Intro to Android development"
---

### adb over wifi

```shell
$adb -s devname tcpip 5555
$adb connect 100.71.253.137:5555

// This will give ip address of the device
$adb shell netcfg | grep 'wlan0'
```

### Android Studio keyboard shortcuts

- **Ctrl + Shift + n** : Search for a file.
- **Ctrl + Shift + p** : Find the type of a variable.
- **Shift + Shift** : Search everywhere.
- **Ctrl + Alt + backward/forward Arrow**: Navigate to previous/next cursor position.

### Package name in Android Studio

- Package name of an app in Android is the domain of the app and is unique for all the apps in playstore.

### Android project structure

![Android project structure](/static/images/android/project_structure.jpg)

- The `build` folder within the `app` folder contains the apk file.
- The `libs` folder under the `app` folder contains third party libs/jar files.
- `src` folder under the `app` folder conatins the tests and code for the project.
- `androidTest` folder under the `src` folder contains the Android specific tests for the project.
- `test` folder under the `src` folder contains the language specific test (Android independent) for the project.
- Under the `main` folder there is `java` folder `res` folder and `AndroidManifest.xml` file.
- The `java` folder contains the package folder(com.ytlabs.mytodoapp) with the name mentioned during project creation. This folder contains all the kotlin files under one or more packages.
- `res` folder under the `main` folder contains all the project resources.
- `res` folder contains `drawable`, `layout`, `mipmap` and `values` folder.
- `drawable` folder contains all the image files.
- `layout` folder contains xml files for the activities.
- `mipmap` folder contains the icons for the project.
- `values` folder contains three xml files, viz, `colors.xml`, `strings.xml`, `styles.xml`.
- `colors.xml` contains the hex code and name of the colors used in the project.
- `strings.xml` contains the strings used in the project.
- `styles.xml` contains the styles used in the project. Used for designing the theme of app or widget in the project.
- `build.gradle` file under `app` folder is responsible for converting all the code into an application. It also stores all the information required by the app. It contains information like `compileSdkVersion`, `applicationId`, `targetSdkVersion`, `versionName` and `buildTypes` etc. and `dependencies` which contains different libaries required by the android app.

### AndroidManifest.xml file

- It acts as a "register" for the android app and stores all the reference of the app.
- List of all the activities and other android components required in the app.
- Permisssions for the android app should be mentioned above the `Application` tag.

### What is an activity

- Activity is a "manager" which is essentially a Java/Kotlin class that manages interactions and the content visible on the screen.
- An application can have many activities like in the YouTube application.

### Which activity is the first activity to launch

- In `AndroidManifest.xml` the activity with intent having category `category android:name="android.intent.category.LAUNCHER"` will be the first to launch.

![Launcher activity](/static/images/android/launcher_activity.jpg)

### What is View and ViewGroup

- It is UI.
- `View` is the base class of all views. Others like `TextView`, `ButtonView` are derived from it.
- Views are described in an xml file. This xml file is parsed and a corresponding java class is created.
- ViewGroup is a conainer which contains multiple views for eg. `ConstraintLayout`.

### Naming convention for resource ids

- Use camel case with view type as prefix and view functionality as suffix, for eg. `buttonSubmit`, `editTextFullName` etc.

### Creating an activity in Android studio

- Right click on the package folder(com.ytlabs.mytodoapp) under `java` and click on new->activity.

### Definitions

- **Activity**: Activity has an associated layout file.
- **Layout**: Layout file is an XML file. Layout file contains the information about various elements and their positioning. These elements are called **views/widgets**.
- **Fragment**

## Layout inflation process

- Connects activity and its layout.
- Triggered when activity starts.
- During LI the "views" in the layout files are inflated to Kotlin view objects in memory.
- bundle object parameter in `onCreate`() method contain dynamic state information (typically relating to the state of the UI) from a prior invocation of the activity.
- **onCreate(savedInstanceState: Bundle?)** – The method that is called when the activity is first created
- **onRestart()** – Called when the activity is about to restart after having previously been stopped by the runtime system.
- **onStart()** – Always called immediately after the call to the onCreate() or onRestart() methods, this method indicates to the activity that it is about to become visible to the user. This call will be followed by a call to `onResume(`) if the activity moves to the top of the activity stack, or `onStop()` in the event that it is pushed down
  the stack by another activity.
- **onResume()** – Indicates that the activity is now at the top of the activity stack and is the activity with which
  the user is currently interacting.

### What is Context in Android

- It’s the context of the current state of the application(object).
- The activity object extends the Context object.
- There are different types of context in Android.
- Mainly two types of context, Application Context and Activity Context.

### Application Context

- It is an instance that is the singleton and can be accessed in activity via `getApplicationContext()`.
- This context is tied to the lifecycle of an application.
- The application context can be used where you need a context whose lifecycle is separate from the current context or when you are passing a context beyond the
  scope of activity.
- For eg. If you have to create a singleton object for your application and that object needs a context, always pass the application context.
- In case, when you have to initialize a library in an activity, always pass the application context, not the activity context.

### Activity context

- This context is available in an activity. This context is tied to the lifecycle of an activity.
- It should be used when you are passing the context in the scope of an activity or you need the context whose lifecycle is attached to the current context.
- For eg. if you have to create an object whose lifecycle is attached to an activity, you can use the activity context.

### Activity Lifecycle

- `onCreate()`: Called when activity is created.
- `onStart()`: Called when user sees the activity.
- `onResume()`: Called when user can interact with the screen.
- `onPause()`: Called when part of app is visible, but in background.
- `onStop()`: Called when app is not visible to user.
- `onDestroy()`: Called when activity is destroyed.
- `onRestart()`: Called when we navigate back to the activity.

![Activity Lifecycle](/static/images/android/activityLifecycle.jpg)

### getContext() in ContentProvider

- This context is the application context and can be used similar to the application
- Context. This can be accessed via the `getContext()` method.

### When to use which Context?

- In case of Singleton(lifecycle is attached to the application lifecycle) for eg Db instance, always use the Application Context.
- Whenever you are in Activity, for any UI operations like showing toast, dialogs, and etc, use the Activity Context.

### Annotations in Android/Java

- Annotations are metadata that gives information about other data(code).
- For eg. `@override` annotaion tells the IDE about the details of method being overriden. We can omit this annotation.
- Annotations are implemented using interfaces.

### Dependency Injection

- Dependencies are class instances(for eg. network service or db) required by a class to function.
- We never create Application, activity and service instance in an android app. They are provided to us by Android OS. We do not have access to their constructor. We cannot provide dependencies to them via constructor. So we have to think differently to tackle DI in an android app.
- We do however create fragments in an android app.
- Two types of DI, `constructor injection` and `field injection`.
- Field injection is used when we don't have access to constructor of a class.
- We can manually handle DI by creating a structure called `Dependency component`.

### Disadvantages of not using DI

- No Configurability, the configuartion is hard coded while creating the dependencies.
- Resource intensive, as the dependency has to be created every time. There is no reusability.
- Difficult to test. Mocking of dependencies is not possible. Which was difficult to configure.

### DI history

- In JavaBeans the DI was done using xml files to inject servlets.
- The google developed `Guice`. But it used `reflection`. Reflection is an API which is used to examine or modify the behavior of methods, classes, interfaces at runtime.
- In Guice stack trace was difficult to read because of many subclass created.
- Also since everything was done at runtime, we can only verify DI by running the app.
- `Square` came up with `Dagger1` to remove the runtime DI. It uses reflection only for instance creation, for everything else it used annotation processing, which is a build time process.
- `Google` cam up with `Dagger2` and moved everything to build time using annotation processing. Which creates all the classes at build time.

### Inversion of control

- The class need not create its dependency, but it will be provided via constructor.
- Bottoms up instead of top down.

### Dagger architecture

- Dagger has three components, `module`, `component` and `Any class` which needs dependency.
- Module(`@Module`/`@Provides`) is dependency provider/creator. It has method to provide the instance/dependency.
- Component(`@Component`) is dependency manager. It helps in communicating between the `module` and `dependency consumer`.
- Any class(`@Inject`) is dependency consumer.

### Recycler View

- Dynamic view, view group.
- Makes use of Adapter class for `items` in the recycler view.
- Adapter needs list of data, from which it takes data and populates the recycler view.
- Adapter is a link between recyclerView and the list data.
- `onCreateViewHolder()`: This method returns a view/layout for an item.
- `onBindViewHolder`: This method sets the data and event listeners for an item in recycler view.
- `getItemCount()`: Gives the size of the list/data, ie. number of items.

### Android application and process

- An application is run in it's own Linux/Android process.
- When the application is stopped, the process is killed.
- Activity does not map to process.
- On clicking the app icon, the class extended from `Application` class, present in manifest file is run as a process.
- Then it runs the launcher activity.
- The lifetime of the application class is same as that of the process.
- The variables/properties declared in application class will remain for entire lifecycle of the application.
- The application class is a singleton.
- Database variable can be created in application class as it is requirted for entire life of the application.

### Theading

- When an Android application starts, the `main` thread is created.
- It is also called `UI` thread.
- The heavy work (netwrok I/O, db operations) is not done in main thread, they are done in other thread.
- This makes the application response fast.
- `Room` db uses threading internally.

### AppCompatActivity

- It is a subclass of android which provides access to modern android features while providing compatibility with older versions of android.

The namespace for the **Android Jetpack** libraries is **androidx**. Android Jetpack is a collection of libraries, developed by Google, that offers backward-compatible classes and helpful functions for supporting older versions of Android. Jetpack replaces and expands on the set of libraries formerly known as the **Android Support Library**. Classes imported from the androidx package refer to the Jetpack libraries. Dependencies to Jetpack in your `build.gradle` file also start with androidx.

Android apps **entry point** is not a main funtion but a **main activity** as mentioned in **manifest file**.

Android uses info in manifest file to launch an app.

- You need to override the **onCreate()** method of **AppCompatActivity** class to launch the app.
- **setContentView()** method, where you provide the activity associated with the app and inflate it and draw to screen.

### Constraint layout

- Allows you to create large, complex layouts with flat view hierarchies (no nested view groups). In a constraint layout, you position a view by defining at least one horizontal and one vertical constraint.

- **View Groups**: Holds multiple view (buttons, text etc). For eg. LinearLayout.

Parent of the main activity is **root view**, which is the **entire screen**.

Strings in your app should be located in **resources folder**.

**findViewById()** : Find the view(element) by id you assigned.  
You should minimize the use of findViewById() as it is an **expensive operation**.

- **"lateinit" keyword**: Tells Kotlin compiler that the variable will be initialized before it is accessed. It is a common pattern in android to initialize non null variables.

- **"tools" namespace**: It is used when you want to define dummy content when you are previewing the app in the preview pane. Attribute using the tools namespace are removed when you compile the app.

- **Module**: A folder with source files and resources for a discrete piece of functionality in your app.

By default there is one **module(App)** in your Android project. In large project there are many modules with their own gradle files.

- **compileSdkVersion**: Version against which the app is compiled.
- **minSdkVersion**: Minimum suported version.
- **targetSdkVersion**: Version on which build is tested to run.

Generally `compileSdkVersion` and `targetSdkVersion` are kept to the most recent version of Android.

**applicationId** is the unique identifier which is used by both google play and Android to identify your app. Two apps on same device cannot have identical application id. Also there cannot be duplicate app id on playstore. **App id matches the package of your app**.

Resources are drawn using vector files for android apk21 and above, for 20 and below the png file generated by SDK is used.

After making any changes in the gradle file, you should click "sync now" to propogate the changes to the whole project.

**app namespace** is used for attributes that come from your custom code/libraries.

All the visual elements that make up a screen are **views**, and they are all children of **View class**.

All views have width height and background and they all can be made interactive. eg. **TextView, ImageView, EditText, CheckBoxes, Sliders, Menus, ColorPickers, Button** etc.

Every view has a location expressed as pair of left and top coordinates, and dimension expressed as width and height all units are in dp.

- **dp (Density independent pixel)**: Use it for margin, padding and border. It is fixed size for all screen densities
- **sp (Scale independent pixel)**: Use it for font-size. Depends on font size and screen pixel density.

Views are organized into view groups. Having a deep view heirarchy slows down the app. Constrainedlayout is used to build app with small number of views with complex layout to **avoid deep view heirarchy**.

**ScrollView** can contain only one view as a child, it could be either a groupview(eg LinearView) or an individual view , for eg. TextView.

**Data binding**: Optimize the access to views by creating a class at compile time from layout and accessing its properties/methods. You need to wrap the root class (view group) in layout tag.

### Binding dataclass to view

- TBD

### Introduction to navigation

- A destination is any place inside the app to which a user can navigate.
- A navigation graph for an app consists of a set of destinations within the app.
- Navigation graphs allow you to visually define and customize how users navigate among destinations in your app.
- A navigation host fragment acts as a host for the fragments in a navigation graph. The navigation host fragment is usually named NavHostFragment.

### Activity states

- `non existent` when user presses `back` key.
- `Stopped` when activity goes to background, either using home button or going to other activity using the `overview screen`.
- An activity is destroyes and recreated during config changes.

### What is Configuration change

- Any change to system setting like font, language etc.
- Rotation of device, window resizing and night mode changes etc.

### What is ViewModel

- ViewModel is part of the `androidx.lifecycle package`, which contains lifecycle-related APIs including lifecycle-aware components.
- Google created the `androidx.lifecycle` package and its contents to make dealing with the activity lifecycle a little less painful.
- `LiveData`, is another lifecycle-aware component.
- ViewModel’s lifecycle more closely mirrors the user’s expectations: It survives configuration changes and is destroyed only when its associated activity is finished.

### Implementing ViewModel

- Add following to you app gradle file.
- `implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'`

### ViewModel Class

- The onCleared() function in ViewModel class is called just before a ViewModel is destroyed.
- `onCleared()` is a useful place to perform any cleanup, such as un-observing a data source.

### How to access ViewModwel instance

- Associate a ViewModel instance with an activity’s lifecycle, using code below.
- viewModelInstance = ViewModelProvider(this).get(MyViewModel::class.java)
- `ViewModelProvider(this)` creates and returns a ViewModelProvider associated with the activity.
- The ViewModel is then said to be scoped to that activity’s lifecycle.
- The ViewModelProvider acts like a registry of ViewModels.
- When the activity queries for a QuizViewModel for the first time, ViewModelProvider creates and returns a new QuizViewModel instance.
- When the activity queries for the QuizViewModel after a configuration change, the instance that was first created is returned.
- When the activity is finished (such as when the user presses the Back button), the ViewModel-Activity pair is removed from memory.
- The relationship between MainActivity and QuizViewModel is unidirectional.
- The activity references the ViewModel, but the ViewModel does not access the activity.
- Your ViewModel should never hold a reference to an activity or a view, otherwise you will introduce a memory leak.
- When OS kills the activity(process), ViewModel is lso wiped, for this situation, use saved instance state.

### Memory leaks

- A memory leak occurs when one object holds a strong reference to another object that should be destroyed.
- Holding the strong reference prevents the garbage collector from clearing the object from memory.
- Memory leaks due to a configuration change are common bugs.

### What is `isFinishing` property of an activity

- Tells us if the user has finished the activity or not.
- If isFinishing is true, the activity is being destroyed because the user finished the activity (such as by pressing the Back button or by clearing the app’s card from the overview screen).
- If isFinishing is false, the activity is being destroyed by the system because of a configuration change.

### Activity/process killed by Android

- When an activity is in stopped state(not visible), it may be killed by OS to reclaim memory.
- stopped activities are marked as killable.
- An activity in paused state is not likely to be killed by OS.
- When an activity is killed by OS viewModel is also wiped from memory, no lifecycle callbacks are invoked.

### On Saved Instance State

- To save UI state data and use it to reconstruct the activity when it is killed by OS, Activity.onSaveInstanceState(Bundle) is overidden.
- onSaveInstanceState(Bundle) is called when an activity that is not `finished` moves to the `stopped` state.
- Important : onSaveInstanceState(Bundle) will not be called when user kills activity as it is 'finished'.
- For eg. when the user presses the Home button and then launches a different app.
- If your app process is killed by OS, then you can rest assured that Activity.onSaveInstanceState(Bundle) was already called.
- The default implementation of onSaveInstanceState(Bundle) directs all of the activity’s views to save their state as data in the Bundle object.
- The bundle object for eg. may also contain additional information added by the framework, such as the contents of an EditText or other basic UI widget state.
- When onSaveInstanceState(Bundle) is called, the data is saved to the Bundle object. That Bundle object is then stuffed into your activity’s `activity record` by the OS.
- `Activity record` gets wiped when the activity finishes. At that point, your activity record is discarded. Activity records are also discarded on reboot.
- Note that your activity can pass into the stashed state without onDestroy() being called.
- Typically, you override `onSaveInstanceState(Bundle)` to stash small, transient-state data that belongs to the current activity in your Bundle.
- You should override `onStop()` to save any permanent data, such as things the user is editing, because your activity may be killed at any time after this function returns.

### ViewModel vs Saved Instance State (Important)

- Saved instance state protects from both configuration changes and process death.
- Since saved instance state is serialized to disk, you should avoid stashing any large or complex objects.
- Use saved instance state to store the minimal amount of information necessary to re-create the UI state (for example, the current question index).
- Use ViewModel to cache the rich set of data needed to populate the UI in memory across configuration changes for quick and easy access.

### Debugging

- When you encounter runtime exceptions, remember to look for the last exception in Logcat and the first line in its stack trace that refers to code that you have written.
- That is where the problem occurred, and it is the best place to start looking for answers.
- `stack trace logging ` : To find out where the function is invoked from, add below line and see the stack trace.
- Log.d(TAG, "Updating question text", Exception())
- `Using breakpoints`.
- `Profiling` : View->Tool windows-> profiler.
- `Layout inspector`: tools->layout inspector.

### Creating a new activity

- Creating an activity typically involves touching at least three files: the Kotlin class file, an XML layout file, and the application manifest.
- Use Android Studio’s New Activity wizard.

### Starting an activity

- Use startActivity(Intent), this call is sent to the ActivityManager in the OS.
- The ActivityManager creates the Activity instance and calls its onCreate(Bundle?) function.
- Intents are multipurpose communication tools, Intent class provides different constructors depending on what you are using the intent to do.
- `Intent(packageContext: Context, class: Class<?>)`
- The Class argument specifies the activity class that the ActivityManager should start.
- The Context argument tells the ActivityManager which application package the activity class can be found in.

### What is an intent

- An Intent is a messaging object we can use to request an action(for eg. open ProfileActivity) from another app component (Activity).
- Intent can also pass data from one activity to another activity.
- So, it can perform an action and pass data.

```kotlin
// Creating an intent
val intent = Intent(currentActivity, activityToOpen)
startActivity(intent)
```

### Passing data using intent

- Intents can be used to pass data between activities.
- Data is sent using key- value pairs using `putExtra()` method.

```kotlin
// Send intent with data from source activity
val intent = Intent(this, VideoPlayerActivity::class.java)
// VIDEO_ID is the key to identify as we can
// send many key values inside it.
intent.putExtra("VIDEO_ID", videoId)
startActivity(intent)

// Receive data and intent at receiving activity
// -1 is the default, when no data is passed with
// "VIDEO_ID" key
val videoId = intent.getIntExtra("VIDEO_ID", -1)
```

### Explicit vs Implicit Intents

- Use explicit intents to start activities within your application.
- Use implicit intents to start activities outside your application.
- Implicit intent specifies the `action` to be performed and appropriate application is invoked implicitly. We can also pass `category` and `data`.
- Explicit intent explicitly specifies the activity to be started.
- Intents can be used to start an activity, a service and passs a broadcast.
- Start an activity: `startActivity()`.
- Start a service: `startServcie()`.
- Pass a broadcast: `sendBroadcast()`.

### Intent filters

- Declared in manifest file.
- Defines two things, `action` and `category`.
- Specifies what type of an intent an activity can receive.
- Action: It is name of action.
- Category: Type of intent collections.
- Data: Path or some other data to pass.

### WorkManager

- Used to perform a periodic task in the background thread.
- It works even if the application is closed.

### Work Manager use cases

- Backup chats like whatsapp.
- Update news in a news app.
- Upload images to server(dropbox) from the app.
- Deleted completed tasks in todo app.

### contraint layout

- Use of match parent not recommended in constraint layout.
- 0dp in width and height means match constraint.
- Chains: spread/spread inside/packed.
- Weighted chain.

### virtual helper objects

- guideline, barrier, group

### Use of notification channels

- Introduced in Android Oreo, to group/categorize the notifications.
- For eg. "user notification" or "chat notification".
- You can disable the notifications for individual channels/category.

# Freeform windows in Android

### What is multi-window

- Introduced in Android 7, allows apps to share screen with other apps.
- Allows more than one activity to be displayed on the device screen at one time.

### Three type of multi-window

- **Split window**: Provides a split screen environment where **two activities** appear either side by side or one above the other.
- **Freeform mode**: Allows each activity to appear in a separate, resizable window and is **not limited to two activities** being displayed concurrently.
- **Picture-in-picture**: Allows video playback to continue in a smaller window whilethe user performs other tasks.

### Freeform application support on Android 10

- Part of Multi-window support primarily aimed at foldable devices.
- Tested on Emulator (Pixel 2 API 29).
- From Android 10 onwards no need for adb hack, just enable from develeoper options.

### Enabling and using Freeform Support in Android 10

- Enable "Force activities to be resizable" and "Enable freeform windows" in Developer options and reboot the Emulator.
- Goto Overview screen by pressing overview button, when performing a long press on the app icon as shown in fig.

### Steps

- Create Pixel 2, API 29 from AVD.
- Build and run the app on emulator.

### Developing Freeform Android app

- Enable multi-window support in the app using `android:resizeableActivity="true"`.
- This can be done ast app level or activity level.
- This needs to be done for both split screen or freeform support.

### Specifying freeform activity attributes

- The initial height, width and position of an activity when launched in freeform mode may be specified using the following attributes.
- android:defaultWidth – Specifies the default width of the activity while in freeform mode.
- android:defaultHeight – Specifies the default height of the activity while in freeform mode.
- android:gravity – Specifies the initial position of the activity (start, end, left, right, top etc.).
- android:minimalHeight – Specifies the minimum height to which the activity may be reduced while in splitscreen or freeform mode.
- android:minimalWidth - Specifies the minimum width to which the activity may be reduced while in splitscreen or freeform mode.
- For eg.

```xml
<activity android:name=".MainActivity ">
 <layout android:defaultHeight="350dp"
 android:defaultWidth="450dp"
 android:gravity="start|end"
 android:minimalHeight="400dp"
 android:minimalWidth="290dp" />
</activity>
```

### Detecting Multi-Window Mode in an Activity

```kotlin
if (this.isInMultiWindowMode()) {
 // Activity is running in Multi-Window mode
} else {
 // Activity is not in Multi-Window mode
}
```

### Receiving Multi-Window Notifications

```kotlin
override fun onMultiWindowModeChanged(isInMultiWindowMode: Boolean,
 newConfig: Configuration?) {
 super.onMultiWindowModeChanged(isInMultiWindowMode, newConfig)

 if (isInMultiWindowMode) {
 // Activity has entered multi-window mode
 } else {
 // Activity has exited multi-window mode
 }
}
```

### Identifying topmost resumed activity in Multi-window mode

- As multiple activities can be in resumed state, code below identifies topmost resumed activity.

```kotlin
override fun onTopResumedActivityChanged(isTopResumedActivity: Boolean) {
 super.onTopResumedActivityChanged(isTopResumedActivity)
 if (isTopResumedActivity) {
 // Activity is now topmost resumed activity
 } else {
 // Activity is no longer topmost resumed activity
 }
}
```

### Launching and configuring Size and Position of an activity in Multi-window/Freeform mode

```kotlin
val i = Intent(this, SecondActivity::class.java)
i.addFlags(Intent.FLAG_ACTIVITY_LAUNCH_ADJACENT or
Intent.FLAG_ACTIVITY_MULTIPLE_TASK or
Intent.FLAG_ACTIVITY_NEW_TASK)
val rect = Rect(0, 0, 100, 100)
val options = ActivityOptions.makeBasic()
val bounds = options.setLaunchBounds(rect)
startActivity(i, bounds.toBundle())
```
