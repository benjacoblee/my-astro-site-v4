---
title: call, apply, bind
date: 2025-02-04
description: JavaScript in anger
tags: [js, JavaScript, call, apply, bind, context, functions]
draft: false
slug: call-bind-apply
---

Despite the fact that JavaScript's my first programming language, _and_ the fact that I've seen these methods here and there... I have to admit, my knowledge on `call`, `apply`, and `bind` has been fuzzy. Personally, I consider JavaScript to be a practical, "learn-by-need" language - and I've never _needed to_ learn these methods, since they're just _not that common_ in everyday JavaScript.

Well, no more. Something set me off today. We're (finally) going to look into this. And write a ton of throwaway code along the way.

So. `call`, `apply`, `bind`. What are they?

Well, they're all _instance methods_ on the `Function` object.

```javascript
const fn = new Function("a", "b", "return a + b"); // this is so jank
console.log(fn("hello", " world")); // "hello world"
const a = new Function().apply;
const b = new Function().bind;
const c = new Function().call;
```

Since `String`, `Date` and `Array` are also constructors, we can do things like this:

```javascript
console.log(String.call(null) + "world");
console.log(Date.call(null)); // whatever the date is
console.log(Array.call(null).concat([1, 2, 3])); // [1, 2, 3]
```

OK, that's cool.

But the ABC methods (yes, I'm calling them that), they're supposed to _do_ something, right?

Well, yes. they take some arguments and return some output.

And something that they _all_ have in common is that _they take an object as their first argument_.

```javascript
const secretMsg = { data: "some secret" };
function logIt() {
  console.log(this.data);
}
logIt.call(secretMsg); // some secret
logIt.apply(secretMsg); // some secret
logIt.bind(secretMsg)(); // some secret
```

You'll notice we magically have access to `this` _when we didn't pass any arguments to `logIt`_. There's no chance that I'll explain it better than MDN, so we'll defer to [MDN's explainer on `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this):

> [...] `this` refers to the object that the method is attached to, thus allowing the same method to be reused on different objects. [...] `this` in Javascript depends on how a function is invoked.

...Yeah, I don't love this, either.

We've taken a look at what makes them similar. What makes them different?

Concisely, the difference between the three:

- `apply` takes an object and an "array-like"
- `call` takes an object and variadic arguments
- `bind` takes an object and variadic arguments _but defers execution_

```javascript
function sum(...args) {
  return args.reduce((acc, curr) => acc + curr, this);
}

const applied = sum.apply(new Number(), [1, 2, 3, 4, 5]);
const bound = sum.bind(new Number(), 1, 2, 3, 4, 5);
const called = sum.call(new Number(), 1, 2, 3, 4, 5);
console.log(applied);
console.log(bound());
console.log(called); // they're all 15
```

More examples:

```javascript
function greeter(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

greeter.call({ name: "John" }, "Hola", "!"); // Hola, John!
greeter.apply({ name: "Jerry" }, ["Wassup", "."]); // Wassup, Jerry.
const storedGreeting = greeter.bind({ name: "Janice" }, "Bye", "~");
storedGreeting(); // Bye, Janice~

const slice = Array.prototype.slice;
console.log(slice.call([1, 2, 3, 4, 5], 0, 2)); // 1, 2
const has = String.prototype.includes;
console.log(has.call("this", "is")); // true
const cat = Array.prototype.concat;
console.log(cat.call([1, 2], [3, 4])); // [1, 2, 3, 4]
```

So, yeah. I don't know if this knowledge is beneficial to me (or you) in any way, but I definitely have a slightly better understanding of what these functions are doing now. At the very least, we'll have a better time the next time we see one of these out in the wild.

**Closing note**: you might not want to use arrow functions with ABC methods, because they don't have their own context (or, they carry around the context of their parent?). Don't do this:

```javascript
const sum = (that) => console.log(this, that);
sum.call({ value: 0 }, 100);

/* <ref *1> Object [global] {
  global: [Circular *1],
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  structuredClone: [Getter/Setter],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],
  fetch: [AsyncFunction: fetch]
} 100 */
```

Yeah, JavaScript...
