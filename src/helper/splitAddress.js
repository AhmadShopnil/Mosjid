export const splitAddress = (address = "", maxLength = 25) => {
  const text = address.trim();

  if (text.length <= maxLength) {
    return {
      addressLine1: text,
      addressLine2: "",
    };
  }

  // Find the last space before maxLength
  let splitIndex = text.lastIndexOf(" ", maxLength);

  // If no space exists before maxLength, find the next space
  if (splitIndex === -1) {
    splitIndex = text.indexOf(" ", maxLength);
  }

  // If there's still no space (single long word), don't split
  if (splitIndex === -1) {
    return {
      addressLine1: text,
      addressLine2: "",
    };
  }

  return {
    addressLine1: text.slice(0, splitIndex).trim(),
    addressLine2: text.slice(splitIndex + 1).trim(),
  };
};