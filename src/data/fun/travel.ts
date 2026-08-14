import type { TravelFunItem } from "../../types/fun";

const travelImage = {
  src: "/fun-assets/travel/palm-tree-cutout.png",
  alt: "The crown and upper trunk of a Mediterranean palm tree",
  objectPosition: "65% top",
};

const travelAccordionImage = {
  src: "/fun-assets/travel/spain-2024/mallorca-rocky-cove.jpg",
  alt: "Swimmers in a turquoise rocky cove on the Mallorca coast",
  objectPosition: "center 70%",
};

const travelHeaderImage = {
  src: "/fun-assets/travel/spain-2024/barcelona-passeig-lluis-companys.jpg",
  alt: "The palm-lined Passeig de Lluís Companys leading to the Arc de Triomf",
  objectPosition: "center 70%",
};

export const travelFunItem: TravelFunItem = {
  key: "travel",
  decoration: {
    ...travelImage,
    alt: "",
    mode: "cutout",
    opacity: 0.30,
  },
  title: "Travel",
  tagline: "",
  tint: "rgba(201,161,95,0.18)",
  accent: "#c9a15f",
  preview:
    "Since 2024, a group of friends and I have travelled somewhere new every year. On each trip, I enjoy learning about the country’s culture, food, architecture, and history. I especially enjoy the challenge of exploring a place where I don’t speak the language; the unexpected connection that comes from finding a way to communicate with locals is hard to beat.",
  actions: [
    {
      label: "Where I've been",
      url: "#travel-passport",
      preserveHash: true,
    },
  ],
  feature: {
    type: "travel",
    previewImage: travelAccordionImage,
    headerImage: travelHeaderImage,
    intro:
      "The best parts of travel rarely fit neatly into an itinerary. They are the meals you order with a gesture, the streets that reveal layers of history, and the small conversations that make an unfamiliar place feel welcoming.",
    trips: [
      {
        id: "spain-2024",
        title: "Spain",
        dateRange: {
          start: "2024-08",
          end: "2024-08",
          labelOverride: "August 2024",
        },
        destinations: [
          {
            country: "Spain",
            countryCode: "ES",
          },
        ],
        cities: ["Barcelona", "Mallorca", "Madrid"],
        summary:
          "There aren't many things that are better than watching your favourite team play. The atmosphere, architecture, and nightlife in Barcelona were unlike any other place I've seen. Mallorca's narrow streets and breathtaking beaches were so relaxing. Madrid's metro, landmarks, and bustling streets provided some of the coolest moments. My greatest discovery was the convenience store iced cappuccino.",
        stamp: {
          accent: "#c4573d",
          shape: "arch",
          motif: "coast",
        },
        photos: [
          {
            id: "barcelona-olympic-stadium",
            src: "/fun-assets/travel/spain-2024/barcelona-olympic-stadium.jpg",
            alt: "A football match at Barcelona's Olympic Stadium viewed from the stands",
            objectPosition: "center 62%",
          },
          {
            id: "barcelona-fc-museum",
            src: "/fun-assets/travel/spain-2024/barcelona-fc-museum.jpg",
            alt: "Historic FC Barcelona shirts displayed in the club museum",
            objectPosition: "center 48%",
          },
          {
            id: "barcelona-montjuic",
            src: "/fun-assets/travel/spain-2024/barcelona-montjuic.jpg",
            alt: "A traveller photographing the architecture at Montjuïc in Barcelona",
            objectPosition: "center 60%",
          },
          {
            id: "mallorca-sunset-beach",
            src: "/fun-assets/travel/spain-2024/mallorca-sunset-beach.jpg",
            alt: "A Mallorca beach and mountain coastline beneath a dusky sunset",
            objectPosition: "center center",
          },
          {
            id: "barcelona-arc-de-triomf-portrait",
            src: "/fun-assets/travel/spain-2024/barcelona-arc-de-triomf-portrait.jpg",
            alt: "Portrait in front of the Arc de Triomf in Barcelona",
            objectPosition: "center 44%",
            orientation: "portrait",
          },
          {
            id: "mallorca-scooter-street",
            src: "/fun-assets/travel/spain-2024/mallorca-scooter-street.jpg",
            alt: "A scooter rider passing colourful cars on a sunlit Mallorca street",
            objectPosition: "center 40%",
          },
          {
            id: "mallorca-hillside-houses",
            src: "/fun-assets/travel/spain-2024/mallorca-hillside-houses.jpg",
            alt: "Warm-toned hillside homes and palm trees in Mallorca",
            objectPosition: "center 67%",
          },
          {
            id: "mallorca-limestone-cave",
            src: "/fun-assets/travel/spain-2024/mallorca-limestone-cave.jpg",
            alt: "Illuminated stalactites and rock formations inside a Mallorca cave",
            objectPosition: "center 42%",
          },
          {
            id: "madrid-palace-gate",
            src: "/fun-assets/travel/spain-2024/madrid-palace-gate.jpg",
            alt: "An arched palace courtyard in Madrid viewed through an iron gate",
            objectPosition: "center 45%",
          },
          {
            id: "mallorca-countryside",
            src: "/fun-assets/travel/spain-2024/mallorca-countryside.jpg",
            alt: "Green Mallorca countryside beneath a wide clear blue sky",
            objectPosition: "center 72%",
          },
          {
            id: "madrid-plaza-mayor-night",
            src: "/fun-assets/travel/spain-2024/madrid-plaza-mayor-night.jpg",
            alt: "Friends walking through Madrid's Plaza Mayor at night",
            objectPosition: "center 55%",
          },
          {
            id: "mallorca-red-door-hillside",
            src: "/fun-assets/travel/spain-2024/mallorca-red-door-hillside.jpg",
            alt: "A stone hillside home with a red door in Mallorca",
            objectPosition: "center 65%",
            orientation: "portrait",
          },
        ],
      },
      {
        id: "italy-2025",
        title: "Italy",
        dateRange: {
          start: "2025-02",
          end: "2025-02",
          labelOverride: "February 2025",
        },
        destinations: [
          {
            country: "Italy",
            countryCode: "IT",
          },
        ],
        cities: ["Rome", "Vatican City", "Naples"],
        summary:
          "Late winter isn't the typical time to visit, but it meant we got the authentic experience. Espressos and cannoli every day, Romans talking smack because I'm Calabrese, and probably the best sandwiches and pizza I've ever had. I could feel the history of the Colloseum and other ancient architecture. Entering the Vatican City and St. Peter's Basilica during the Jubilee Year was a privilege. Watching the huge rivalry football match between Lazio and Napoli was magisterial.",
        stamp: {
          accent: "#2f7d4a",
          shape: "ticket",
          motif: "landmark",
        },
        photos: [
          {
            id: "italy-pizza-and-wine",
            src: "/fun-assets/travel/italy-2025/pizza-and-wine.jpg",
            alt: "Pizza boxes and glasses of red wine shared around a table in Italy",
            objectPosition: "center 58%",
          },
          {
            id: "rome-colosseum-night",
            src: "/fun-assets/travel/italy-2025/rome-colosseum-night.jpg",
            alt: "The illuminated Colosseum beneath the night sky in Rome",
            objectPosition: "center 68%",
          },
          {
            id: "italy-coffee-and-pastries",
            src: "/fun-assets/travel/italy-2025/coffee-and-pastries.jpg",
            alt: "An espresso and a plate of Italian pastries on a café table",
            objectPosition: "center 55%",
          },
          {
            id: "rome-stadio-olimpico",
            src: "/fun-assets/travel/italy-2025/rome-stadio-olimpico.jpg",
            alt: "A football match beneath the lights at Rome's Stadio Olimpico",
            objectPosition: "center 62%",
          },
          {
            id: "rome-bookshop-portrait",
            src: "/fun-assets/travel/italy-2025/rome-bookshop-portrait.jpg",
            alt: "Reading an art book outside a bookshop in Rome",
            objectPosition: "center 35%",
            orientation: "portrait",
          },
          {
            id: "vatican-st-peters-basilica",
            src: "/fun-assets/travel/italy-2025/vatican-st-peters-basilica.jpg",
            alt: "Statues lining the façade of Saint Peter's Basilica in Vatican City",
            objectPosition: "center 62%",
          },
          {
            id: "naples-city-view",
            src: "/fun-assets/travel/italy-2025/naples-city-view.jpg",
            alt: "A warm panoramic view across Naples and its coastline",
            objectPosition: "center 52%",
          },
          {
            id: "naples-galleria-umberto-i",
            src: "/fun-assets/travel/italy-2025/naples-galleria-umberto-i.jpg",
            alt: "The glass-vaulted ceiling and ornate interior of Galleria Umberto I in Naples",
            objectPosition: "center 15%",
            orientation: "portrait",
          },
          {
            id: "italy-dinner-with-friends",
            src: "/fun-assets/travel/italy-2025/dinner-with-friends.jpg",
            alt: "Friends gathered around a restaurant table for dinner in Italy",
            objectPosition: "20% 42%",
          },
          {
            id: "rome-painted-dome",
            src: "/fun-assets/travel/italy-2025/rome-painted-dome.jpg",
            alt: "An ornate painted church dome glowing in warm light in Rome",
            objectPosition: "center center",
          },
          {
            id: "vatican-st-peters-square",
            src: "/fun-assets/travel/italy-2025/vatican-st-peters-square.jpg",
            alt: "The colonnade and Apostolic Palace beneath a blue sky in Saint Peter's Square",
            objectPosition: "center 54%",
          },
          {
            id: "rome-trevi-fountain",
            src: "/fun-assets/travel/italy-2025/rome-trevi-fountain.jpg",
            alt: "The ornate sculptures of the Trevi Fountain beneath a clear blue sky",
            objectPosition: "center 58%",
            orientation: "portrait",
          },
        ],
      },
      {
        id: "colombia-2025",
        title: "Colombia",
        dateRange: {
          start: "2025-12",
          end: "2025-12",
          labelOverride: "December 2025",
        },
        destinations: [{ country: "Colombia", countryCode: "CO" }],
        cities: ["Bogotá", "Medellín", "Cartagena"],
        summary:
          "Short of breath, and short of luggage. After about 5 steps up Montserrate, we could already feel it. Great empanadas though; we had them everyday. Medellín had more motorcycles than cars, and it was definitely not as dangerous as people make it out to be. The day trip to Guatapé was a fun adventure with beautiful scenery, and exploring every corner of Comuna 13 was also an amazing history lesson. Cartagena's beaches were perfect, making for a perfect end to our trip.",
        stamp: {
          accent: "#d97718",
          shape: "oval",
          motif: "mountains",
        },
        photos: [
          {
            id: "bogota-monserrate-market",
            src: "/fun-assets/travel/colombia-2025/bogota-monserrate-market.jpg",
            alt: "A market walkway on Monserrate decorated with rows of Colombian flags",
            objectPosition: "center 48%",
            orientation: "portrait",
          },
          {
            id: "bogota-mountain-street",
            src: "/fun-assets/travel/colombia-2025/bogota-mountain-street.jpg",
            alt: "A Bogotá street framed by brick buildings with green mountains rising behind it",
            objectPosition: "center 58%",
            orientation: "portrait",
          },
          {
            id: "guatape-penol-entrance",
            src: "/fun-assets/travel/colombia-2025/guatape-penol-entrance.jpg",
            alt: "The stairway climbing the side of El Peñol rock above the shops in Guatapé",
            objectPosition: "center 5%",
            orientation: "portrait",
          },
          {
            id: "guatape-penol-closeup",
            src: "/fun-assets/travel/colombia-2025/guatape-penol-closeup.jpg",
            alt: "A close-up view looking up the steep rock face of El Peñol beneath a clear blue sky",
            objectPosition: "center 60%",
            orientation: "portrait",
          },
                    {
            id: "bogota-lourdes-church",
            src: "/fun-assets/travel/colombia-2025/bogota-lourdes-church.jpg",
            alt: "The Gothic Revival tower of the Church of Our Lady of Lourdes beneath storm clouds in Bogotá",
            objectPosition: "center 42%",
            orientation: "portrait",
          },
          {
            id: "medellin-night-view",
            src: "/fun-assets/travel/colombia-2025/medellin-night-view.jpg",
            alt: "A daytime view across Medellín's skyline and surrounding mountains beneath dramatic clouds",
            objectPosition: "center 70%",
          },
          {
            id: "medellin-christmas-lights",
            src: "/fun-assets/travel/colombia-2025/medellin-christmas-lights.jpg",
            alt: "Glowing flowers and hummingbirds suspended above a stream during Medellín's Christmas lights",
            objectPosition: "center 44%",
            orientation: "portrait",
          },
          {
            id: "bogota-monserrate-overlook",
            src: "/fun-assets/travel/colombia-2025/bogota-monserrate-overlook.jpg",
            alt: "Visitors walking across the Monserrate overlook beneath dramatic mountain clouds",
            objectPosition: "center 58%",
            orientation: "portrait",
          },
          {
            id: "guatape-friends-overlook",
            src: "/fun-assets/travel/colombia-2025/guatape-friends-overlook.jpg",
            alt: "Five friends at a Guatapé overlook with the reservoir and green hills behind them",
            objectPosition: "center 46%",
          },
          {
            id: "colombia-empanadas",
            src: "/fun-assets/travel/colombia-2025/colombia-empanadas.jpg",
            alt: "Fresh Colombian empanadas served with dipping sauces on wooden boards",
            objectPosition: "center 52%",
          },
          {
            id: "cartagena-coast-sunset",
            src: "/fun-assets/travel/colombia-2025/cartagena-coast-sunset.jpg",
            alt: "The Cartagena coastline and Caribbean Sea beneath a warm evening sunset",
            objectPosition: "center 56%",
          },
          {
            id: "cartagena-beach-sunset-portrait",
            src: "/fun-assets/travel/colombia-2025/cartagena-beach-sunset-portrait.jpg",
            alt: "A traveller watching the sunset from a beach near Cartagena",
            objectPosition: "center 48%",
            orientation: "portrait",
          },
          {
            id: "cartagena-rooftop-friends",
            src: "/fun-assets/travel/colombia-2025/cartagena-rooftop-friends.jpg",
            alt: "Friends gathered around a rooftop table beneath string lights in Cartagena",
            objectPosition: "center 48%",
            orientation: "portrait",
          },
          {
            id: "medellin-outdoor-nightlife",
            src: "/fun-assets/travel/colombia-2025/medellin-outdoor-nightlife.jpg",
            alt: "A narrow green peninsula extending into the reservoir near Guatapé",
            objectPosition: "center 52%",
            orientation: "portrait",
          },
        ],
      },
    ],
  },
};
