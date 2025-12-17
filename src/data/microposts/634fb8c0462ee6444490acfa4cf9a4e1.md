---
title: rewrite crystal
description: 
tags: [microposts]
modifiedDate: 2025-04-05T18:39:28+08:00
---

#microposts 

Everything on this site is static, but it pulls data from a a bunch of different sources:

- [/microposts](/microposts) => File server
- [/words](/words) => Pocketbase
- [/now](/now) => CSV file for workout data, Steam / Trakt / LastFM for other media

Well, I did a rewrite from scratch in Crystal. And it was a lotta fun.

I was using Go prior, but I really don't like that language. Crystal doesn't have the best tooling... or the fastest build times... but I'd rather put up with all that than have to write Golang code