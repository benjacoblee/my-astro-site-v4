---
title: nice feature of sets
description: 
tags: [microposts]
modifiedDate: 2025-05-02T17:13:33+08:00
---

#microposts 

TIL you can check if a _reference_ is the same with sets in JS

```ts
const a = {v: 2};
const b = {v: 2};
const s = new Set();
s.add(a);
s.has(a); // true
s.has(b); // false
```