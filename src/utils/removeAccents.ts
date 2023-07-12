export const removeAccents = (string : string)=>{
    return string.normalize('NFD')
    .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2")
    .normalize().toLowerCase();
}