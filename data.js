const stope = {

    ploce: {
        title: "Nalazište Ploče",
        coords: {
            base: { top: "67.4%", left: "58.7%" },
            ortho: { top: "75.8%", left: "54.0%" }
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
            base: { top: "37.9%", left: "32.1%" }, 
            ortho: { top: "39.9%", left: "24.7%" } 
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
        base: { top: "79.2%", left: "53.7%" },
        ortho: { top: "89.8%", left: "47.9%" }
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
            base: { top: "79.3%", left: "42.1%" },
            ortho: { top: "88.9%", left: "35.3%" }
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
                    base: { top: "46.1%", left: "62.7%" },
                    ortho: { top: "50.2%", left: "58.7%" }
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
            base: { top: "68.3%", left: "33.8%" },
            ortho: { top: "76.7%", left: "26.2%" }
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
        base: { top: "42.5%", left: "24.3%" },
        ortho: { top: "45.3%", left: "15.3%" }
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
        base: { top: "51.4%", left: "22.7%" },
        ortho: { top: "55.9%", left: "13.7%" }
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
        base: { top: "50.5%", left: "26.9%" },
        ortho: { top: "54.8%", left: "18.1%" }
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
        base: { top: "58.7%", left: "29.0%" },
        ortho: { top: "65.0%", left: "20.2%" }
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
    text: "veliki teropodi"
  },
  {
    type: "m_teropod",
    text: "mali teropodi"
  },
  {
    type: "v_ornitopod",
    text: "veliki ornitopodi"
  },
  {
    type: "sauropod",
    text: "sauropodi"
  },
  {
    type: "v_ornitopod_m_teropod",
    text: "mali teropodi i veliki ornitopodi"
  },
  {
    type: "sauropod_m_teropod",
    text: "mali teropodi i sauropodi"
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
          "Različite naslage nastale ljudskom djelatnošću (tlo, pijesak, ugato sitno kršje i blokovi)."
      },

      {
        code: "cst",
        className: "cst",
        title: "Crveno-smeđe tlo na karbonatu",
        description:
          "Glinoviti silt granulaste strukture."
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
        title: "Morska plaža",
        description:
          "Karbonatni šljunci s blokovima, dobro zaobljene valutice i pjesak izgrađeni od vapnenačkih stijena koje izgrađuju duž obale."
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
          "Porozna, klast potpoma i čvrsto litificirana karbonatna breča s velikim kostima ostataka. Uglavnom nastali gradnji su od stijena nepoznatog zaleđa; koluvij."
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
          "Tanko do pločasto slojeviti, svijetli, dominantno znatni vapnenici, sivozeleni i sivozeleni i smeđkasti, s pojavom i stromatolita."
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
          "Debelo slojeviti, žućkasti vapnenci (madstoni, wackestoni i floatstoni) s bračnima, parolitolomama, tužkama, beričkim foraminiferama, sapropeliskim algama i gastropodima."
      }
    ]
  },

  {
    period: "BAR",
    className: "bar",

    entries: [
      {
        code: "MB",
        className: "mb",
        title: "Formacija Mali Brijun",
        description:
          "Tanko do pločasto slojeviti, sivkasti do svijetli vapnenci, s vapnenačkim fragmentima, vodenim i sapropeliskim algama, bentoskim foraminiferama, ostrakodima i gastropodima."
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
    text: "kokine hamoidnih školjakaša"
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