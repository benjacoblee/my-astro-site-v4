---
title: the secret rust type
date: 2024-11-03
description: Well, not really. But still
tags: [rust, never, types]
draft: false
slug: secret-rust-type
---

Apparently there is a type in Rust we don't really talk about. Or think about.

In Rust, an expression has to return the same type in all paths. This won't work: 

```rust
fn mismatched(i: i32) -> String {
    if i == 0 {
        return "i is zero".to_string();
    }
    return 1;
} // error[E0308]: mismatched types

let my_cond = if true { 2 } else { "whatever".to_string() }; // error[E0308]: `if` and `else` have incompatible types
```

Then why does this work?

```rust
let some_b = false;
match some_b {
	true => true,
	false => panic!("It was not true");
}
```

Well, apparently it's because of the [`never type`](https://doc.rust-lang.org/core/primitive.never.html) (aka `!`).

These paths never resolve to any value.

Similarly:

```rust
let some_b = false;

match some_b {
	true => true,
	false => std::process::exit(1),
};

let mut i = 0;
while i < 100 {
	i += 1;
	let _ = match i {
		1..=99 => {
			println!("Num is: {}", i);
			i
		}
		_ => break,
	};
}
```

So, whenever there are code paths that don't return the same type, that's probably because they're returning a `never`.
