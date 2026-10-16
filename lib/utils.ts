import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the proper path for static assets, taking Next.js basePath into account
 * for GitHub Pages hosting (e.g. /myportfolio/assets/...)
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return cleanPath;
  return `${basePath}${cleanPath}`;
}
