---
title: making extension buttons bigger in firefox
date: 2024-10-25
description: Things old people do.
tags: [firefox]
draft: false
modifiedDate: 2024-10-25
slug: making-ext-btns-bigger-firefox
---

I feel like I must be getting up there in years. Anyway, today I realized that the extension buttons in Firefox are way too little for my tired eyes.

Here's how to make them bigger:

```markdown
1. In a new tab, type or paste **about:config** in the address bar and press Enter. Click the button accepting the risk.
2. In the filter box, type or paste **devp** and pause while the list is filtered
3. Double-click **layout.css.devPixelsPerPx** and change its value to **1.5** and click OK. That corresponds to 150% of the classic font size.
```

Where I got this info: [i would like to increase the size of my address bar, tabs and toolbar | Firefox Support Forum | Mozilla Support](https://support.mozilla.org/en-US/questions/1239467)
