---
title: js is dumb
description: 
tags: [microposts]
modifiedDate: 2025-04-24T17:41:56+08:00
---

#microposts 

TIL if you do this:

```js
const arrs = new Array(3).fill([]);
arrs[0].push("some val");
arrs[1]; // ["some val"]
```

They're all references to the same array... like, why would you ever want that? JS is dumb

So you have to do smth like this instead:

```js
new Array(3).fill(null).map(() => []);
// or this
Array.from({ length: 3 }, () => []);
```