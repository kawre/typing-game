export const mapErrors = (errors: string[]) => {
  const map: Record<string, string> = {};
  errors.forEach((m) => (map[m.split(" ")[0]] = m));
  return map;
};
