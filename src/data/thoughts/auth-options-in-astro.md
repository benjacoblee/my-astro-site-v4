---
title: auth in astro
date: 2025-03-25
description: A brief overview on auth solutions for AstroJS
tags: [auth, astrojs, betterauth, authjs, clerk, lucia, supabase]
draft: false
slug: auth-options-in-astro
---

I recently revisted Astro to see what's new - and it turns out, there's a lot. You have AstroDB; endpoints; "actions"; suspense-type components with `server:defer`. (To be clear, some of these features have been around since v4.0+ - I just didn't know about them, since my primary usecase revolves around static content.) 

Why the revitalized interest in Astro? Well, I've been learning the latest version of Next.js, and I figured I should do the same for Astro.

One of my major complaints with Next.js is that auth is kind of a PITA to implement - so I took it upon myself to see how Astro fares.

## Auth.js

The AstroJS docs and Github repo have different examples - and both don't work? _Something_ is missing, and I couldn't figure it out. I can't recommend this. Not the Astro integration, anyway. 

## Clerk

_"It just works"_

Steps taken:

- Sign up on the Clerk website
- Add environment variables to project
- Import Astro integration
- Click on button - you're signed in 

But, there's a lot of "magic" involved. And if you need fine-grained control, you might not find it here. [A quote from Reddit](https://www.reddit.com/r/nextjs/comments/1575smi/comment/jt39bht/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button):

> You're relinquishing parts of your auth, user management, and the stewardship of that data to Clerk, a 3rd party company. 

Opinion: use this if you just want a way to log users in, and not much beyond that. 

## Better-Auth

- Weird issue with `better-sqlite3` bindings
- Found a [fix on Github](https://github.com/WiseLibs/better-sqlite3/issues/1320)

```bash
cd node_modules/better-sqlite3/
npx node-gyp rebuild
# back in project root
npx @better-auth/cli generate
✔ Do you want to generate the schema to ./better-auth_migrations/2025-03-24T21-06-18.513Z.sql? … yes
2025-03-24T21:06:20.382Z SUCCESS [Better Auth]: 🚀 Schema was generated successfully!
```

- _Must_ run migrations after that
- Docs seem a bit lacking

Hit a few snags here and there, but mostly of the resolvable kind - fixable given an hour + a cup of coffee.

Doesn't seem too bad overall. Less magic. Might be worth considering if you're already using an ORM like Drizzle, since they provide integrations for that ([actually, they provide _a whole lot_ of integrations](https://better-auth.vercel.app/docs/comparison)). 

## Lucia

You essentially roll your own, so I ended up skipping this one.

Pros: you have control. 

Cons: you have control.

## Supabase

I have to say, the docs for this are really good. Getting auth to work wasn't much more work than copy-pasting the code examples provided. I think this would be a really good option to consider if you're already using Supabase in your project. I'd have to assume that the same goes for Firebase.

## Closing

TLDR: pretty straightforward, no hair-pulling, docs are way better than Next.js. Really hope Astro takes off in a big way
