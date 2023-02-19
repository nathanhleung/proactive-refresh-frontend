export const abridgeKey = (key?: string) => {
  if (!key) {
    return '';
  }
  return `${key.slice(0, 10)}...${key.slice(-10)}`;
};
