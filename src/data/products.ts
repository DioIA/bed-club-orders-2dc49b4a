
export interface Product {
  id: string;
  name: string;
  description?: string;
  photos?: string[];
}

export const products = {
  conjugadas: [
    { id: "1", name: "Casal Conjugada 7CM" },
    { id: "2", name: "Casal Conjugada 10CM" },
    { id: "3", name: "Casal Conjugada 7CM (PROMO)" },
    { id: "4", name: "Solteiro Conjugada 10CM" },
    { id: "5", name: "Solteiro Conjugada 7CM (PROMO)" },
  ],
  bases: [
    { id: "6", name: "Base King" },
    { id: "7", name: "Base Queen" },
    { id: "8", name: "Base Casal" },
    { id: "9", name: "Base Solteiro" },
  ],
  bicamas: [
    { id: "10", name: "Bicama 5cm" },
    { id: "11", name: "Bicama 3 em 1 5CM" },
  ],
  baus: [
    { id: "12", name: "Báu Casal Conjugada 7CM" },
    { id: "13", name: "Báu Solteiro Conjugada 7CM" },
    { id: "14", name: "Báu King" },
    { id: "15", name: "Báu Queen" },
    { id: "16", name: "Báu Casal" },
    { id: "17", name: "Báu Solteiro" },
  ],
  cabeceiras: [
    { id: "18", name: "Cabeceira King" },
    { id: "19", name: "Cabeceira Queen" },
    { id: "20", name: "Cabeceira Casal" },
    { id: "21", name: "Cabeceira Solteiro" },
  ],
  recamiers: [
    { id: "22", name: "Recamier King" },
    { id: "23", name: "Recamier Queen" },
    { id: "24", name: "Recamier Casal" },
    { id: "25", name: "Recamier Solteiro" },
  ],
  colchoes: [
    { id: "26", name: "Colchão King" },
    { id: "27", name: "Colchão Queen" },
    { id: "28", name: "Colchão Casal Molas" },
    { id: "29", name: "Colchão Solteiro Molas" },
    { id: "30", name: "Colchão Casal 15CM" },
    { id: "31", name: "Colchão Solteiro 15CM" },
  ],
};
