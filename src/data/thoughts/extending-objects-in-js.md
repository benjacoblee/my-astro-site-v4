---
title: extending objects in js
date: 2025-02-09
description: a medium dive
tags: [javascript, js, classes]
draft: false
slug: extending-objects-in-js
---

I'll be honest - I haven't had too much practice with "class-based" JS. I started learning Javascript, and React by extension, at a time when class components were on their way out. But! I've been doing a deep dive into Ruby, and classes are pervasive in Rubyland.

In Rubyland, (almost) everything's an object. Objects are great because they have methods, which are useful. And if an object doesn't have the functionality we want, we can add it easily:

```ruby
class Car
  def initialize(name)
   @name = name
  end
end

# reopen it somewhere else...
class Car
  def describe()
    puts "Car(name=#{@name})"
  end
end
```

This is called _monkeypatching_, and its a practice that's generally frowned upon. Wikipedia talks about some of [the pitfalls of monkeypatching](https://en.wikipedia.org/wiki/Monkey_patch#Pitfalls).

With that disclaimer out of the way - can we do something similar in Javascript? Well, yes, and its really easy too:

```javascript
String.prototype.isEven = function () {
  return this.length % 2 === 0;
};
"this".isEven();
```

But what if we don't want to monkeypatch a class? What options do we have in Javascript?

We can extend the original class:

```javascript
class MyArr extends Array {
  double() {
    return this.map((x) => x * 2);
  }
}

const myArr = new MyArr(1, 2, 3, 4);
myArr
  .double()
  .map((x) => x - 1)
  .filter((x) => x === 1)
  .double();
```

Calling `.map` and `.filter` still returns an instance of `MyArr`, so we can still call double at the end - it's all good.

Or, we can simply add a function as a property on the object:

```javascript
function Arr(...args) {
  let ret = Array.from(args);
  ret.each = {
    do(cb) {
      ret.forEach(cb);
    },
  };
  return ret;
}

let arr = Arr(1, 2, 3, 4, 5);
arr.each.do((x) => console.log(x));
console.log(arr);
arr = arr.map((x) => x + 3);
console.log(arr); // we lost `each` here
```

However, this won't really work for our purposes. Whenever we call a native array method, we lose our newly-defined method.

We can also use `Object.assign` - _but_, we run into the same issue:

```javascript
function AssignArr(...args) {
  const ret = Array.from(args);
  const meths = {
    has(thing) {
      return this.includes(thing);
    },
    each: {
      do(cb) {
        ret.forEach(cb);
      },
    },
  };
  return Object.assign(ret, meths);
}

let assignedArr = AssignArr(1, 2, 3);
console.log(assignedArr.has(2));
assignedArr = assignedArr.map((x) => x * 2);
assignedArr.has(2);
```

Same with `Object.create`:

```javascript
function createArr(...args) {
  return Object.create(Array.from(args), {
    getAtIdx: {
      value(idx) {
        return this[idx];
      },
    },
    has: {
      value(thing) {
        return this.includes(thing);
      },
    },
  });
}

let createdArr = createArr(1, 2, 3, 4, 5);
createdArr = createdArr.map((x) => x * 2);
console.log(createdArr.has(1)); // error here
```

Or, use a `Proxy`:

```javascript
class Handler {
  has(arg) {
    return this.includes(arg);
  }
}

const handler = new Handler();
const proxiedArr = new Proxy([], {
  get(target, property) {
    return target[property] || handler[property];
  },
});

proxiedArr.push(2);
proxiedArr.push(102);
console.log(proxiedArr.has(102));
const proxiedArr1 = proxiedArr.filter((x) => x === 102);
proxiedArr1.has(2); // proxiedArr1.has is not a function
```

It turns out, there aren't a lot of ways to do this.

Practically speaking:

- We probably don't want to mess with the prototype
- Extending the class is probably the only viable way if we want to preserve the methods we've defined

Some references:

- [JS Proxy — how to monkey patch without breaking libraries | by Flo Sloot | Medium](https://medium.com/@FloSloot/js-proxy-how-to-monkey-patch-without-breaking-libraries-3fb2b12434d3)
- [javascript - Create array with prototype whose methods implements wrapper over Array prototype - Stack Overflow](https://stackoverflow.com/questions/26630676/create-array-with-prototype-whose-methods-implements-wrapper-over-array-prototyp)
- [javascript - Is "monkey patching" really that bad? - Stack Overflow](https://stackoverflow.com/questions/5741877/is-monkey-patching-really-that-bad)
- [javascript - Create array with prototype whose methods implements wrapper over Array prototype - Stack Overflow](https://stackoverflow.com/questions/26630676/create-array-with-prototype-whose-methods-implements-wrapper-over-array-prototyp)
