---
title: creating a simple monorepo with bun, hono and react
date: 2025-03-21
description: A quick walkthrough
tags: [monorepo, react, rpc, hono]
draft: false
slug: monorepo-with-bun-hono-react
---

## Why

Because it'll let us deduplicate code. And RPC with IDE-autocompletion is cooool. And probably other reasons I'm not thinking of.

## Quick Walkthrough

Bash:

```shell
❯ mkdir your-monorepo
❯ cd your-monorepo
```

I've been using Bun a lot, so it's what I'll be using for this example.

Create a `package.json` with the following content:

```json
{
  "name": "the-example-app",
  "version": "1.0.0",
  "workspaces": ["packages/*"]
}
```

The [`"workspaces"`](https://bun.sh/docs/install/workspaces) key lets us define which of our directories should be packages/workspaces within the monorepo.

I've heard (read?) that naming our folder `packages` or `app` is a common convention in this kind of setup.

Now, creating our client and server...

```bash
❯ mkdir packages && cd packages

❯ bun create vite frontend
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript
│
◇  Scaffolding project in /mnt/d/data/code/your-monorepo/packages/frontend...
│
└  Done. Now run:

  cd frontend
  bun install
  bun run dev

❯ bun create hono@latest backend
create-hono version 0.15.4
✔ Using target directory … backend
? Which template do you want to use? bun
? Do you want to install project dependencies? no
✔ Cloning the template
```

We'll need to specify an entrypoint in the backend's `package.json`, because Hono doesn't do it for us:

```json
{
  "main": "src/index.ts"
}
```

Now to specify the backend as a dependency in our frontend:

```json
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "backend": "workspace:*"
}
```

See if everything worked:

```bash
❯ bun i
bun install v1.2.1 (ce532901)

189 packages installed [1141.00ms]
```

```ts
// packages/frontend/src/main.tsx

import thingy from "backend"; // 'thingy' is declared but its value is never read.ts(6133)
                              // (alias) const thingy: Hono<BlankEnv, BlankSchema, "/">
```

It resolves. Cool! Let's write a backend route.

```ts
// packages/backend/src/index.ts

import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const books = new Hono().get("/:id", (c) => {
  const booksData = [
    { id: 1, title: "first" },
    { id: 2, title: "second" },
  ];
  const id = c.req.param("id");
  const foundBook = booksData.find((b) => b.id === +id);
  return c.json(foundBook!);
});

const routes = app.route("/books", books);

export type AppType = typeof routes;
export default app;
```

The frontend code:

```ts
// packages/frontend/src/App.tsx

import { AppType } from "backend";
import { hc, InferResponseType } from "hono/client";
import { useEffect, useState } from "react";
import "./App.css";
const client = hc<AppType>("http://localhost:3000/");

type BookRes = InferResponseType<(typeof client.books)[":id"]["$get"]>;

function App() {
  const [book, setBook] = useState<BookRes>();

  useEffect(() => {
    const fetchBook = async () => {
      const res = await client.books[":id"].$get({
        param: { id: "2" },
      });
      setBook(await res.json());
    };

    fetchBook();
  }, []);

  return (
    <>
      {book && (
        <>
          {book.id} - {book.title}
        </>
      )}
    </>
  );
}

export default App;
```

And now we have a nice, typesafe way of interfacing with our server. Pretty cool :)

It works well with `POST` requests too! We first set up a validator:

```ts
const todos = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({ desc: z.string().nonempty(), done: z.boolean() }),
  ),
  async (c) => {
    const validated = await c.req.json();
    return c.text("ok");
  },
);
```

Then on the frontend:

```ts
client.todos.$post({
  json: {
    banana: "wow", // Object literal may only specify known properties, and 'banana' does not exist in type '{ desc: string; done: boolean; }'.
  },
});
```

## Closing Thoughts

RPC is really nice.

FWIW, I tried this with Elysia before (Eden) but kept getting type errors. Small dub for Hono.
