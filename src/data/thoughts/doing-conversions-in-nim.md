---
title: doing conversions in nim
date: 2024-11-14
description: haha
tags: [nim, converter, conversions]
draft: false
modifiedDate: 2024-11-14
slug: conversions-in-nim
---

I know I've been posting a lot about Rust, but the difficulty took a steep turn when I got to macros. So - I'm taking a short break and brushing up on my Nim.

I stumbled upon "converters", which let you explicitly convert a type to another. Consider the code below:

```nim
converter intToStr(i: int): string =
  if i == 1:
    "true"
  else: "false"

func takesAString(s: string): string =
  if s == "true":
    "WOW AWESOME" 
  else: 
    "sucks"

assert(takesAString(1) == "WOW AWESOME")
assert(takesAString(2) == "sucks")
```

As far as I can tell: if you have a function that takes in a `U`, but you also have a converter for `T` to `U`, then the converter performs the conversion and the function will happily accept it.

I hope I won't have to tell you how weird this is.

I don't know why you would use this, and it makes for some really hard to understand code - _but I guess you could do it if you really wanted to_.
