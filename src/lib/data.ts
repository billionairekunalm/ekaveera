export const CONTACT = {
  company: "Ekveera Infra Projects LLP",
  director: "Yash Sudhir Walhekar",
  role: "Director",
  address: ["Ekveera Heights, Gurudwara Walhekarwadi Road,", "Walhekarwadi, Chinchwad, Pune"],
  email: "ekveerainfraprojectsllp@gmail.com",
  phone: "+91 93221 30674",
  phoneHref: "tel:+919322130674",
  map: "https://www.google.com/maps/search/?api=1&query=Walhekarwadi+Chinchwad+Pune",
};

export type Service = { no: string; title: string; points: string[]; img: string };

export type Phase = { no: string; title: string; kicker: string; img: string; services: Service[] };

export const PHASES: Phase[] = [
  {
    no: "I",
    title: "Foundation & Structure",
    kicker: "Where permanence begins",
    img: "/images/rcc.jpg",
    services: [
      {
        no: "01",
        title: "Earthwork",
        img: "/images/earthwork.jpg",
        points: [
          "Site clearing, foundation excavation, pits and trenches",
          "Backfilling, murum filling, compaction and rubble soling",
          "Anti-termite treatment and sub-base preparation",
        ],
      },
      {
        no: "02",
        title: "RCC & Structural Work",
        img: "/images/rcc.jpg",
        points: [
          "Reinforcement steel and RCC structural construction",
          "Footings, columns, beams, slabs and staircases",
          "Concrete and Tremix work where specified",
        ],
      },
      {
        no: "03",
        title: "Masonry & Plaster",
        img: "/images/masonry.jpg",
        points: [
          "Blockwork and masonry partitions",
          "Internal gypsum, sanala and tar plaster",
          "External sand-face plaster and finishing",
        ],
      },
      {
        no: "04",
        title: "Waterproofing",
        img: "/images/waterproofing.webp",
        points: [
          "Basement rafts, lift pits and retaining walls",
          "Toilets, balconies, terraces and refuge areas",
          "Shahabad, brickbat, chemical and tank waterproofing",
        ],
      },
    ],
  },
  {
    no: "II",
    title: "Architectural Finishes",
    kicker: "Crafted to be touched",
    img: "/images/doors.webp",
    services: [
      {
        no: "05",
        title: "Doors & Woodwork",
        img: "/images/doors.webp",
        points: [
          "Main, bedroom, toilet, balcony and staircase doors",
          "Service-shaft and fire-rated doors",
          "Frames, fittings, hardware and carpentry",
        ],
      },
      {
        no: "06",
        title: "Windows & Sliding Doors",
        img: "/images/windows-interior.webp",
        points: [
          "Aluminium windows and sliding doors",
          "Rolling shutters and glazed entrance doors",
          "Associated hardware and fittings",
        ],
      },
      {
        no: "07",
        title: "Flooring & Tiling",
        img: "/images/tiling.webp",
        points: [
          "Floor and wall tiling, interior and exterior",
          "Granite, marble and natural stone installation",
          "Skirting, thresholds and finishing",
        ],
      },
      {
        no: "08",
        title: "MS & SS Fabrication",
        img: "/images/residence-sunset.webp",
        points: [
          "Mild-steel and stainless-steel grills and railings",
          "Metal fabrication and associated fixtures",
          "Polycarbonate sheet installations",
        ],
      },
    ],
  },
  {
    no: "III",
    title: "Services & Systems",
    kicker: "The intelligence within",
    img: "/images/fire-fighting.webp",
    services: [
      {
        no: "09",
        title: "Painting & Polishing",
        img: "/images/tower-dusk.webp",
        points: [
          "Internal and external painting systems",
          "Surface preparation, putty, primer and coatings",
          "Polishing and decorative finishes",
        ],
      },
      {
        no: "10",
        title: "Plumbing & Drainage",
        img: "/images/amenities-pool.webp",
        points: [
          "Water supply, sanitary and drainage pipework",
          "Down-take lines and related installations",
          "CP and sanitary fittings",
        ],
      },
      {
        no: "11",
        title: "Electrical Work",
        img: "/images/commercial.webp",
        points: [
          "Internal conduits, wiring and distribution",
          "Switches, fixtures and common-area provisions",
          "Testing as per approved electrical designs",
        ],
      },
      {
        no: "12",
        title: "Lift Work",
        img: "/images/hero-tower.webp",
        points: [
          "Lift-related civil works and shaft coordination",
          "Lift installation through specialist vendors where in scope",
        ],
      },
    ],
  },
  {
    no: "IV",
    title: "Facade & Final Handover",
    kicker: "The face it shows the city",
    img: "/images/facade-detail.webp",
    services: [
      {
        no: "13",
        title: "Fire-Fighting Work",
        img: "/images/fire-fighting.webp",
        points: [
          "Fire-fighting installations as per approved plans",
          "Fire protection piping, fittings and provisions",
        ],
      },
      {
        no: "14",
        title: "Elevation, Glazing & Facade",
        img: "/images/facade-detail.webp",
        points: [
          "Louvers, vertical fins and DGU glazing",
          "ACP cladding, CNC jali and false ceilings",
          "CRC box-section work for external elevations",
        ],
      },
      {
        no: "15",
        title: "Building Amenities",
        img: "/images/amenities-pool.webp",
        points: [
          "Video door phones and biometric access systems",
          "Garbage chutes, solar systems and ventilation",
          "Basement and shaft HVAC provisions",
        ],
      },
      {
        no: "16",
        title: "Final Works & Handover",
        img: "/images/hero-tower.webp",
        points: [
          "Letterboxes, nameplates, parking and notice boards",
          "Building signage and departmental labour",
          "Final cleaning, finishing and handover works",
        ],
      },
    ],
  },
];

export const SERVICES = PHASES.flatMap((p) => p.services);

export const SECTORS = [
  {
    title: "Residential",
    img: "/images/residence-sunset.webp",
    text: "Apartments, towers and private residences delivered with the precision of a craftsman and the scale of a contractor.",
  },
  {
    title: "Commercial",
    img: "/images/commercial.webp",
    text: "Offices, retail and mixed-use buildings engineered for performance, compliance and a lasting first impression.",
  },
  {
    title: "Turnkey",
    img: "/images/tower-dusk.webp",
    text: "One accountable partner from groundwork to final handover — every trade coordinated, every detail closed out.",
  },
];
