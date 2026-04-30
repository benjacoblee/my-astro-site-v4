---
title: about netlify redirects
description: 
tags: [microposts]
modifiedDate: 2025-03-19T11:12:39+08:00
---

#microposts 

idk how come i never came across this before but apparently you need a `netlify.toml` file to specify redirects for SPAs (in my case, Tanstack Router):

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```