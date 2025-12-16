---
title: Operator overloading in Rust
date: 2024-11-02
description: I kinda like that you can do things like this
tags: [rust, operator, overloading]
draft: false
slug: operator-overloading-rust
---

I've been working through [The Book](https://doc.rust-lang.org/stable/book/) and came to the chapter about "advanced features" - namely, advanced traits. Rust allows us to use [std::ops](https://doc.rust-lang.org/std/ops/index.html) to overload operators and perform operations on user-defined types. It looks something like this:

```rust
use std::cmp::PartialEq;
use std::ops::{Add, Sub};

#[derive(Debug)]
struct MyNum<T> {
    val: T,
}

struct MyStr {
    val: String,
}

struct NumChars(i32);

impl<T: PartialEq + Add<Output = T>> Add for MyNum<T> {
    type Output = MyNum<T>;
    fn add(self, other: MyNum<T>) -> MyNum<T> {
        MyNum {
            val: self.val + other.val,
        }
    }
}

impl Add for MyStr {
    type Output = String;
    fn add(self, other: MyStr) -> String {
        format!("{}{}", self.val, other.val)
    }
}

impl Sub<NumChars> for MyStr {
    type Output = String;
    fn sub(self, num_chars: NumChars) -> String {
        if num_chars.0 > self.val.len() as i32 {
            return "".to_string();
        }
        let end_index = self.val.len() - num_chars.0 as usize;
        self.val[..end_index].to_string()
    }
}

fn main() {
    let res = MyNum { val: 3 } + MyNum { val: 417 };
    dbg!(res);
    let my_str = MyStr {
        val: "Hello".to_string(),
    } + MyStr {
        val: "World".to_string(),
    };
    println!("{my_str}"); // "HelloWorld"
    let my_other_str = MyStr {
        val: "Another string".to_string(),
    };
    let new_str = my_other_str - NumChars(3);
    println!("{new_str}"); // "Another str"
}
```

We have to bring in the associated modules from `std` (in this case, `Add`) and write our custom implementations for the respective data types we want to perform operations on. We can even specify a different `Rhs` (right hand side) and do all sorts of weird stuff. I mean, we probably shouldn't - but it's cool that we can.

## Links

- [The Book](https://doc.rust-lang.org/stable/book/)
- [std::ops](https://doc.rust-lang.org/std/ops/index.html)
