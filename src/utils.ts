export const isValidText = (text: string | undefined) => {
  return Boolean(text && text.trim() !== "");
};
