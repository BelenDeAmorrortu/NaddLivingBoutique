export const formatPrice = (num: string) => {
  const value = Number(num)
    .toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .split(",")[0];

  return value ?? "0.0";
};
