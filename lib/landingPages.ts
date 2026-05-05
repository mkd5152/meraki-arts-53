export type LandingPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  meta: string;
  image: string;
  keywords: string[];
  summary: string;
  highlights: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedArtSlugs: string[];
};

export const landingPages: LandingPage[] = [
  {
    slug: "customized-gifts-pune",
    title: "Customized Gifts in Pune",
    description:
      "Personalized handmade gifts, birthday hampers, keepsakes, and theme-led custom decor for Pune, Chennai, and India shipping.",
    eyebrow: "Custom gifting",
    meta: "Pune requests",
    image: "/images/customized-gifts/customized-gift-detail-01-002.webp",
    keywords: [
      "customized gifts in Pune",
      "personalized gifts Pune",
      "handmade gifts Pune",
      "birthday hampers Pune",
      "customized gifts Dubai"
    ],
    summary:
      "For Pune gift requests, Meraki Arts 53 shapes handmade pieces around the person, occasion, color story, timeline, and budget range. The best inquiries include the recipient, theme, deadline, and whether the gift needs local handover or India shipping.",
    highlights: [
      "Birthday hampers and handmade surprise boxes",
      "Anniversary keepsakes and memory-led decor",
      "Name, date, theme, color, and message personalization",
      "Shippable gift concepts where packing is practical"
    ],
    sections: [
      {
        title: "What to share",
        body:
          "Send the occasion, recipient details, preferred colors, budget range, deadline, and any references. This helps shape a gift that is realistic to make and easy to quote."
      },
      {
        title: "Pricing and timing",
        body:
          "Pricing depends on size, material, personalization, quantity, packaging, and deadline. Smaller gifts usually need less planning time than hampers, event details, or quantity-led requests."
      },
      {
        title: "Delivery",
        body:
          "Pune requests can be discussed for local coordination. Shippable handmade gifts can be planned for India delivery when the piece is suitable for packing."
      }
    ],
    faqs: [
      {
        question: "Can I order a custom gift without a full idea?",
        answer:
          "Yes. A rough occasion, recipient profile, budget range, and deadline are enough to begin."
      },
      {
        question: "Can gifts be shipped across India?",
        answer:
          "Shippable gifts can be discussed for India delivery. Fragile or oversized concepts are confirmed case by case."
      }
    ],
    relatedArtSlugs: ["customized-gifts", "chenille-craft", "lamasa"]
  },
  {
    slug: "customized-gifts-chennai",
    title: "Customized Gifts in Chennai",
    description:
      "Custom handmade gifts, personalized keepsakes, birthday decor, and thoughtful handmade presents for Chennai and India shipping.",
    eyebrow: "Custom gifting",
    meta: "Chennai requests",
    image: "/images/customized-gifts/customized-gift-detail-06-001.webp",
    keywords: [
      "customized gifts in Chennai",
      "personalized gifts Chennai",
      "handmade gifts Chennai",
      "custom birthday gifts Chennai",
      "customized gifts Dubai"
    ],
    summary:
      "Chennai-focused custom gift requests can include birthday hampers, keepsake pieces, handmade decor, favor sets, name-led details, and theme-led handmade surprises.",
    highlights: [
      "Custom birthday and anniversary gifts",
      "Keepsakes with names, dates, photos, or messages",
      "Theme-led favor pieces and small event details",
      "Handmade decor gifts with India shipping options"
    ],
    sections: [
      {
        title: "Best-fit requests",
        body:
          "Custom gifting works best when the piece has a clear occasion, recipient story, theme, or display purpose."
      },
      {
        title: "Quote details",
        body:
          "Share size, quantity, deadline, budget range, and personalization text before the quote is finalized."
      },
      {
        title: "Planning for shipping",
        body:
          "If the gift needs to travel, the concept is planned around safer materials, secure packing, and practical dimensions."
      }
    ],
    faqs: [
      {
        question: "Can you make gifts for birthdays and anniversaries?",
        answer:
          "Yes. Birthday, anniversary, festive, milestone, and personal keepsake requests can all be discussed."
      },
      {
        question: "Do you handle bulk or favor-style gifts?",
        answer:
          "Quantity requests can be scoped after the count, theme, budget range, and date are clear."
      }
    ],
    relatedArtSlugs: ["customized-gifts", "outline-art", "paintings"]
  },
  {
    slug: "personalized-handmade-gifts-india",
    title: "Personalized Handmade Gifts in India",
    description:
      "Personalized handmade gifts, keepsakes, decor pieces, hampers, and custom craft requests with Pune, Chennai, and India shipping focus.",
    eyebrow: "India shipping",
    meta: "Personalized gifts",
    image: "/images/customized-gifts/customized-gift-detail-10-001.webp",
    keywords: [
      "personalized handmade gifts India",
      "handmade gifts India",
      "custom keepsake gifts India",
      "personalized gifts online India",
      "personalized gifts Dubai"
    ],
    summary:
      "This page is for people searching beyond one city: handmade gifts that can be personalized, packed carefully, and shipped within India when the concept is suitable.",
    highlights: [
      "Names, dates, notes, colors, themes, and memory details",
      "Keepsakes, hampers, craft decor, and small handmade sets",
      "Gift planning by occasion and budget range",
      "India shipping considered before the design is finalized"
    ],
    sections: [
      {
        title: "How personalization works",
        body:
          "Personalization can include names, dates, message cards, color palettes, theme details, recipient interests, or small symbolic references."
      },
      {
        title: "Shipping-safe planning",
        body:
          "Not every handmade concept ships equally well, so material and size choices are made with packing and delivery in mind."
      },
      {
        title: "Good occasions",
        body:
          "Birthday, anniversary, festive gifting, housewarming, teacher appreciation, milestones, and memory-led gifts are all strong fits."
      }
    ],
    faqs: [
      {
        question: "Can I ask for ideas within a budget?",
        answer:
          "Yes. Sharing a budget range helps choose a suitable format, material, and level of detail."
      },
      {
        question: "Can every handmade gift be shipped?",
        answer:
          "No. Shipping depends on size, material, fragility, and deadline, so it is confirmed before making."
      }
    ],
    relatedArtSlugs: ["customized-gifts", "chenille-craft", "lamasa", "paintings"]
  },
  {
    slug: "handmade-gifts-chennai",
    title: "Handmade Gifts in Chennai",
    description:
      "Handmade gifts, custom keepsakes, personalized craft decor, and thoughtful gift pieces for Chennai and India shipping.",
    eyebrow: "Handmade gifts",
    meta: "Chennai gifting",
    image: "/images/customized-gifts/customized-gift-detail-12-001.webp",
    keywords: [
      "handmade gifts Chennai",
      "custom handmade gifts Chennai",
      "personalized handmade gifts Chennai",
      "gift decor Chennai",
      "handmade gifts Dubai"
    ],
    summary:
      "Handmade gifts are strongest when they feel specific: a recipient, a moment, a color story, or a small personal detail that cannot be found in a ready-made product.",
    highlights: [
      "Small handmade keepsakes and decor pieces",
      "Personalized craft gifts for birthdays and milestones",
      "Custom color and theme direction",
      "India shipping for suitable pieces"
    ],
    sections: [
      {
        title: "Gift types",
        body:
          "Requests can include keepsake frames, mini decor, handmade hampers, favor pieces, chenille florals, lamasa decor, and painted details."
      },
      {
        title: "Useful details",
        body:
          "Share the recipient, occasion, favorite colors, message, timeline, budget range, and any reference photos."
      },
      {
        title: "Quote basis",
        body:
          "Quotes depend on material, size, detail, personalization, packaging, quantity, and whether shipping is needed."
      }
    ],
    faqs: [
      {
        question: "Can the gift be completely custom?",
        answer:
          "Yes. Fully custom ideas can be scoped once the occasion, timeline, and budget range are clear."
      },
      {
        question: "Can I request gift wrapping or presentation?",
        answer:
          "Presentation can be discussed as part of the quote when the final format is confirmed."
      }
    ],
    relatedArtSlugs: ["customized-gifts", "chenille-craft", "outline-art"]
  },
  {
    slug: "texture-art-wall-decor-india",
    title: "Texture Art Wall Decor in India",
    description:
      "Layered texture art, floral relief panels, and custom handmade wall decor for Pune, Chennai, and India shipping.",
    eyebrow: "Wall decor",
    meta: "Texture art",
    image: "/images/texture-art/texture-art-gilded-bloom-04.webp",
    keywords: [
      "texture art wall decor India",
      "texture art Pune",
      "texture art Chennai",
      "custom textured wall art India",
      "texture art Dubai"
    ],
    summary:
      "Texture art is a strong fit for housewarming gifts, styled corners, feature walls, and personal wall decor when the piece needs depth, tactility, and a handmade finish.",
    highlights: [
      "Raised floral and relief-led texture panels",
      "Color-led pieces for homes and styled spaces",
      "Custom sizing and palette direction",
      "Shipping considered before final size is confirmed"
    ],
    sections: [
      {
        title: "Best use cases",
        body:
          "Texture art works well for living rooms, bedrooms, entry corners, small feature walls, shelves, and housewarming gifts."
      },
      {
        title: "Quote basis",
        body:
          "Quotes depend on canvas size, relief depth, detail level, materials, framing, finish, and shipping needs."
      },
      {
        title: "What to send",
        body:
          "Share wall photos, approximate size, color palette, room mood, and reference images."
      }
    ],
    faqs: [
      {
        question: "Can texture art match my home colors?",
        answer:
          "Yes. Room photos and palette references help plan a piece that suits the space."
      },
      {
        question: "Is texture art shippable?",
        answer:
          "Many smaller and medium pieces can be shipped, but size and fragility are confirmed before making."
      }
    ],
    relatedArtSlugs: ["texture-art", "paintings", "terrazzo"]
  },
  {
    slug: "housewarming-gifts-india",
    title: "Housewarming Gifts in India",
    description:
      "Handmade housewarming gifts, texture art, terrazzo-style decor, custom trays, and personalized home accents with India shipping focus.",
    eyebrow: "Housewarming",
    meta: "India shipping",
    image: "/images/terrazzo/terrazzo-marbled-gold-tray-01.webp",
    keywords: [
      "housewarming gifts India",
      "handmade housewarming gifts",
      "custom decor gifts India",
      "terrazzo decor gifts India",
      "housewarming gifts Dubai"
    ],
    summary:
      "Housewarming gifts work best when they are display-ready, personal enough to feel considered, and practical enough to sit naturally in a new home.",
    highlights: [
      "Texture art panels and wall decor",
      "Terrazzo-inspired trays and small decor objects",
      "Lamasa decor, trinket pieces, and shelf accents",
      "Personalized details for homes and milestones"
    ],
    sections: [
      {
        title: "Gift directions",
        body:
          "Good directions include texture panels, trays, shelf decor, mini wall hangings, personalized plaques, and small display-ready pieces."
      },
      {
        title: "Planning details",
        body:
          "Share the recipient's home style, colors, timeline, budget range, and whether shipping is required."
      },
      {
        title: "Shipping fit",
        body:
          "Housewarming pieces are planned around packing safety, size, and material durability when India shipping is needed."
      }
    ],
    faqs: [
      {
        question: "Can a housewarming gift be personalized?",
        answer:
          "Yes. Names, dates, home-related motifs, colors, and messages can be included where suitable."
      },
      {
        question: "Which pieces are easiest to ship?",
        answer:
          "Smaller trays, panels, keepsakes, and compact decor objects are usually easier to pack than large or fragile pieces."
      }
    ],
    relatedArtSlugs: ["terrazzo", "texture-art", "lamasa", "customized-gifts"]
  }
];

export const getLandingPageBySlug = (slug: string) =>
  landingPages.find((page) => page.slug === slug);
