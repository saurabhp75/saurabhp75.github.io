---
layout: single
title: "Android Floating windows"
excerpt: "Intro to freeform activities in Android"
---


### What is multi-window
- Introduced in Android 7, allows apps to share screen with other apps. 
- Allows more than one activity to be displayed on the device screen at one time.


### Three type of multi-window
- **Split window**: Provides a split screen environment where **two activities** appear either side by side or one above the other.
- **Freeform mode**:  Allows each activity to appear in a separate, resizable window and is **not limited to two activities** being displayed concurrently.
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













