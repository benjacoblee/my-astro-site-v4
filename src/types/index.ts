import type { AstroGlobal, Props } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { CollectionEntry } from "astro:content";

interface ImportMetaEnv {
  readonly POCKETBASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface Stylable extends Props {
  classNames?: string;
}

export type Variant = "h1" | "h2" | "h3";

export interface ContentLink {
  to: string;
  text: string;
}

export enum NavKey {
  HOME,
  THOUGHTS,
  MICROPOSTS,
  TUNES,
  CONTACT,
}

export interface GetNavOpts {
  omit: NavKey[];
}

export interface LoginDetails {
  identity: string;
  password: string;
}

export type A = Readonly<
  AstroGlobal<
    Record<string, any>,
    AstroComponentFactory,
    Record<string, string | undefined>
  >
>;

export interface CookieOptions {
  Astro: A;
  name: string;
  value: string;
}

export type Paginated<T> = {
  currentPage: number;
  totalPages: number;
  data: T[];
  url: {
    first: string;
    prev?: string;
    current: string;
    next?: string;
    last: string;
  };
};

export type PaginateFn<T> = (
  items: T[],
  options: { pageSize: number },
) => Paginated<T>[];

export interface Gist {
  files: {
    raw_url: string;
    filename: string;
  }[];
  id: string;
  description: string;
  updated_at: string;
}

export type Micropost = CollectionEntry<"microposts">;
