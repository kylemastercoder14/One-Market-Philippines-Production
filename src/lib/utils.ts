import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateSKU = () => {
  // generate a random 10 characters with numbers and letters
  const randomCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomDigits = "";
  for (let i = 0; i < 10; i++) {
    randomDigits += randomCharacters.charAt(
      Math.floor(Math.random() * randomCharacters.length)
    );
  }
  return `${randomDigits.toUpperCase()}`;
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const maskNumber = (number: string, type: string) => {
  if (!number) return "";

  if (type === "Bank") {
    // Mask all digits except the last 4 for card numbers
    return number.replace(/\d(?=\d{4})/g, "*");
  } else if (type === "EWallet") {
    // Mask all digits except the last 2 for mobile numbers
    return number.replace(/\d(?=\d{2})/g, "*");
  }

  return number; // Return the original number if no type matches
};
