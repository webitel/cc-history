export const isVariableSearch = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true;
  }
  return /^[^\s=]+=[^\s=]+$/.test(value);
};
