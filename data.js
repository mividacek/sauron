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
                'vrsta trgova': "mali teropodi",
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
            base: { top: "38.6%", left: "34.0%" }, 
            ortho: { top: "40.6%", left: "26.4%" } 
        }, 
        content: { 
            type: "v_teropod", 
            popup: [ 
                {
                    type: "facts",
                    value: {
                    'godina opisivanja': "1965.",
                    'vrsta trgova': "veliki teropodi",
                    'broj tragova': "60",
                    'veličina dinosaura': "7,5 – 8 m",
                    starost: "125 milijuna godina",
                    epoha: "donja kreda",
                    zanimljivost: "Jedino nalazište velikih teroposnih tragova u Hrvatskoj"
                    }
                },
                { 
                    type: "gallery", 
                    value: [ 
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
                        { 
                            src: "slike/Tragovi/Barban/4.png", 
                            caption: "Veliki teropodni otisak",
                            photographer: "Irina Žeger Pleše" } 
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
                'vrsta trgova': "mali teropodi i veliki ornitopod",
                'broj tragova': "57",
                'veličina dinosaura': "3 – 4 m (teropodi)\n6 - 6,5 m (ornitopodi)",
                starost: "105 milijuna godina",
                epoha: "donja kreda",
                zanimljivost: "Uz otok Galiju, jedino nalazište tragova ornitopodnih dinosaura u Hrvatskoj"
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
            base: { top: "81.5%", left: "42.2%" },
            ortho: { top: "92.2%", left: "35.0%" }
        },
        content: {
            type: "sauropod",
            popup: [
                {
                    type: "facts",
                    value: {
                    'godina opisivanja': "2001.",
                    'vrsta trgova': "sauropodi",
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
                'vrsta trgova': "teropodi",
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
                    'vrsta trgova': "mali teropodi",
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
        {
                type: "facts",
                value: {
                'godina opisivanja': "2024.",
                'vrsta trgova': "mali teropodi",
                'broj tragova': "7",
                'veličina dinosaura': "5,5 - 6 m",
                starost: "105 milijuna godina",
                epoha: "donja kreda"
                }
            },
        { type: "text", value: "Fosilni tragovi velikih ornitopoda zabilježeni su na otoku Galija." }
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
        { type: "text", value: "Fosilni tragovi dinosaura zabilježeni su i na otoku Vanga." }
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
        type: "sauropod_m_teropod",
        popup: [
        { type: "text", value: "Fosilni tragovi dinosaura zabilježeni su i na otoku Vanga." }
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
        type: "m_teropod",
        popup: [
        { type: "text", value: "Fosilni tragovi dinosaura zabilježeni su i na otoku Vanga." }
        ]
    }
    }

};