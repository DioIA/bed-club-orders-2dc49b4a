
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
      { name: "Americo Brasiliense" },
      { name: "Araraquara" },
      { name: "Altinopolis" },
      { name: "Boa Esperança do sul" },
      { name: "Bocaina" },
      { name: "Barrinha" },
      { name: "Bebedouro" },
      { name: "Barretos" },
      { name: "Batatais" },
      { name: "Brodoswki" },
      { name: "Colina" },
      { name: "Cajuru" },
      { name: "Dobrada" },
      { name: "Delta" },
      { name: "Dumont" },
      { name: "Dourado" },
      { name: "Descalvado" },
      { name: "Franca" },
      { name: "Guatapará" },
      { name: "Guara" },
      { name: "Guariba" },
      { name: "Itirapina" },
      { name: "Jaboticabal" },
      { name: "Monte Alto" },
      { name: "Matão" },
      { name: "miguelopolis" },
      { name: "Morro Agudo" },
      { name: "Orlandia" },
      { name: "Porto ferreira" },
      { name: "Pradopolis" },
      { name: "Pitangueiras" },
      { name: "Patrocínio Paulista" },
      { name: "Pontal" },
      { name: "Ribeirão Bonito" },
      { name: "Rincão" },
      { name: "Santa Lucia" },
      { name: "Sertaozinho" },
      { name: "Serrana" },
      { name: "São Joaquim da Barra" },
      { name: "São Carlos" },
      { name: "Trabiju" },
      { name: "Uberaba" },
      { name: "Vista Alegre do Alto" },
      { name: "Viradouro" }
    ]
  },
  {
    name: "LIMEIRA",
    cities: [
      { name: "Americana" },
      { name: "Araras" },
      { name: "Arthur Nogueira" },
      { name: "Brotas" },
      { name: "Charqueada" },
      { name: "Corumbatai" },
      { name: "Cordeiropolis" },
      { name: "Campinas" },
      { name: "Cosmopolis" },
      { name: "Hortolandia" },
      { name: "Ipeuna" },
      { name: "Leme" },
      { name: "Limeira" },
      { name: "Mogi Guaçu" },
      { name: "Mogi Mirim" },
      { name: "Nova Odessa" },
      { name: "Pirassununga" },
      { name: "Paulinia" },
      { name: "Piracicaba" },
      { name: "Rio Claro" },
      { name: "São Pedro" },
      { name: "Sumaré" },
      { name: "Santa Bárbara do Oeste" },
      { name: "Valinhos" }
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
