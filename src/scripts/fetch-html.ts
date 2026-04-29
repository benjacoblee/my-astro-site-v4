import fs from "fs";
import path from "path";
import "dotenv/config";

const OUTPUT_TARGET = path.join(process.cwd(), "src/pages/last-workout.astro");

async function fetchHtml() {
  const url = process.env.STRONG_HTML_URL ?? "";
  console.log(`Fetching html from ${url}`);

  const res = await fetch(url);
  const workoutHtml = await res.text();

  console.log("Fetched html.");

  return workoutHtml;
}

async function main() {
  try {
    const html = await fetchHtml();
    const content = `---
import Gap from "../components/gap.astro";
import Heading from "../components/heading.astro";
import Layout from "../components/layout.astro";
---

<Layout title="/last-workout">
  <Gap>
    <Heading variant="h1">Last Workout</Heading>
    ${html}
  </Gap>
</Layout>
  `;

    fs.writeFile(OUTPUT_TARGET, content, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

main();
