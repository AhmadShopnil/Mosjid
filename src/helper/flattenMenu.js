export function flattenMenu(menu) {
  let result = [];

  function recurse(items) {
    items.forEach(item => {

      const { child, ...rest } = item;
      result.push(rest);

      if (child && Array.isArray(child)) {
        recurse(child);
      }
    });
  }

  recurse(menu);
  return result;
}
