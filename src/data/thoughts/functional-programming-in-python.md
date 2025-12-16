---
title: functional programming in python
date: 2025-01-22
description: With a dialect named "Coconut"
tags: [python, fp, functions, functional, programming, coconut]
draft: false
slug: fp-in-python
---

My experience with functional programming has been rocky, to say the least.

I mean, it's a hard thing. I'm not the most math-inclined person, so my eyes start to glaze over when I see things like "abstract algebra", "category theory", "functors" and what-have-you. Still, I did commit myself to some of it, for a season. I tried `rescript`, then `purescript`, and none of it was really "clicking" - and everyone says "just learn `haskell` bruh" - so I put myself through the painful process of reading HPFFP (some have likened it to self-flagellation - I tend to agree). I got halfway through, read about monad transformers somewhere, and decided the juice just wasn't worth the squeeze.

I _feel_ like you have to get yourself to a certain headspace to do functional programming. Some of it just sounds like copium, man:

- "In Haskell, every function has to return something - so we return a `unit`, problem solved."
- "Functional programming is pure! As long as you take in a world, and return a new world!"

To be clear, I think functional programming _can_ be useful. I just find _pure_ FP terribly impractical and unproductive. "Functional-lite", I can get behind.

/rant

Anyway, today I came across a dialect of Python called `coconut` and played with it a little. I _know_ you're not supposed to do things like this in Python (I know the creator is anti-FP - or at least anti-TIMTOWTDI), but here's some code:

````python
"""
  files end in .coco
  you can run a .coco file with `coconut -r main.coco`
"""

print("hi from coco")

l = x -> x + 1 # concise lambdas

def first([]): return [] # pattern matching
def first([head] + tl):
  """
    Usually we'd write something like:
    ```
    hd, *_ = list
    ```
    But I don't know if that's allowed in Coconut. I couldn't get it to compile :|
  """
  return head

exclaim = map$((x) => x + "!", ?) # fat arrows, partial application

# pipelines

["We have fat arrow"] |> exclaim |> list |> first |> print # "We have fat arrow!"

# more partials

def greet(greeting, person):
  return f"{greeting}, {person}"

greet_bob_with = greet$(?, "bob")
greet_bob_with("hi") |> print # "hi, bob"
greet_bob_with("YO") |> print # "YO, bob"

def url_builder(base, endpoint):
  return f"{base}/{endpoint}"

build_example = url_builder$("www.todos.com", ?)
todos = build_example("api/todos") |> print # prints what you'd expect
projects = build_example("api/projects") |> print

"""Reduction? Operators?"""

\sum = reduce$(+) # need this because it shadows python's built-in sum
range(1, 6) |> \sum |> print
mult = reduce$(*)
range(1, 6) |> mult |> print

# lazy lists

xs = (| f(a), f(b), f(c) |)
a = 1
b = 300
c = 25
# f = (x) => str(x)
f = str # pt-free
xs |> print # reiterable(<itertools._tee object at 0x782e2347fe00>)
xs |> list |> "".join |> print # force evaluation => 130025
````

So, yeah. Just wanted to share. It's quite fun, actually.
