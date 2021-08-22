export const formatS = (time: number) => {
  return new Date(time * 1000).toISOString().substr(15, 4);
};
