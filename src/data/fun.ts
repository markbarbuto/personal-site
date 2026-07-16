import type { FunItem } from "../types/content";

export const funItems: FunItem[] = [
  {
    key: "gunners",
    decoration: {
      src: "/fun-assets/905-gunners/crest.png",
      alt: "",
    },
    title: "905 Gunners FC",
    tagline: "Founding Member",
    tint: "rgba(139, 121, 77, 0.13)",
    accent: "#6f613b",
    detail:
      "I am a co-founder of 905 Gunners FC, a soccer team founded in 2022 by a group of friends. The team is built around unity, healthy competition, and giving back. We participate in charity tournaments every year and hosted our first charity tournament in April 2026.",
    link: {
      label: "Follow 905 Gunners on Instagram",
      url: "https://www.instagram.com/905.gunners/",
    },
    feature: {
      teamCardDetail:
        "905 Gunners is a soccer team founded by a group of friends.",
      valuesCardDetail:
        "Our olive-and-beige jersey represents the values of our team.",
      tournamentCardDetail:
        "In April 2026, we hosted our first charity tournament.",
      summary:
        "905 Gunners FC started as a group of friends that joined a soccer league, but over time we became more like a family. We play hard, have fun, and enjoy showing up for one another. We also like designing our own jerseys.",
      charityDetail:
        "On April 5th, 2026, we hosted our first charity tournament in partnership with Human Appeal, raising over $1,000, and also participate in other charity tournaments every year. Proceeds supported food and assistance for families in Yemen and Gaza.",
      metrics: [
        // { value: "12", label: "teams" },
        { value: "150+", label: "attendees" },
        { value: "$1,000", label: "raised" },
      ],
      anchorImage: {
        src: "/fun-assets/905-gunners/team-anchor.jpg",
        alt: "905 Gunners team gathered in front of an indoor soccer goal at the April 2026 charity tournament",
        objectPosition: "center 46%",
      },
      detailHeaderImage: {
        src: "/fun-assets/905-gunners/jersey-front-detail.jpg",
        alt: "Close-up of the olive-and-beige 905 Gunners jersey showing its crest and olive-tree design",
        objectPosition: "center 15%",
      },
      teamImages: [
        {
          src: "/fun-assets/905-gunners/jersey-nape-detail.jpg",
          alt: "Back of the 905 Gunners jersey showing the inverted fishnet motif at the nape and olive-leaf collar trim",
          objectPosition: "center 48%",
        },
        {
          src: "/fun-assets/905-gunners/jersey-pair.jpg",
          alt: "Side-by-side full-body and upper-body portraits of 905 Gunners players wearing the olive-and-beige jersey",
          objectPosition: "center center",
        },
        {
          src: "/fun-assets/905-gunners/team-photo.jpg",
          alt: "905 Gunners players gathered together for a team photo",
          objectPosition: "85% 44%",
        },
        {
          src: "/fun-assets/905-gunners/behind-net.jpg",
          alt: "905 Gunners players seen together from behind the soccer net",
          objectPosition: "center 45%",
        },
      ],
      tournamentImages: [
        {
          src: "/fun-assets/905-gunners/tournament-table.jpg",
          alt: "905 Gunners charity tournament display with trophy, awards, and team merchandise",
          objectPosition: "center 48%",
        },
        {
          src: "/fun-assets/905-gunners/tournament-staff.png",
          alt: "905 Gunners charity tournament organizers and staff together on the indoor soccer field",
          objectPosition: "center 70%",
        },
        // {
        //   src: "/fun-assets/905-gunners/tournament-speaking.jpg",
        //   alt: "Two tournament organizers addressing attendees on the indoor soccer field",
        //   objectPosition: "center 38%",
        // },
        {
          src: "/fun-assets/905-gunners/tournament-celebration.jpg",
          alt: "Tournament champions celebrating together with the trophy",
          objectPosition: "center 48%",
        },
        {
          src: "/fun-assets/905-gunners/tournament-awards.jpg",
          alt: "Tournament organizers presenting prizes to a participant",
          objectPosition: "center 42%",
        },
        {
          src: "/fun-assets/905-gunners/tournament-trophy.jpg",
          alt: "Close-up of the 905 Gunners charity tournament champions trophy",
          objectPosition: "center 46%",
        },
      ],
    },
  },
  {
    key: "travel",
    icon: "✈️",
    title: "Travel",
    tagline: "Always planning the next trip",
    tint: "rgba(160,107,255,0.08)",
    accent: "#a06bff",
    detail:
      "There's almost always a next trip on my whiteboard. I like slow travel—renting a place for a couple of weeks, learning the neighbourhood coffee spot, and wandering without much of a plan. Recent favourites include long train journeys and anywhere with good food and worse WiFi.",
    link: null,
  },
  {
    key: "music",
    icon: "🎧",
    title: "Music",
    tagline: "Always something playing",
    tint: "rgba(255,138,92,0.09)",
    accent: "#ff8a5c",
    detail:
      "Music is the constant soundtrack to my day—deep-focus playlists while coding, something louder on the walk home. I'm always hunting for the next artist to obsess over, and I keep a running playlist of what I've had on repeat lately.",
    link: null,
  },
];
