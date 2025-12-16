---
title: Don't Do This (Cloudflare + B2 CDN)
date: 2024-10-03
description: A lesson in blindly following tutorials.
tags: [dev, webdev, cloudflare, backblaze, b2, cdn]
draft: false
slug: dont-do-this-cloudflare
---

Over the past few days, I've been allocating some time to set up this site (it's new). Part of this involved [configuring B2 to serve up assets, going through Cloudflare as a CDN](https://www.backblaze.com/blog/free-image-hosting-with-cloudflare-transform-rules-and-backblaze-b2/). TLDR:

- Site is hosted on Netlify
- Files are on B2
- B2 URLs are not nice
- Cloudflare for DNS, transform rules. Rewrite URL to be nicer, modify the headers so assets get cached, etc.

After setting all of this up, I was greeted with a strange message on Netlify when I tried to access the homepage - a 404 saying there's no "/file/<path-to-assets>" route. Weird. I thought it might be a broken import, so I looked through the codebase.

"No results found".

After some troubleshooting, I managed to figure out the problem. Turns out that this error was due to a rewrite rule in Cloudflare, where it was rewriting all requests, namely: `not starts_with(http.request.uri.path, "/file/<path-to-assets>")`. I changed it to rewrite only when requests were coming _from a specific subdomain_, and the site built properly again.
