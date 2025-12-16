---
title: lent, move, sink
date: 2024-11-18
description: Idk why I'm learning about this
tags: [nim, lent, move, sink]
draft: false
slug: lent-move-sink-nim
---

After playing with Nim _a whole lot_ yesterday, I finally managed to piece together some of this stuff.

## `lent`

Essentially, we are telling the compiler: "Hey, this variable is supposed to be _borrowed_. Please make sure the references to it are valid". Which means that even if what we're referencing is mutable, we can't do things willy-nilly:

```nim
{.experimental: "views".} # this needs to be enabled

type Dog = object
  name: string

# doesn't work
proc doStuffWithName(d: var Dog) =
  let name: lent string = d.name
  d.name = "new name"
  echo name

# is fine
proc doStuffWithNameOk(d: var Dog) =
  let name: lent string = d.name
  echo name
  d.name = "new name"
```

From the docs regarding ["view types"](https://nim-lang.github.io/Nim/manual_experimental.html#view-types):

> A local variable of a view type _borrows_ from the locations and it is statically enforced that the view does not outlive the location it was borrowed from.

> For the duration of the borrow operation, no mutations to the borrowed locations may be performed except via the view that borrowed from the location. The borrowed location is said to be _sealed_ during the borrow.

We can't do stuff with `name` in the first example. We're trying to mutate the original reference while its being borrowed, which the compiler rejects as an invalid program.

Similarly, we borrow `name` in the second `proc` - however, the difference is, we're not doing anything with name after printing it: there are no more references to `name` within that scope, and the compiler seems to be able to tell, so it allows us to proceed with mutation.

## `sink`

From the docs on ["Sink parameters"](https://nim-lang.org/1.4.8/destructors.html#sink-parameters):

> If it cannot be proven to be the last usage of the location, a copy is done instead

```nim
proc main() =
  proc eat(a: var String, b: sink String) =
    a.val &= b.val
    b.val = ""

  var fat = String(val: "Fat")
  var thin = String(val: "Thin")
  fat.eat(thin)
  echo("Thin is now: ", thin)
  echo("Fat is now: ", fat)

main()
```

Prints this:

```bash
Thin is now: (val: "Thin")
Fat is now: (val: "FatThin")
```

Which makes sense? Since we're using `thin` afterwards at `echo("Thin is now: ", thin)`.

We can prove this:

```nim
type
  MyType = object
    data: int

proc `=copy`(dest: var MyType, src: MyType) =
  echo "COPIED"
  dest.data = src.data

proc `=destroy`(obj: var MyType) =
  echo "DESTROYING: " & $obj.data

proc own(obj: sink MyType) =
  echo "SINKING: " & $obj.data

var a = MyType(data: 42)
own(a)
echo a.data  # copy called

# COPIED
# SINKING: 42
# DESTROYING: 42
# 42
# DESTROYING: 42
```

I assume that "COPIED" gets printed first because the compiler moves some stuff around.

If we comment out `echo a.data`, this is what gets printed:

```bash
SINKING: 42
DESTROYING: 42
DESTROYING: 0
```

We see that "COPIED" is nowhere to be found. What I _don't get_ is why "DESTROYED" gets called twice. Oh well... That's a mystery for another day.

## `move`

If we want to ensure that a value gets consumed, we can do this:

```nim
foo.bar(move baz)
```

Then the proc takes ownership of the variable and the variable gets reset to its default value.

## Conclusion

All of this is still extremely confusing and I'll probably never use it, but I suppose its nice to know.
