import { Product } from "../types/Product";
import { removeAccents } from "./removeAccents";

export const searchProducts = (search: string, products: Product[]) => {
  const matches: Product[] = [];
  const inputLength = search.length;

  products.forEach((p: Product) => {
    let count = 0;
    let inputI = 0;
    let equalCount = 0;

    const stringProducto = removeAccents(`${p.category} ${p.name}`);
    let arrayProducto = stringProducto.split("");
    let input = (search = removeAccents(search ?? ""));

    for (let i = 0; i < arrayProducto.length; i++) {
      let l = arrayProducto[i];
      let lInput = input[inputI];

      if (inputI === inputLength || stringProducto.length - 1 === i) {
        if (((count - equalCount) / inputLength) * 100 >= 60) {
          matches.push(p);
        }
        return;
      } else if (l === lInput) {
        if (inputI === count) {
          count += 1;
          inputI += 1;
        } else {
          inputI += 1;
          count = inputI;
          if (inputI - count === 2) equalCount += 2;
          else equalCount += 1;
        }
      } else if (
        (l !== lInput &&
          inputI > 0 &&
          (inputI === count || inputI - count === 2)) ||
        inputI - count === 1
      ) {
        inputI += 1;
      } else if (l !== lInput && inputI > count) {
        count = 0;
        inputI = 0;
        equalCount = 0;
      }
    }
  });

  return matches;
};
