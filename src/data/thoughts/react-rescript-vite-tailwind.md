---
title: rescript + react + tailwind + vite (2026)
date: 2026-04-26
description: setup for reference
tags:
  - rescript
  - react
  - tailwind
  - vite
draft: false
slug: rescript-react-tailwind-vite-2026
---

Been messing around with Rescript (again) and wanted to create a React app with it but the resources are scarce. Here's how to create a Rescript + React + Vite + Tailwind app in 2026.

```bash
mkdir my-rescript-vite-app
cd my-rescript-vite-app
npm init -y
```

```sh
npm i rescript react react-dom @rescript/react 
```

Create a `rescript.json` file in the root dir:

```json
{
  "name": "my-rescript-vite-app",
  "sources": [
    {
      "dir": "src",
      "subdirs": true
    }
  ],
  "package-specs": {
    "module": "esmodule",
    "in-source": true,
    "suffix": ".mjs"
  },
  "dependencies": ["@rescript/react"],
  "jsx": { "version": 4 }
}
```

Add scripts to `package.json`:

```json
 "scripts": {
    "res:build": "rescript",
    "res:clean": "rescript clean",
    "res:dev": "rescript watch",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

Initialize the app at `src/Main.res`:

```jsx
module App = {
  @react.component
  let make = () => <p> {React.string("Hi world")} </p>
}

switch ReactDOM.querySelector("#root") {
| Some(rootElement) => {
    let root = ReactDOM.Client.createRoot(rootElement)
    ReactDOM.Client.Root.render(root, <App />)
  }
| None => JsError.throwWithMessage("No element has ID of #root!")
}
```

Install Vite:

```sh
npm i vite @vitejs/plugin-react -D
```

Create an `index.html` file:

```html
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ReScript Vite App</title>
</head>

<body>
    <div id="root"></div>
    <script type="module" src="./src/Main.mjs"></script>
</body>

</html>
```

Create `vite.config.mjs`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
       include: ["**/*.mjs"], // since we're not using .jsx files we have to tell Vite to watch for HMR changes to .mjs files
    }
  )],
});
```

Test if its working in two terminal windows:

1. `npm run res:dev`
2. `npm run dev`

Install Tailwind:

`npm install @tailwindcss/cli`

Add this to `src/input.css`:

`@import "tailwindcss";`

```css
@import "tailwindcss";
```

Run the build command:

```sh
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

Add the stylesheet to `index.html`:

`<link rel="stylesheet" href="./src/output.css" />`

It should work.

One script to rule them all:

```sh
npm i concurrently -D
```

```json
"scripts": {
 // ...rest scripts
  "start": "concurrently \"npm run res:dev\" \"npm run dev\" \"npm run tailwind:watch\"",
  "tailwind:watch": "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch"
}
```

Credit: [How to set up a React app using ReScript, Vite, and Tailwind for lightning fast development. - DEV Community](https://dev.to/jderochervlk/how-to-set-up-a-react-app-using-rescript-vite-and-tailwind-for-lightning-fast-development-oa)