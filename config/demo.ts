export const abridgeKey = (key: string) => {
  return `${key.slice(0, 10)}...${key.slice(-10)}`;
};
