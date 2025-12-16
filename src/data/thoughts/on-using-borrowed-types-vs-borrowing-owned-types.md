---
title: on using borrowed types vs borrowing owned types
date: 2024-11-06
description: The difference that makes all the difference.
tags: [rust, borrowed types, borrowing, ownership, owned, string, str, vec]
draft: false
slug: borrowed-types-vs-borrowing-owned-types
---

The example from [Use borrowed types for arguments - Rust Design Patterns](https://rust-unofficial.github.io/patterns/idioms/coercion-arguments.html):

```rust
fn three_vowels(word: &String) -> bool {
    let mut vowel_count = 0;
    for c in word.chars() {
        match c {
            'a' | 'e' | 'i' | 'o' | 'u' => {
                vowel_count += 1;
                if vowel_count >= 3 {
                    return true;
                }
            }
            _ => vowel_count = 0,
        }
    }
    false
}

fn main() {
    let ferris = "Ferris".to_string();
    let curious = "Curious".to_string();
    println!("{}: {}", ferris, three_vowels(&ferris));
    println!("{}: {}", curious, three_vowels(&curious));

    // This works fine, but the following two lines would fail:
    // println!("Ferris: {}", three_vowels("Ferris"));
    // println!("Curious: {}", three_vowels("Curious"));
}
```

Why doesn't it work?

- A `String` is an owned type. It lives on the heap
- A `str` is a borrowed type, a slice, a _reference_.

As far as the compiler is concerned, these are distinct types.

[What are the differences between Rust's \`String\` and \`str\`? - Stack Overflow](https://stackoverflow.com/questions/24158114/what-are-the-differences-between-rusts-string-and-str)

But the important point is that using a borrowed type in the function signature allows a type to be coerced, but using a borrowed owned type _does not_.

From the book:

```rust
fn hello(name: &str) {
    println!("Hello, {name}!");
}

let my_box = Box::new(String::from("John")); // my_box: Box<String>
hello(&my_box);
```

Why does this work? Because Rust implicitly converts the types as many times as it has to until it becomes the type `&str`.

Another example:

```rust
fn do_stuff<T>(v: &Vec<T>) -> &Vec<T> {
	return v;
}

fn better_do_stuff<T>(v: &[T]) -> &[T] {
	return v;
}

let v = &vec![1, 2, 3][0..1];
let u = &vec![1, 2, 3];
let _ = do_stuff(v); // rustc: mismatched types
// expected reference `&Vec<_>`
// found reference `&[{integer}]`
better_do_stuff(v); // is better
better_do_stuff(u); 
```

When we specify borrowed types in the function signature, we have more _flexibility_: types that will get coerced _will_ get coerced, but the opposite is not true.

## Links

- [Use borrowed types for arguments - Rust Design Patterns](https://rust-unofficial.github.io/patterns/idioms/coercion-arguments.html)
- [What are the differences between Rust's `String` and `str`? - Stack Overflow](https://stackoverflow.com/questions/24158114/what-are-the-differences-between-rusts-string-and-str)
