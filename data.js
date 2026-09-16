const stope = {

    ploce: {
        title: "Nalazište Ploče",
        coords: {
            ogk: { top: "67.4%", left: "58.7%" },
            orthophoto: { top: "71.7%", left: "57.4%" },
            geomorphological: { top: "70.4%", left: "56.7%" },
        },
        content: {
        type: "m_teropod",
        popup: [
            {
                type: "facts",
                value: {
                'godina opisivanja': "1925.",
                'vrsta tragova': "mali teropodi",
                'broj tragova': "60",
                'veličina dinosaura': "3 – 4 m",
                starost: "105 milijuna godina",
                epoha: "donja kreda"
                }
            },
            { 
                type: "gallery", 
                value: [ 
                    { src: "slike/Tragovi/Ploce/1.jpg" },
                    { src: "slike/Tragovi/Ploce/2.jpg" }, 
                    { src: "slike/Tragovi/Ploce/3.jpg" }, 
                    { 
                        src: "slike/Tragovi/Ploce/4.jpg", 
                        caption: "Nalazište Ploče - ploha s otiscima",
                        photographer: "Aleksandar Mezga" 
                    },
                    { src: "slike/Tragovi/Ploce/5.jpg" },  
                ] 
            } 
        ]
        }
    },
    
    barban: { 
        title: "Nalazište Barban/Pogledalo/Vrbanj", 
        coords: { 
            ogk: { top: "37.9%", left: "32.1%" }, 
            orthophoto: { top: "37.9%", left: "26.3%" },
            geomorphological: { top: "39.9%", left: "30.0%" },
        }, 
        content: { 
            type: "v_teropod", 
            popup: [ 
                {
                    type: "facts",
                    value: {
                    'godina opisivanja': "1965.",
                    'vrsta tragova': "veliki teropodi",
                    'broj tragova': "60",
                    'veličina dinosaura': "7,5 – 8 m",
                    starost: "125 milijuna godina",
                    epoha: "donja kreda",
                    zanimljivost: "Jedino nalazište velikih teropodnih tragova u Hrvatskoj."
                    }
                },
                { 
                    type: "gallery", 
                    value: [
                        { 
                            src: "slike/Tragovi/Barban/4.png", 
                            caption: "Veliki teropodni otisak",
                            photographer: "Irina Žeger Pleše" },

                        { 
                            src: "slike/Tragovi/Barban/1.png", 
                            caption: "Fosilni otisci velikih teropodnih dinosaura, otok Veli Brijun, NP Brijuni",
                            photographer: "Renco Kosinožić" },
                        { 
                            src: "slike/Tragovi/Barban/2.png", 
                            caption: "Gracijalni trag velikog teropodnog dinosaura",
                            photographer: "Renco Kosinožić" }, 
                        { 
                            src: "slike/Tragovi/Barban/3.png", 
                            caption: "Staza kretanja velikog teropodnog dinosaura",
                            photographer: "Irina Žeger Pleše" }, 
                        
                    ] 
                } 
            ]
        } 
    },

    kamik: {
    title: "Nalazište Kamik/Plješivac",
    coords: {
        ogk: { top: "79.2%", left: "53.7%" },
        orthophoto: { top: "85.4%", left: "51.2%" },
        geomorphological: { top: "82.5%", left: "51.0%" },
    },
    content: {
        type: "v_ornitopod_m_teropod",
        popup: [
            {
                type: "facts",
                value: {
                'godina opisivanja': "1965.",
                'vrsta tragova': "mali teropodi i veliki ornitopodi",
                'broj tragova': "57",
                'veličina dinosaura': "3 – 4 m | teropodi\n6 - 6,5 m | ornitopodi",
                starost: "105 milijuna godina",
                epoha: "donja kreda",
                zanimljivost: "Uz otok Galiju, jedino nalazište tragova ornitopodnih dinosaura u Hrvatskoj."
                }
            },
            { type: "gallery",
            value: [
                { 
                    src: "slike/Tragovi/Kamik/1.JPG", 
                    caption: "Trag srednje velikog ornitopoda tipa Iguanodon" },
                { 
                    src: "slike/Tragovi/Kamik/2.JPG", 
                    caption: "Stražnji trag ornitopodnog dinosaura",
                    photographer: "Recno Kosinožić" },
                { 
                    src: "slike/Tragovi/Kamik/3.png", 
                    caption: "Trag malog teropodnog dinosaura - rt KamikPlješivac",
                    photographer: "Aleksandar Mezga" },
                { 
                    src: "slike/Tragovi/Kamik/4.JPG", 
                    caption: "Staza kretanja malog teropodnog dinosaura",
                    photographer: "Renco Kosinožić" },
                { 
                    src: "slike/Tragovi/Kamik/5.JPG", 
                    caption: "Staza kretanja srednje velikog ornitopoda",
                    photographer: "Renco Kosinožić" },
                ]
        }
            ],
    }
    },
    
    trstike: {
        title: "Nalazište Trstike/Debela Glava",
        coords: {
            ogk: { top: "79.3%", left: "42.1%" },
            orthophoto: { top: "85.9%", left: "37.2%" },
            geomorphological: { top: "84.1%", left: "38.8%" },
        },
        content: {
            type: "sauropod",
            popup: [
                {
                    type: "facts",
                    value: {
                    'godina opisivanja': "2001.",
                    'vrsta tragova': "sauropodi",
                    'broj tragova': "30",
                    'veličina dinosaura': "12 – 15 m",
                    starost: "105 milijuna godina",
                    epoha: "donja kreda"
                    }
                },
                { 
                type: "gallery", 
                value: [ 
                    { src: "slike/Tragovi/Trstike/1.JPG" },
                    { src: "slike/Tragovi/Trstike/2.jpeg" }, 
                    { src: "slike/Tragovi/Trstike/3.jpeg" }, 
                    { src: "slike/Tragovi/Trstike/4.jpeg" },
                ] 
            }     
        ],
        }
    },

    mol: {
        title: "Trag na brijunskom molu",
        coords: {
            ogk: { top: "46.1%", left: "62.7%" },
            orthophoto: { top: "47.8%", left: "62.8%" },
            geomorphological: { top: "49.1%", left: "62.0%" },
        },
        content: {
            type: "m_teropod",
            popup: [
            {
                type: "facts",
                value: {
                'godina uočavanja': "2008.",
                'vrsta tragova': "teropodi",
                'broj tragova': "1",
                'veličina dinosaura': "nepoznato",
                starost: "nepoznato",
                }
            },
            { type: "img", 
                value: "slike/Tragovi/Trag na molu/1.JPG", 
                caption: "Teropodni trag na molu u brijunskoj luci",
                photographer: "Renco Kosinožić" }
            ]
        }
    },

    vrsar: {
        title: "Nalazište Vrsar",
        coords: {
            ogk: { top: "68.3%", left: "33.8%" },
            orthophoto: { top: "76.7%", left: "26.2%" },
            geomorphological: { top: "70.8%", left: "31.0%" },
        },
        content: {
            type: "m_teropod",
            popup: [
                {
                    type: "facts",
                    value: {
                    'godina opisivanja': "2015.",
                    'vrsta tragova': "mali teropodi",
                    'broj tragova': "70",
                    'veličina dinosaura': "3,5 – 4 m",
                    starost: "105 milijuna godina",
                    epoha: "donja kreda"
                    }
                },
               { 
                type: "gallery", 
                value: [ 
                    { src: "slike/Tragovi/Vrsar/1.jpg" },
                    { src: "slike/Tragovi/Vrsar/2.jpg" }, 
                    { src: "slike/Tragovi/Vrsar/3.jpg" }, 
                    { src: "slike/Tragovi/Vrsar/4.jpeg", caption: "Teropodni trag" },
                    { src: "slike/Tragovi/Vrsar/5.jpg" },  
                ] 
            } 
            ],
        }
        },

    galija: {
    title: "Nalazište Galija",
    coords: {
        ogk: { top: "42.5%", left: "24.3%" },
        orthophoto: { top: "72.9%", left: "27.9%" },
        geomorphological: { top: "44.5%", left: "21.2%" },
    },
    content: {
        type: "v_ornitopod",
        popup: [
        { type: "text", value: "Na otoku Galija zabilježeni su fosilni tragovi dinosaura." }
        ]
    }
    },

    vanga_1: {
    title: "Nalazište Vanga",
    coords: {
        ogk: { top: "51.4%", left: "22.7%" },
        orthophoto: { top: "53.2%", left: "14.6%" },
        geomorphological: { top: "53.5%", left: "19.4%" },
    },
    content: {
        type: "sauropod",
        popup: [
        { type: "text", value: "Na otoku Vanga zabilježeni su fosilni tragovi dinosaura." }
        ]
    }
    },

    vanga_2: {
    title: "Nalazište Vanga",
    coords: {
        ogk: { top: "50.5%", left: "26.9%" },
        orthophoto: { top: "52.8%", left: "19.2%" },
        geomorphological: { top: "53.2%", left: "23.4%" },
    },
    content: {
        type: "m_teropod",
        popup: [
        { type: "text", value: "Na otoku Vanga zabilježeni su fosilni tragovi dinosaura." }
        ]
    }
    },

    vanga_3: {
    title: "Nalazište Vanga",
    coords: {
        ogk: { top: "58.7%", left: "29.0%" },
        orthophoto: { top: "61.3%", left: "21.7%" },
        geomorphological: { top: "61.2%", left: "23.1%" },
    },
    content: {
        type: "sauropod_m_teropod",
        popup: [
        { type: "text", value: "Na otoku Vanga zabilježeni su fosilni tragovi dinosaura." }
        ]
    }
    }

};

/* ============================= */
/* MAP LEGENDS                    */
/* ============================= */

const DINOSAUR_FOOTPRINT_LEGEND = [
  {
    type: "v_teropod",
    text: "veliki teropodi",
    note: "duljina otiska >25 cm"
  },
  {
    type: "m_teropod",
    text: "mali teropodi",
    note: "duljina otiska <25 cm"
  },
  {
    type: "v_ornitopod",
    text: "veliki ornitopodi",
    note: "duljina otiska >25 cm"
  },
  {
    type: "sauropod",
    text: "sauropodi"
  },
  {
    type: "v_ornitopod_m_teropod",
    text: "mali teropodi i veliki ornitopodi",
    note: "mali teropodi: <25 cm · veliki ornitopodi: >25 cm"
  },
  {
    type: "sauropod_m_teropod",
    text: "mali teropodi i sauropodi",
    note: "mali teropodi: <25 cm"
  }
];

const LITHOSTRATIGRAPHIC_LEGEND = [
  {
    period: "HOLOCEN",
    className: "holocen",

    entries: [
      {
        code: "a",
        className: "a",
        title: "Antropogene naslage",
        description:
          "Različite naslage nastale ljudskom djelatnošću (tlo, pijesak, uglato sitno kršje i blokovi)."
      },

      {
        code: "cst",
        className: "cst",
        title: "Crveno-smeđe tlo na karbonatu",
        description:
          "Crveno-smeđe tlo na karbonatu (holocen). Glinoviti silt granulaste strukture."
      },

      {
        code: "b",
        className: "b",
        title: "Barski sedimenti",
        description:
          "Siltovi i gline bogati organskim ostacima taloženi u okolišu recentne slane močvare, često pomiješani s antropogenim naslagama."
      },

      {
        code: "mp",
        className: "mp",
        title: "Morska plaža (žalo)",
        description:
          "Karbonatni šljunci s blokovima, dobro zaobljene valutice i pijesak izgrađeni od vapnenačkih stijena koje izdanjuju duž obale."
      }
    ]
  },

  {
    period: "PLEISTOCEN",
    className: "pleistocen",

    entries: [
      {
        code: "p",
        className: "p",
        title: "Koštane breče",
        description:
          "Porozna, klast potporna i čvrsto litificirana karbonatna breča s vidljivim koštanim ostacima. Uglati litoklasti građeni su od stijena neposrednog zaleđa; koluvij."
      }
    ]
  },

  {
    period: "ALB",
    className: "alb",

    entries: [
      {
        code: "CN",
        className: "cn",
        title: "Formacija Crna",
        description:
          "Tanko do pločasto slojeviti, svijetli, dominantno zrnasti vapnenci (vekstoni, pekstoni i grejnstoni s miliolidama) u izmjeni sa srednje debelim slojevima fenestralnih madstona i floutstonima s krupnim bioklastima školjkaša (radiolitidi, hame) i gastropoda (nerineje) te cijanobakterijsko-algalnim laminitima i emerzijskim brečama."
      }
    ]
  },

  {
    period: "APT",
    className: "apt",

    entries: [
      {
        code: "KA",
        className: "ka",
        title: "Formacija Kanfanar",
        description:
          "Debelo slojeviti, žućkasti vapnenci (madstoni, vekstoni i floutstoni) s baćinelama, palorbitolinama, tukazijama, bentičkim foraminiferama, salpingoporelskim algama i gastropodima."
      }
    ]
  },

  {
    period: "BAREM",
    className: "bar",

    entries: [
      {
        code: "MB",
        className: "mb",
        title: "Formacija Mali Brijun",
        description:
          "Tanko do pločasto slojeviti, sivkasti do svijetli vapnenci (madstoni, vekstoni, pekstoni i grejnstoni sa salpingoporelskim algama, bentičkim foraminiferama, ostrakodima i gastropodima) u izmjeni sa cijanobakterijsko-algalnim laminitima i emerzijskim brečama."
      }
    ]
  }
];

const GEOLOGICAL_TECTONIC_LEGEND = [
{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/normalan-sloj.svg",
text: "normalan sloj s brojčano iskazanim kutom nagiba"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/horizontalan-sloj.svg",
text: "horizontalan sloj"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/geoloska-granica.svg",
text: "geološka granica"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/rasjed-lokalni-sporedni.svg",
text: "rasjed (lokalni sporedni)"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/rasjed-lokalni-sporedni-pretpostavljen.svg",
text: "rasjed (lokalni sporedni), pretpostavljen"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/rasjed-lokalni-glavni.svg",
text: "rasjed (lokalni glavni)"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/rasjed-lokalni-glavni-pretpostavljen.svg",
text: "rasjed (lokalni glavni), pretpostavljen"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/nr-pravokutnik-na-spustenom-bloku.svg",
text: "normalni rasjed (pravokutnik na spuštenom bloku)"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/imenovani-rasjed.svg",
text: "imenovani rasjed"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/antiklinala.svg",
text: "antiklinala"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/sinklinala.svg",
text: "sinklinala"
},

{
symbol: "slike/tumac/geoloski-i-tektonski-simboli/trasa-geoloskog-profila.svg",
text: "trasa geološkog profila"
}
];

const PALEONTOLOGICAL_SEDIMENTOLOGICAL_LEGEND = [
  {
    number: 1,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/kostane-brece.svg",
    text: "koštane breče"
  },

  {
    number: 2,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/radiolitni-rudisti.svg",
    text: "radiolitni rudisti"
  },

  {
    number: 3,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/kokine-nerinejskih-gastropoda.svg",
    text: "kokine nerinejskih gastropoda"
  },

  {
    number: 4,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/kokine-hamoidnih-skoljkasa.svg",
    text: "kokine hamoidnih školjkaša"
  },

  {
    number: 5,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/krpasti-grebeni.svg",
    text: "krpasti grebeni"
  },

  {
    number: 6,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/valni-riplovi.svg",
    text: "valni riplovi"
  },

  {
    number: 7,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/LLH-stromatoliti.svg",
    text: "LLH stromatoliti"
  },

  {
    number: 8,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/desikacijske-pukotine.svg",
    text: "desikacijske pukotine"
  },

  {
    number: 9,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/tragovi-dinosaura.svg",
    text: "tragovi dinosaura"
  },

  {
    number: 10,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/tragovi-kornjaca.svg",
    text: "tragovi kornjača"
  },

  {
    number: 11,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/plocasti-do-listicavi-vapnenci.svg",
    text: "pločasti do listićavi vapnenci"
  },

  {
    number: 12,
    symbol: "slike/tumac/paleontoliški-i-sedimentološki-simboli/tee-pee-strukture.svg",
    text: "tee-pee strukture"
  }
];

const GEOMORPHOLOGICAL_LEGEND = {
    symbols: [
        {
            image: "slike/Geomorfologija/obalna_linija.png",
            label: "Recentna obalna linija (DEM)"
        },
        {
            image: "slike/Geomorfologija/otisci_dinosaura.png",
            label: "Otisci dinosaura"
        },
        {
            image: "slike/Geomorfologija/vapnenice.png",
            label: "Vapnenice"
        },
        {
            image: "slike/Geomorfologija/arheoloski_poligoni.png",
            label: "Arheološki poligoni"
        },
        {
            image: "slike/Geomorfologija/suhozidi.png",
            label: "Suhozidi"
        },
        {
            image: "slike/Geomorfologija/ceste.png",
            label: "Ceste"
        },
        {
            image: "slike/Geomorfologija/povremeni_tok.png",
            label: "Povremeni tok"
        }
    ],

    units: [
      {
          label: "Antropogeni objekti i antropogeno modificirana obala"
      },
      {
          label: "Antropogeno modificirane zaravni i uređene površine"
      },
      {
          label: "Jezerca i saline"
      },
      {
          label: "Kamenolom"
      },
      {
          label: "Krške i akumulacijske depresije"
      },
      {
          label: "Obalni pojas i rubne obalne padine"
      },
      {
          label: "Stjenoviti obalni otočić"
      },
      {
          label: "Žalo od nevezanog materijala"
      }
  ],

  slopes: [
      { label: "0–2°" },
      { label: "2–5°" },
      { label: "5–12°" },
      { label: "12–32°" },
      { label: "32–55°" },
      { label: ">55°" }
  ]
};