---
title: ignoring files without using .gitignore
date: 2025-03-04
description: In case anyone needs it
tags: [git]
draft: false
slug: ignoring-files-withou-gitignore
---

Quick one: TIL you can ignore files without having to specify them in your `.gitignore` file.

Why do this? Well, I wanted a way to store some information that are not super relevant to a project (e.g. link dumps, commonly-used commands).

Anyway, you can do this by editing (or creating) `.git/info/exclude`.

- [github - How do I create/ add to a .git/info/exclude file to ignore files locally? - Stack Overflow](https://stackoverflow.com/questions/43593697/how-do-i-create-add-to-a-git-info-exclude-file-to-ignore-files-locally)
- [Ignore files in Git without adding them to .gitignore | Luis Dalmolin](https://luisdalmolin.dev/blog/ignoring-files-in-git-without-gitignore/)
