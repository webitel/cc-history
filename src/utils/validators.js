export const isVariableSearch = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return !false;
  }
  return /^[^\s=]+=[^\s=]+$/.test(value);
};
