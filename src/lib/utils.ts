import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function removeFrontmatter(mdxContent: string) {
  const frontmatterEndIndex = mdxContent.indexOf("---", 3);
  if (frontmatterEndIndex !== -1) {
    return mdxContent.substring(frontmatterEndIndex + 3).trim();
  }
  return mdxContent.trim();
}

export const isNotUndefined = <T>(value: T): value is Exclude<T, undefined> =>
  value !== undefined;
