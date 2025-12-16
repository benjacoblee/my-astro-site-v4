---
title: All That Just To Display Workout Data
date: 2024-10-12
description: File uploads / downloads with Dufs and HTTP Shortcuts.
tags: [strong, automation, dufs, pocketbase, shortcuts]
draft: false
slug: all-that-just-to-display-workout-data
---

## Context

On my old site, I used to display data for my most recent workout. However, the process for that was actually somewhat tedious:

1. Log workout with Strong, which doesn't expose a public API
2. Export data (a CSV file) to phone
3. Go into Pocketbase collection that stores files, upload and replace the old file

I had to do this _after every workout_. Yeah, it wasn't ideal.

So, I started looking into it during my workout today (I got distracted). I think I've come up with a solution that's _slightly_ nicer.

## DUFS

From the [Dufs Github Page](https://github.com/sigoden/dufs):

> Dufs is a distinctive utility file server that supports static serving, uploading, searching, accessing control, webdav...

File serving and uploading - both of which we need.

First, I had to get my server running. Here's my minimal `docker-compose.yml`:

```yaml
services:
  dufs:
    image: sigoden/dufs
    ports:
      - 5000:5000
    volumes:
      - "./dufs-data:/data"
    command: /data -A -a admin:password@/:rw,/data -a @/
```

I think the only thing of note is the "command" config, which I only managed to figure out through reading the docs and playing with the commands a little bit. It's specific to my use case, but essentially:

- Allow "admin" to perform all operations to `/data`
- The comma separates the first rules from the second
- For everyone else, allow viewing and download

Leaving this here: _there cannot be spaces in-between the first and second rule_ (I struggled with this for awhile).

Next, we need to figure out upload. A nicer way, anyway.

## HTTP Shortcuts

I noticed that when selecting "Export data" from within the Strong app, there was an option that allowed me to select "Send to..." - which was an option that came from an app called [HTTP Shortcuts](https://github.com/Waboodoo/HTTP-Shortcuts). I already use HTTP Shortcuts with [Linkding](https://github.com/sissbruecker/linkding), which allows me to easily save a bookmark (I don't remember where I came across this - it must've been from the Linkding official repo, but [references to HTTP Shortcuts](https://github.com/sissbruecker/linkding/blob/master/docs/how-to.md#using-http-shortcuts-app-on-android)are now non-existent).

Anyway. HTTP Shortcuts lets us do some nifty stuff. In this case, we want to send a `PUT` request to our file server. Thankfully, we can import curl requests - so, after some tinkering, I came up with a curl request that worked:

```bash
curl --user admin:password -T ./hello.txt http://127.0.0.1:5000/hello.txt
```

However, when I tried to import this curl, HTTP Shortcuts started complaining: turns out, the app doesn't support the `-T` flag. _It does, however, support using a file picker_ - the file picker then sets the request body type to "File".

HTTP Shortcuts also recognized `--user admin:password` as Basic Authentication and set it automatically for us, which is great.

The last thing I did in HTTP Shortcuts was to add a new variable, so I could name my files (if needed):

- Added a variable of type "Text Input" called `file_name`
- Appended it to the URL: `http://localhost:5000/{{file_name}}`

Now, HTTP Shortcuts will always ask for a file name via a prompt before sending the request.

Finally, I created a DNS record in Cloudflare and a proxy host in nginx-proxy-manager.

And with that, we're done ✨

Now all that's left is to actually render the data on the frontend... which I'll do another day.

**Links**

- [Dufs - Noted.lol](https://noted.lol/dufs/) (example Docker config)
