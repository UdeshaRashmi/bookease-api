export const sriLankanMobileNumberPattern = /^(?:0|94|\+94)7\d{8}$/;

export function startsEachWordWithCapital(value: string) {
  const words = value.trim().split(/\s+/);

  return words.every((word) => {
    const firstLetter = word.match(/[A-Za-z]/)?.[0];

    return !firstLetter || firstLetter === firstLetter.toUpperCase();
  });
}
