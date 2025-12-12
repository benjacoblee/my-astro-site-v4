import type { AstroGlobal } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

interface ImportMetaEnv {
  readonly POCKETBASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface Stylable {
  classNames?: string;
}

export interface ContentLink {
  to: string;
  text: string;
}

export enum NavKey {
  HOME,
  THOUGHTS,
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
