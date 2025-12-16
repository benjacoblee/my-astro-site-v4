---
title: rust - first steps
date: 2024-10-23
description: Some setup?
tags: [rust, coding]
draft: false
slug: rust-first-steps
---

I've decided to learn Rust again. It's one of those things that have been on my list for awhile. This time round, I really just wanna have fun - stop, smell the flowers. I'm no longer a developer, so I don't have to worry about not being able to grok it (actually, I don't know why I ever stressed about Rust before - not like we used it at work).

So, first steps.

Every time I pick up a new language, I like writing lots of small snippets. Code that isn't particularly useful, or impressive. Like, how do I count words in a sentence? Splitting strings? Counting things in arrays? Things like that.

However, based off my extremely rusty memory (ha - nailed it), there isn't a particularly good way to write small scripts in Rust. You _could_ run code with `rustc`, but you don't get any useful messages from the compiler. And I don't want to keep creating new projects with `cargo new` for small code snippet - those large binaries are PITA.

But, I must've gotten better at googling, because I came across this thread: [Is there any way to compile and run a single rust file for exercise? : r/rust](https://www.reddit.com/r/rust/comments/tiaor0/is_there_any_way_to_compile_and_run_a_single_rust/)

TLDR: have a single project, and create standalone files in `src/bin` (e.g. `src/bin/example.rs`. Then just run `cargo run --bin example`. Then, run cleanup with `cargo clean`. This way, I'll still get code completion and helpful messages from rust-analyzer in VS Code.
