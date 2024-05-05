export const arrayToIdsObject = (array: any) => {
  return array.reduce((acc: any, current: any) => {
    acc[current.id] = current.nombre;
    return acc;
  }, {});
};
