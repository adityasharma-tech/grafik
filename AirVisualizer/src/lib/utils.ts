import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getRandomColor() {
  // Predefined set of 10 unique color values in hex format
  const colors = [
    '#F87171', // bg-rose-600
    '#FBBF24', // bg-yellow-400
    '#34D399', // bg-teal-400
    '#60A5FA', // bg-blue-400
    '#9B84FC', // bg-indigo-400
    '#F472B6', // bg-pink-400
    '#A3E635', // bg-lime-400
    '#FB7185', // bg-rose-500
    '#E879F9', // bg-violet-400
    '#FBBF24'  // bg-amber-400
  ];

  // Randomly select a color from the array
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}