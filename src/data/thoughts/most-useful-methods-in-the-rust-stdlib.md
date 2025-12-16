---
title: most useful methods in the rust stdlib
date: 2024-11-04
description: According to Reddit.
tags: [rust, std, methods]
draft: false
modifiedDate: 2024-11-04
slug: useful-methods-rust-stdlib
---

I came across this post: [What are some useful methods in the standard library that the Rust Book doesn't go over? : r/rust](https://www.reddit.com/r/rust/comments/1bafyap/what_are_some_useful_methods_in_the_standard/) and decided it would be worth looking into. 

```rust
use std::mem::{replace, swap, take}; 

fn main() {
    let mut a = vec![0, 1, 2, 3];
    let three = take(&mut a[3]); // take three and put a default value there i.e. 0
    assert!(three == 3);
    assert!(a[3] == 0); // becomes its "default" value

    let mut zero = a[0];
    let mut one = a[1];
    swap(&mut zero, &mut one); // std::mem::swap for vars
    assert_eq!(zero, 1);
    assert_eq!(one, 0);
    a.swap(0, 1); // actual vec method defined for vecs
    assert_eq!(a[0], 1);

    struct P {
        val: Option<bool>,
    }

    let mut p = P { val: Some(true) };
    let n: Option<bool> = None;
    let moved = replace(&mut p.val, n);
    assert!(p.val.is_none());
    assert_eq!(moved, Some(true)); // the value doesn't get dropped, Some got moved into `let moved`

    let mut inf_fives = std::iter::repeat(5); // Repeat<i32> is an iterator that repeats an
                                              // el endlessly

    for _ in 0..=99 {
        let curr = inf_fives.next().unwrap();
        println!("{curr}");
    }

    let mut one_val = std::iter::once(1);
    assert!(one_val.next() == Some(1));
    assert!(one_val.next().is_none());

    let mut counter = 0;
    let my_vals = std::iter::from_fn(|| {
        if counter < 100 {
            counter += 1;
            return Some(counter);
        } else {
            None
        }
    });
    println!("{:?}", my_vals.collect::<Vec<_>>());

    let my_num: Option<u32> = Some(1);
    if my_num.is_some_and(|b| b == 1) {
    // do_stuff()
    } // is some option and matches some predicate
    struct SomeErr;
    let my_res: Result<u32, SomeErr> = Ok(1);
    if my_res.is_ok_and(|n| n == 2) {} // result version

    let n = 1;
    (n == 1).then(|| {
        print!("Wow, ");
        println!("n == 1")
    }); // some condition is true then execute some code
}
```

Just a quick one while I take a break from working through "Programming Rust". 
