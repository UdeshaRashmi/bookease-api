export function capitalizeWords(value: string) {
  return value.replace(/\b([A-Za-z])/g, (letter) => letter.toUpperCase());
}
