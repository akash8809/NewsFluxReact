import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

export function getRandomImageUrl(query: string, index: number): string {
  // This function generates a deterministic image URL based on the query and index
  // Use a placeholder service like Unsplash source
  const keywords = encodeURIComponent(query.replace(/\s+/g, ','));
  return `https://source.unsplash.com/featured/?${keywords}&sig=${index}`;
}
