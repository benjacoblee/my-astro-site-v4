---
title: Adding markdown callouts to Astrojs
date: 2024-10-21
description: Took longer to figure out than I'd like to admit - documenting it here for anyone that might want to do the same.
tags:
  - astrojs
  - markdown
draft: false
slug: markdown-callouts-astrojs
---

## Context

I usually do all my writing in Obsidian, which allows for GFM (Github-flavoured markdown). One feature of GFM allows for "callouts" - highlighted blocks that emphasize a certain portion of the text. (As an "aside", we really need to standardize what these are called: "callouts", "admonitions", "alerts", even "aside").

Now, this doesn't come out of the box with Astro, but I found a nice package that helps us achieve this.

## Config

Install some required packages:

```bash
npm i "@r4ai/remark-callout"
npm i"@astrojs/tailwind"
```

In `astro.config.mjs`:

```js
export default defineConfig({
  // ...rest of config
  markdown: {
    remarkPlugins: [
      // ...
      remarkCallout,
    ],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false, // don't use the overrides - we only install tailwind to use the @apply directives
      nesting: true,
    }),
  ],
});
```

Installed Tailwind because I'm too lazy (tired) to write styles for the callout blocks, and [remark-callout](https://github.com/r4ai/remark-callout?tab=readme-ov-file) provides some example CSS that requires it - here's the [raw CSS file](https://raw.githubusercontent.com/r4ai/remark-callout/40d857e9885d335ca0c688d6eb2755e54dd2567b/packages/website/src/pages/playground/_callout.css).

In the layout that uses callouts:

```js
import "../styles/_callout.css";
```

## Result

```markdown
> [!note] title here
> body here
```

And it looks like this:

> [!note] title here
> body here

Pretty straightforward, actually.

**Links**

- [GitHub - r4ai/remark-callout: A remark plugin to add obsidian style callouts to markdown](https://github.com/r4ai/remark-callout?tab=readme-ov-file)
- [@astrojs/tailwind | Disable Tailwind's base styles in Astrojs](https://docs.astro.build/en/guides/integrations-guide/tailwind/#applybasestyles)
