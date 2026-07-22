import type { GunnersFunItem } from "../../types/fun";

export const gunnersFunItem: GunnersFunItem = {
  key: "gunners",
  decoration: {
    src: "/fun-assets/905-gunners/crest.png",
    alt: "",
  },
  title: "905 Gunners FC",
  tagline: "Founding Member",
  tint: "rgba(0, 107, 54, 0.18)",
  accent: "#006b36",
  detail:
    "I am a co-founder of 905 Gunners FC, a soccer team founded in 2022 by a group of friends. Our team is built around unity, healthy competition, and giving back. We participate in charity tournaments every year and hosted our first charity tournament in April 2026.",
  actions: [
    {
      label: "Follow 905 Gunners on Instagram",
      url: "https://www.instagram.com/905.gunners/",
    },
  ],
  feature: {
    type: "905-gunners",
    previewImage: {
      src: "/fun-assets/905-gunners/team-anchor.jpg",
      alt: "905 Gunners team gathered in front of an indoor soccer goal at the April 2026 charity tournament",
      objectPosition: "center 46%",
    },
    headerImage: {
      src: "/fun-assets/905-gunners/jersey-front-detail.jpg",
      alt: "Close-up of the olive-and-beige 905 Gunners jersey showing its crest and olive-tree design",
      objectPosition: "center 15%",
    },
    cards: [
      {
        id: "team",
        title: "The team",
        body: "905 Gunners is a soccer team founded by a group of friends.",
        chips: [{ label: "Est. 2022" }],
        backgroundImage: {
          src: "/fun-assets/905-gunners/crest.png",
          alt: "",
        },
      },
      {
        id: "values",
        title: "Our values",
        body: "Our olive-and-beige jersey represents the values of our team.",
        chips: [{ label: "Unity" }, { label: "Resilience" }, { label: "Fairness" }],
        backgroundImage: {
          src: "/fun-assets/905-gunners/values-olive-tree.png",
          alt: "",
        },
      },
      {
        id: "tournament",
        title: "Hosting charity tournaments",
        body: "In April 2026, we hosted our first charity tournament.",
        chips: [
          { value: "150+", label: "attendees" },
          { value: "$1,000", label: "raised" },
        ],
        backgroundImage: {
          src: "/fun-assets/905-gunners/hosting-trophy.png",
          alt: "",
        },
      },
    ],
    sections: [
      {
        id: "team",
        title: "Our team",
        body: "905 Gunners FC started as a group of friends that joined a soccer league, but over time we became more like a family. We play hard, have fun, and enjoy showing up for one another. We also like designing our own jerseys.",
        images: [
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
      },
      {
        id: "tournaments",
        title: "Charity tournaments and giving back",
        body: "On April 5th, 2026, we hosted our first charity tournament in partnership with Human Appeal, raising over $1,000, and also participate in other charity tournaments every year. Proceeds supported food and assistance for families in Yemen and Gaza.",
        images: [
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
    ],
  },
};
