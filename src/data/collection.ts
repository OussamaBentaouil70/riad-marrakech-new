import { buyoutImages, eventImages, experienceImages, riadGalleryImages, riadImages } from "./images";

export interface Riad {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
  highlights: string[];
  idealFor: string;
  imagePosition?: string;
  gallery: RiadImage[];
}

export interface RiadImage {
  src: string;
  alt: string;
}

// WhatsApp business number in international format, digits only.
// Given as 0728585823 → +212 728 585 823 (Morocco); wa.me needs the country code, no leading zero.
export const whatsappBusinessNumber = "212728585823";

export const whatsappLink = (message: string) =>
  `https://wa.me/${whatsappBusinessNumber}?text=${encodeURIComponent(message)}`;

const gallery = (id: string, cover: RiadImage, captions: string[]): RiadImage[] => [
  cover,
  ...riadGalleryImages[id].map((src, index) => ({ src, alt: captions[index] })),
];

const riadGallery = {
  almaha: gallery(
    "almaha",
    { src: riadImages.almaha, alt: "Almaha Marrakech, a warm Moroccan riad interior" },
    [
      "A rooftop table set for two beneath woven lanterns",
      "A cushioned rooftop terrace above the medina",
      "A candlelit dining room dressed with dark drapes",
      "The candlelit hammam around a marble plunge pool",
    ],
  ),
  noa: gallery(
    "riad-noa",
    { src: riadImages["riad-noa"], alt: "Riad Noa Marrakech, private riad interiors" },
    [
      "Wicker chairs beside the courtyard pool",
      "The white courtyard and its pool, rising through arched galleries",
      "A plastered salon with carved niches and low seating",
      "The courtyard glowing at dusk",
    ],
  ),
  ziri: gallery(
    "maison-ziri",
    { src: riadImages["maison-ziri"], alt: "Maison Ziri's courtyard patio" },
    [
      "The green zellige courtyard and its quiet pool",
      "A serene suite with hand-laid zellige floors",
      "The rooftop terrace, shaded tables above the medina",
      "The brass Maison Ziri plaque beside a mint-green door",
    ],
  ),
  nelia: gallery(
    "nelia-marrakech",
    { src: riadImages["nelia-marrakech"], alt: "Riad Marrakech, an atmospheric riad in the medina" },
    [
      "Guests toasting with fresh juices on the rooftop",
      "A quiet moment in the green-tiled courtyard pool",
      "A calm bedroom set within a sunlit alcove",
      "Slow afternoons by the courtyard pool",
    ],
  ),
};

export const riads: Riad[] = [
  {
    id: "almaha",
    name: "Almaha Marrakech",
    category: "Luxury Boutique Riad",
    location: "Kasbah District",
    image: riadImages.almaha,
    description:
      "An elegant retreat designed by architect Charles Kaisin, Almaha Marrakech combines artistic interiors, Moroccan heritage, and contemporary luxury in the historic Kasbah.",
    highlights: ["13 rooms & suites", "Heated pool & Bidaya rooftop bar", "Refined dining & traditional spa"],
    idealFor: "Intimate weddings, engagement parties, milestone birthdays, and luxury private dinners.",
    imagePosition: "center 55%",
    gallery: riadGallery.almaha,
  },
  {
    id: "riad-noa",
    name: "Riad Noa Marrakech",
    category: "Private Luxury Riad",
    location: "Marrakech Medina",
    image: riadImages["riad-noa"],
    description:
      "Located in the heart of the historic Medina, Riad Noa blends traditional Moroccan craftsmanship with the comfort of a private luxury residence.",
    highlights: ["8 suites · up to 16 guests", "Two pools · living & dining rooms", "Equipped kitchen · rooftop views"],
    idealFor: "Private birthdays, bachelorette celebrations, intimate proposals, and family gatherings.",
    imagePosition: "center 53%",
    gallery: riadGallery.noa,
  },
  {
    id: "maison-ziri",
    name: "Maison Ziri",
    category: "Boutique Heritage Riad",
    location: "Marrakech Medina",
    image: riadImages["maison-ziri"],
    description:
      "An intimate sanctuary where Moroccan craftsmanship meets understated luxury, with hand-carved cedar, traditional zellige, and carefully considered interiors.",
    highlights: ["8 rooms & suites", "Heated courtyard pool & private hammam", "Rooftop dining & convenient car access"],
    idealFor: "Intimate celebrations, wellness retreats, romantic dinners, and private culinary experiences.",
    imagePosition: "center 57%",
    gallery: riadGallery.ziri,
  },
  {
    id: "nelia-marrakech",
    name: "Riad Marrakech",
    category: "Moroccan Riad Collection",
    location: "Marrakech Medina",
    image: riadImages["nelia-marrakech"],
    description:
      "Discover authentic Moroccan hospitality across a collection of four riads in the historic Medina, each with traditional architecture and its own sense of calm.",
    highlights: ["A collection of four riads", "Elegant rooms & peaceful courtyards", "Rooftop terraces under Marrakech skies"],
    idealFor: "Marriage proposals, birthdays, private dinners, cultural experiences, and intimate weddings.",
    imagePosition: "center 55%",
    gallery: riadGallery.nelia,
  },
];

export interface EventOccasion {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const eventOccasions: EventOccasion[] = [
  {
    title: "Intimate Weddings",
    description: "Celebrate your love with an elegant, personal wedding in an authentic Moroccan setting.",
    image: eventImages["Intimate Weddings"],
    imageAlt: "Newlyweds sharing a moment beneath a floral arch",
  },
  {
    title: "Birthday Parties",
    description: "From an intimate dinner to a milestone gathering, make the day your own.",
    image: eventImages["Birthday Parties"],
    imageAlt: "Friends celebrating a birthday together",
  },
  {
    title: "Marriage Proposals",
    description: "A thoughtful surprise with bespoke decor, a romantic setting, and discreet coordination.",
    image: eventImages["Marriage Proposals"],
    imageAlt: "A couple sharing a quiet, romantic moment",
  },
  {
    title: "Engagement Parties",
    description: "Bring your favourite people together for a celebration that feels close and considered.",
    image: eventImages["Engagement Parties"],
    imageAlt: "Flowers arranged for a celebration table",
  },
  {
    title: "Private Dinner Parties",
    description: "Curated menus, beautiful table styling, and a table set just for your gathering.",
    image: eventImages["Private Dinner Parties"],
    imageAlt: "A romantic private dining setting in warm evening light",
  },
  {
    title: "Bachelor & Bachelorette Parties",
    description: "Celebrate together with a private stay, restorative rituals, and plans shaped around you.",
    image: eventImages["Bachelor & Bachelorette Parties"],
    imageAlt: "Friends sharing wine and dinner together",
  },
  {
    title: "Honeymoon Celebrations",
    description: "A romantic escape with private dining, slow mornings, and memorable moments for two.",
    image: eventImages["Honeymoon Celebrations"],
    imageAlt: "A romantic room dressed with flower petals",
  },
  {
    title: "Romantic Rooftop Dinners",
    description: "Dine under the Marrakech sky with considered styling and views over the medina.",
    image: eventImages["Romantic Rooftop Dinners"],
    imageAlt: "Candles and flowers arranged for an intimate dinner",
  },
  {
    title: "Wellness & Yoga Retreats",
    description: "Reconnect with yoga, hammam rituals, spa treatments, and nourishing experiences.",
    image: eventImages["Wellness & Yoga Retreats"],
    imageAlt: "A morning yoga practice on a quiet rooftop",
  },
  {
    title: "Private Cooking Experiences",
    description: "Explore Moroccan flavours through hands-on workshops and traditional recipes.",
    image: eventImages["Private Cooking Experiences"],
    imageAlt: "A freshly prepared Moroccan tagine",
  },
  {
    title: "Business Meetings & Workshops",
    description: "Gather for an executive retreat, creative session, or meeting in a distinctive setting.",
    image: eventImages["Business Meetings & Workshops"],
    imageAlt: "A richly decorated Moroccan salon prepared for a gathering",
  },
  {
    title: "Fashion Shows & Photoshoots",
    description: "Bring a creative vision to life against the timeless architecture of Marrakech.",
    image: eventImages["Fashion Shows & Photoshoots"],
    imageAlt: "A fashion portrait in colorful Moroccan-inspired attire",
  },
];

export interface MarrakechExperience {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const marrakechExperiences: MarrakechExperience[] = [
  {
    title: "Explore Marrakech",
    description: "Historic palaces, hidden medina corners, beautiful gardens, and a personal itinerary.",
    image: experienceImages["Explore Marrakech"],
    imageAlt: "A colorful alley in a Marrakech medina market",
  },
  {
    title: "Cooking Classes & Culinary Workshops",
    description: "Learn the secrets of tagines, couscous, fresh bread, and traditional Moroccan pastries.",
    image: experienceImages["Cooking Classes & Culinary Workshops"],
    imageAlt: "A Moroccan tagine prepared with fresh herbs",
  },
  {
    title: "Private Shopping in the Medina",
    description: "Find artisan boutiques, handmade ceramics, carpets, leather goods, and local treasures.",
    image: experienceImages["Private Shopping in the Medina"],
    imageAlt: "A vendor at a colorful Moroccan spice market",
  },
  {
    title: "Pottery & Moroccan Craft Workshops",
    description: "Try traditional craft with local makers and take home something made by your own hands.",
    image: experienceImages["Pottery & Moroccan Craft Workshops"],
    imageAlt: "A potter shaping clay on a pottery wheel",
  },
  {
    title: "Hot Air Balloon at Sunrise",
    description: "Rise above the city and its surrounding landscapes as the first light reaches the Atlas.",
    image: experienceImages["Hot Air Balloon at Sunrise"],
    imageAlt: "Hot air balloons floating above an arid landscape at sunrise",
  },
  {
    title: "Quad Biking Adventures",
    description: "Set out across rugged desert landscapes and open trails beyond the city.",
    image: experienceImages["Quad Biking Adventures"],
    imageAlt: "All-terrain vehicles crossing a wide desert landscape",
  },
  {
    title: "Sunset Camel Rides",
    description: "Take in the landscape at golden hour on a gentle, unhurried camel ride.",
    image: experienceImages["Sunset Camel Rides"],
    imageAlt: "A camel and rider looking across desert sands at sunset",
  },
  {
    title: "Agafay Desert Experiences",
    description: "Arrange sunset aperitifs, private dining, and evenings beneath the desert sky.",
    image: experienceImages["Agafay Desert Experiences"],
    imageAlt: "A lantern-lit desert camp with cushions and tents",
  },
  {
    title: "Private Rooftop Yoga",
    description: "Begin the day with a private yoga session in the quiet of a Marrakech rooftop.",
    image: experienceImages["Private Rooftop Yoga"],
    imageAlt: "A morning yoga practice overlooking a city rooftop",
  },
];

export const buyoutBenefits = [
  {
    title: "Complete Privacy",
    description: "Enjoy exclusive use of the property and its agreed facilities.",
    image: buyoutImages["Complete Privacy"],
    imageAlt: "A private riad courtyard with a pool, lounge seating, and green zellige arches",
  },
  {
    title: "Stay Together",
    description: "Host your guests in beautiful on-site accommodation.",
    image: buyoutImages["Stay Together"],
    imageAlt: "Guests staying together in a traditional Moroccan riad",
  },
  {
    title: "Tailored Celebrations",
    description: "Shape dining, styling, and entertainment around your occasion.",
    image: buyoutImages["Tailored Celebrations"],
    imageAlt: "A tailored celebration setting styled inside a Marrakech riad",
  },
  {
    title: "Seamless Planning",
    description: "From venue selection to coordination, we help manage the details.",
    image: buyoutImages["Seamless Planning"],
    imageAlt: "A considered riad setting arranged ahead of a private event",
  },
];

export const planningSteps = [
  {
    title: "Discover Your Perfect Riad",
    description: "Share your dates, guest count, event type, and preferences. We will help identify suitable properties.",
  },
  {
    title: "Personalize Your Experience",
    description: "Shape floral styling, private dining, entertainment, activities, and guest experiences around your vision.",
  },
  {
    title: "Plan Every Detail",
    description: "We coordinate the agreed services, suppliers, event schedule, and practical arrangements.",
  },
  {
    title: "Celebrate & Enjoy",
    description: "Relax into your time in Marrakech while we oversee the details of your occasion.",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "Can I rent an entire riad exclusively for my event?",
    a: "Yes. Exclusive riad buyouts can be arranged at participating properties, subject to availability and each venue's policies. A buyout can offer an intimate, private setting for both your event and your stay.",
  },
  {
    q: "Can I organize an intimate wedding in a Marrakech riad?",
    a: "Absolutely. Riads can provide beautiful settings for intimate wedding celebrations, ceremonies, and private receptions. Guest capacity and permitted activities depend on the selected venue.",
  },
  {
    q: "Can my guests stay overnight at the riad?",
    a: "Many riads offer on-site accommodation. The number of overnight guests depends on the rooms, bedding arrangements, and confirmed property capacity.",
  },
  {
    q: "Can I host a birthday party or marriage proposal in a private riad?",
    a: "Yes. We can help arrange birthdays, romantic proposals, engagement parties, and private dinners, including decor, dining, photography, and entertainment where permitted by the venue.",
  },
  {
    q: "Can I organize a yoga or wellness retreat in Marrakech?",
    a: "Yes. Selected riads offer peaceful settings for private yoga, wellness activities, and retreats. Additional services may include hammam rituals, massages, and healthy dining.",
  },
  {
    q: "Can you organize activities outside the riad?",
    a: "Yes. We can help incorporate Moroccan cooking classes, medina tours, pottery workshops, hot-air balloon flights, quad biking, and Agafay Desert excursions into your itinerary.",
  },
  {
    q: "How much does a private riad buyout in Marrakech cost?",
    a: "Prices vary with the property, season, dates, number of nights, guest count, and requested services. Share your plans and we will prepare a tailored quotation for you.",
  },
];

export interface EventInquiry {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  preferredRiad: string;
  message: string;
}

export const eventTypeOptions = [
  "Intimate wedding",
  "Birthday party",
  "Marriage proposal",
  "Engagement party",
  "Private dinner party",
  "Bachelor or bachelorette party",
  "Honeymoon celebration",
  "Romantic rooftop dinner",
  "Wellness or yoga retreat",
  "Private cooking experience",
  "Business meeting or workshop",
  "Fashion show or photoshoot",
  "Other / bespoke event",
];

export const defaultEventInquiry = (): EventInquiry => ({
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  guestCount: "",
  preferredRiad: "",
  message: "",
});

export const formatEventDate = (iso: string) => {
  if (!iso) return "Date to be confirmed";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const navLinks = [
  { label: "Buyouts", href: "#buyouts" },
  { label: "The riads", href: "#riads" },
  { label: "Events", href: "#events" },
  { label: "Experiences", href: "#experiences" },
  { label: "Approach", href: "#approach" },
  { label: "FAQ", href: "#faq" },
];