import fs from "fs";
import path from "path";
import { type Gist } from "../types";
import "dotenv/config";

const CONTENT_DIR = path.join(process.cwd(), "src/data/microposts");

async function fetchAllGistsRecursive(
  page = 1,
  acc: any[] = [],
): Promise<Gist[]> {
  const PAT = process.env.GITHUB_PAT;
  const per_page = 30;

  const res = await fetch(
    `https://api.github.com/gists?per_page=${per_page}&page=${page}`,
    {
      headers: { Authorization: `Bearer ${PAT}` },
    },
  );

  const batch = await res.json();

  if (!Array.isArray(batch) || batch.length === 0) {
    return acc;
  }

  return fetchAllGistsRecursive(page + 1, [...acc, ...batch]);
}

async function fetchAllGists() {
  const all = await fetchAllGistsRecursive();

  return all.filter(({ description }) => description === "#micropost");
}

async function saveGists() {
  console.log("Fetching gists...");

  try {
    const gists = await fetchAllGists();

    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }

    for (const gist of gists) {
      const filePath = path.join(CONTENT_DIR, `${gist.id}.md`);

      if (fs.existsSync(filePath)) {
        console.log(`${filePath} already exists, skipping.`);
        continue;
      }

      const files = Object.values(gist.files);
      if (!files.length) continue;

      const [file] = files;
      const content = await fetch(file.raw_url).then((r) => r.text());

      fs.writeFileSync(filePath, content);
    }

    console.log("Done.");
  } catch (error) {
    console.error(error);
  }
}

saveGists();
