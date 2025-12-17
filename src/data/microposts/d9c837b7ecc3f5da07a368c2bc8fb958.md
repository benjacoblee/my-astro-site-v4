---
title: Adb push
description: 
tags: [microposts]
modifiedDate: 2025-08-20T06:28:53+08:00
---

#microposts 

Yesterday, when trying to move a bunch of large files from Linux to Android, I kept running into "libmtp error". Turns out the cause was an unstable connection due to a faulty cable. That's not the point of this post. 

What I *really* want to talk about is adb push. If you have USB debugging turned on (I think it's a prerequisite) you can run `adb push myfile mylocation`. And you don't need to keep switching to MTP mode on Android. Pretty handy