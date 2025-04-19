
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
  },
  {
    name: "SÃO JOSÉ DO RIO PRETO",
    cities: [
      { name: "Bady Bassit" },
      { name: "Borborema" },
      { name: "Cedral" },
      { name: "Catigua" },
      { name: "Catanduva" },
      { name: "Elisiaro" },
      { name: "Ibitinga" },
      { name: "Itapolis" },
      { name: "Irapua" },
      { name: "Jaci" },
      { name: "Mirassol" },
      { name: "Mendonça" },
      { name: "Novo Horizonte" },
      { name: "Nova Aliança" },
      { name: "Novais" },
      { name: "Olimpia" },
      { name: "Palmares Paulista" },
      { name: "pindorama" },
      { name: "Sanda adelia" },
      { name: "Taquaritinga" },
      { name: "Tabapua" },
      { name: "uchoa" }
    ]
  },
  {
    name: "SÃO SEBASTIÃO DO PARAÍSO",
    cities: [
      { name: "Altinopolis" },
      { name: "Acerburgo" },
      { name: "Campo Alegre" },
      { name: "Fortaleza de minas" },
      { name: "Guaranesia" },
      { name: "Guaxupe" },
      { name: "Itau de minas" },
      { name: "Itamogi" },
      { name: "Jacui" },
      { name: "Monte santo de minas" },
      { name: "Passos" },
      { name: "São sebastiao do paraiso" },
      { name: "Pratapolis" },
      { name: "Termopolis" }
    ]
  },
  {
    name: "POÇOS DE CALDAS",
    cities: [
      { name: "Andradas" },
      { name: "Aguas de lindoia" },
      { name: "Botelhos" },
      { name: "Campestre" },
      { name: "Casa branca" },
      { name: "Caldas" },
      { name: "Divinolandia" },
      { name: "Itapira" },
      { name: "Itobi" },
      { name: "Jacutinga" },
      { name: "Lindoia" },
      { name: "Mococa" },
      { name: "Mogi mirim" },
      { name: "Mogui Guaçu" },
      { name: "Muzambinho" },
      { name: "Sao joao da boa vista" },
      { name: "Santa cruz das palmeiras" },
      { name: "Sao jose do rio pardo" },
      { name: "Ouro fino" }
    ]
  }
]
