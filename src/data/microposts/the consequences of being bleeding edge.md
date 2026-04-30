---
title: "it's hard to be bleeding edge"
description: 
tags: []
modifiedDate: 2025-01-28T10:05:05+08:00
---

Today:

- Rebuilt my site's "microposts" page in Astro for it to work fine in development but not on the deployment target (Netlify)
- Spent two hours wondering why - made lots of guesses, moved stuff here and there, migrated from Astro v4 to v5

Nearing my wits end, I caved and asked Deepseek. Gave a couple of suggestions, the first of which turned out to be the culprit:

```javascript
// went from this
myEntries.sort() // sorting algorithm here
// to this
myEntries.toSorted() 
```

That's the price you pay for playing with "bleeding edge" features, I guess.