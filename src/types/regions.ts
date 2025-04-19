
export interface City {
  name: string;
}

export interface Region {
  name: string;
  cities: City[];
}

export const regionsData: Region[] = [
  {
    name: "RIBEIRÃO PRETO",
    cities: [
      { name: "Araraquara" },
      { name: "Americo Brasiliense" },
      { name: "Brodowski" },
      { name: "Boa Esperança do Sul" },
      { name: "Cravinhos" },
      { name: "Dumont" },
      { name: "Descalvado" },
      { name: "Dourado" },
      { name: "Ibate" },
      { name: "Itirapina" },
      { name: "Jardinopolis" },
      { name: "Motuca" },
      { name: "Pontal" },
      { name: "Porto Ferreira" },
      { name: "Pradopolis" },
      { name: "Rincão" },
      { name: "Ribeirão Bonito" },
      { name: "São Carlos" },
      { name: "Santa Lucia" },
      { name: "Serrana" },
      { name: "Serra Azul" },
      { name: "Sertãozinho" }
    ]
  },
  {
    name: "LIMEIRA",
    cities: [
      { name: "Araras" },
      { name: "Americana" },
      { name: "Aguas de São Pedro" },
      { name: "Corumbatai" },
      { name: "Charqueada" },
      { name: "Cordeiropolis" },
      { name: "Ipeuna" },
      { name: "Leme" },
      { name: "Pirassununga" },
      { name: "Piracicaba" },
      { name: "Rio Claro" },
      { name: "Santa Bárbara do Oeste" },
      { name: "Santa Gertrudes" },
      { name: "São Pedro" }
    ]
  }
]
