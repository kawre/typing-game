export const toCamelCase = (name: string) =>
  name.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (camelCaseMatch, i) => {
    if (+camelCaseMatch === 0) return "";
    return i === 0
      ? camelCaseMatch.toLowerCase()
      : camelCaseMatch.toUpperCase();
  });
