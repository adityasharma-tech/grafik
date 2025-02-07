import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getRandomColor() {
  // Predefined set of 10 unique color values in hex format
  const colors = [
    '#B91C1C', // bg-red-700
    '#B45309', // bg-yellow-700
    '#065F46', // bg-teal-700
    '#1D4ED8', // bg-blue-700
    '#5B21B6', // bg-indigo-700
    '#9D174D', // bg-pink-700
    '#4D7C0F', // bg-lime-700
    '#BE123C', // bg-rose-700
    '#7E22CE', // bg-violet-700
    '#92400E'  // bg-amber-700
  ];

  // Randomly select a color from the array
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}


export function formatTime(date: Date | string | number): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
      throw new Error("Invalid date");
  }

  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}