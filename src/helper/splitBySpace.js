export function splitBySpace(text) {
  return text?.trim()?.split(/\s+/);
}


export function splitByComma(text) {
  return text?.trim()?.split(/\s*,\s*/);
}

export function splitBySlash(text) {
  return text?.trim()?.split(/\s*\/\s*/);
}
