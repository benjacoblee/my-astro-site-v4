import { twMerge } from "tailwind-merge";
import {
  NavKey,
  type A,
  type ContentLink,
  type CookieOptions,
  type GetNavOpts,
} from "../types";

const navContents: Record<NavKey, ContentLink> = {
  [NavKey.HOME]: {
    to: "/",
    text: "Home",
  },
  [NavKey.THOUGHTS]: {
    to: "/thoughts",
    text: "Thoughts",
  },
  [NavKey.MICROPOSTS]: {
    to: "/microposts/1",
    text: "Microposts",
  },
  [NavKey.PICS]: {
    to: "/pics",
    text: "Pics",
  },
  [NavKey.TUNES]: {
    to: "/tunes",
    text: "Tunes",
  },
  [NavKey.CONTACT]: {
    to: "contact@bnjmn.me",
    text: "Contact",
  },
};

export const twm = twMerge;

export const fmtDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US").format(date);

export const getExcerpt = (body?: string) => {
  const cleaned = body?.replace(/^#{1,6}\s*/gm, "");

  return `${cleaned?.split(".").slice(0, 2).join(".")}...`;
};

export const getNav = (opts?: GetNavOpts) => {
  if (!opts) return navContents;

  const { omit: keys } = opts;

  return Object.fromEntries(
    Object.entries(navContents).filter(
      ([key]) => !keys.includes(Number(key) as NavKey),
    ),
  );
};

export const getCookies = (Astro: A) => {
  const cookieHeader = Astro.request.headers.get("cookie") || "";

  const cookies = cookieHeader
    .split("; ")
    .map((s) => s.split("="))
    .reduce(
      (acc, [k, v]) => {
        return { ...acc, [k]: v };
      },
      {} as Record<string, string>,
    );

  return cookies;
};

export const setCookie = ({ Astro, name, value }: CookieOptions) => {
  Astro.cookies.set(name, value, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
  });
};
