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
    const existingFiles = fs.existsSync(CONTENT_DIR)
      ? fs.readdirSync(CONTENT_DIR)
      : [];

    if (gists.length === existingFiles.length) {
      console.log("No new gists. Nothing to do.");
      return;
    }

    for (const gist of gists) {
      const files = Object.values(gist.files);

      if (!files.length) continue;

      const [file] = files;
      const content = await fetch(file.raw_url).then((r) => r.text());

      fs.writeFileSync(path.join(CONTENT_DIR, `${gist.id}.md`), content);
    }

    console.log("Done.");
  } catch (error) {
    console.log(error);
  }
}

saveGists();
