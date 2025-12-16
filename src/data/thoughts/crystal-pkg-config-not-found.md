---
title: "crystal (pkg config not found)"
date: 2025-01-18
description: Easy fix
tags:
  - crystal
draft: false
slug: crystal-pkg-config-not-found
---

Re-learning `ruby` (or, I should say, _in greater depth_), so I started playing with `Crystal` again. Came across this bug though:

```shell
crystal run src/tsend.cr
sh: 1: pkg-config: not found
```

Fortunately, it's an easy fix.

[CMAKE Could NOT find PkgConfig (missing: PKG_CONFIG_EXECUTABLE)](https://askubuntu.com/questions/717302/cmake-could-not-find-pkgconfig-missing-pkg-config-executable)

```shell
sudo apt-get install pkg-config
```
