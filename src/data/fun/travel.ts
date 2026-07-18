import type { TravelFunItem } from "../../types/fun";

const travelImage = {
  src: "/fun-assets/travel/italy-2025/rome-colosseum-night.jpg",
  alt: "The illuminated Colosseum beneath the night sky in Rome",
  objectPosition: "center 68%",
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
  icon: "✈️",
  decoration: {
    ...travelImage,
    alt: "",
    mode: "cover",
  },
  title: "Travel",
  tagline: "Annual trips with friends since 2022",
  tint: "rgba(160,107,255,0.08)",
  accent: "#a06bff",
  detail:
    "Since 2022, a group of friends and I have made travel an annual tradition. Each trip is a chance to learn through a country's culture, food, architecture, and history. I love the thrill of landing somewhere I don't speak the language—and the joy, awkwardness, and unexpected connection that come from finding a way to communicate with locals.",
  actions: [
    {
      label: "Explore the trips",
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
          "Spain moved at three distinct rhythms: Barcelona's bold architecture and coastal energy, Mallorca's quiet stone streets and turquoise water, and Madrid's grand avenues, food, and late-night pace. Moving between them made the country's regional character as memorable as its shared history.",
        stamp: {
          accent: "#2f7d4a",
          shape: "arch",
          motif: "coast",
        },
        photos: [
          {
            id: "barcelona-arc-de-triomf-portrait",
            src: "/fun-assets/travel/spain-2024/barcelona-arc-de-triomf-portrait.jpg",
            alt: "Portrait in front of the Arc de Triomf in Barcelona",
            objectPosition: "center 44%",
          },
          {
            id: "barcelona-fc-museum",
            src: "/fun-assets/travel/spain-2024/barcelona-fc-museum.jpg",
            alt: "Historic FC Barcelona shirts displayed in the club museum",
            objectPosition: "center 48%",
          },
          {
            id: "barcelona-olympic-stadium",
            src: "/fun-assets/travel/spain-2024/barcelona-olympic-stadium.jpg",
            alt: "A football match at Barcelona's Olympic Stadium viewed from the stands",
            objectPosition: "center 62%",
          },
          {
            id: "barcelona-montjuic",
            src: "/fun-assets/travel/spain-2024/barcelona-montjuic.jpg",
            alt: "A traveller photographing the architecture at Montjuïc in Barcelona",
            objectPosition: "center 60%",
          },
          {
            id: "madrid-palace-gate",
            src: "/fun-assets/travel/spain-2024/madrid-palace-gate.jpg",
            alt: "An arched palace courtyard in Madrid viewed through an iron gate",
            objectPosition: "center 45%",
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
            id: "mallorca-sunset-beach",
            src: "/fun-assets/travel/spain-2024/mallorca-sunset-beach.jpg",
            alt: "A Mallorca beach and mountain coastline beneath a dusky sunset",
            objectPosition: "center center",
          },
          {
            id: "mallorca-countryside",
            src: "/fun-assets/travel/spain-2024/mallorca-countryside.jpg",
            alt: "Green Mallorca countryside beneath a wide clear blue sky",
            objectPosition: "center 72%",
          },
          {
            id: "mallorca-red-door-hillside",
            src: "/fun-assets/travel/spain-2024/mallorca-red-door-hillside.jpg",
            alt: "A stone hillside home with a red door in Mallorca",
            objectPosition: "center 65%",
          },
          {
            id: "madrid-plaza-mayor-night",
            src: "/fun-assets/travel/spain-2024/madrid-plaza-mayor-night.jpg",
            alt: "Friends walking through Madrid's Plaza Mayor at night",
            objectPosition: "center 55%",
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
          "Italy in winter brought together Rome's ancient layers, the energy of Naples, and the rituals that made each day memorable: espresso and pastries, pizza and wine, long dinners with friends, and football under the lights. From the Colosseum after dark to the view across Naples, the trip felt like history and everyday life constantly sharing the same streets.",
        stamp: {
          accent: "#c4573d",
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
            id: "vatican-st-peters-basilica",
            src: "/fun-assets/travel/italy-2025/vatican-st-peters-basilica.jpg",
            alt: "Statues lining the façade of Saint Peter's Basilica in Vatican City",
            objectPosition: "center 62%",
          },
          {
            id: "rome-stadio-olimpico-friends",
            src: "/fun-assets/travel/italy-2025/rome-stadio-olimpico-friends.jpg",
            alt: "Four friends together beside the pitch at Rome's Stadio Olimpico",
            objectPosition: "center 42%",
          },
          {
            id: "naples-city-view",
            src: "/fun-assets/travel/italy-2025/naples-city-view.jpg",
            alt: "A warm panoramic view across Naples and its coastline",
            objectPosition: "center 52%",
          },
          {
            id: "italy-dinner-with-friends",
            src: "/fun-assets/travel/italy-2025/dinner-with-friends.jpg",
            alt: "Friends gathered around a restaurant table for dinner in Italy",
            objectPosition: "center 42%",
          },
          {
            id: "rome-bookshop-portrait",
            src: "/fun-assets/travel/italy-2025/rome-bookshop-portrait.jpg",
            alt: "Reading an art book outside a bookshop in Rome",
            objectPosition: "center 35%",
          },
          {
            id: "rome-trevi-fountain",
            src: "/fun-assets/travel/italy-2025/rome-trevi-fountain.jpg",
            alt: "The ornate sculptures of the Trevi Fountain beneath a clear blue sky",
            objectPosition: "center 58%",
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
        ],
      },
    ],
  },
};
