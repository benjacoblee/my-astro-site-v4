---
title: weird mantic bug
date: 2025-01-16
description: "kauditd_printk_skb: 140 callback suppressed"
tags:
  - ubuntu
  - linux
draft: false
slug: weird-mantic-bug
---

Recently installed Mantic on my MacOS and was greeted with this message after I did a "hard" shutdown:

`kauditd_printk_skb_140_callback_suppressed`

Couldn't even get to the login screen.

Luckily, someone on Reddit (as usual) had a fix.

<blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="292"><a href="https://www.reddit.com/r/Ubuntu/comments/1c769sx/comment/l71xyff/">Comment</a><br> by<a href="https://www.reddit.com/user/Nervous-Highway-755/">u/Nervous-Highway-755</a> from discussion<a href="https://www.reddit.com/r/Ubuntu/comments/1c769sx/kauditd_printk_skb_140_callback_suppressed/"></a><br> in<a href="https://www.reddit.com/r/Ubuntu/">Ubuntu</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

To be more specific:

- ctrl-alt-F5
- Should be greeted with a prompt. Login with credentials
- Then, `sudo apt install...`

Posting it here in case it helps anyone.
