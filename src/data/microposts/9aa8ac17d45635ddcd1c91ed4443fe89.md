---
title: funky ts with template literal types and satisfies
description: 
tags: [microposts]
modifiedDate: 2025-03-26T05:58:59+08:00
---

#microposts 

TIL you can do some funky stuff with `satisfies` and template literal types in TS.

```typescript
const startWithA = {
  1: "a",
  2: "ab",
  3: "abc",
} satisfies Record<number, `a${string}`>;

const names = ["bob", "john"] as const;
type Hello = "Hello";
type Name = (typeof names)[number];
type TL = `${Hello} ${Name}`;
const greetings = ["Hello john", "Hello bob", "Hello walter"] as const;

greetings.forEach((g) => {
  g satisfies TL;
});
```