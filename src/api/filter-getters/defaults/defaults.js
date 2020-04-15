export const PAGE = 1;
export const SIZE = 20;
export const formatOptions = (response) => {
  if (response.items) {
    return response.items.map((item) => ({
      name: item.name,
      id: item.id,
    }));
  }
  return [];
};
