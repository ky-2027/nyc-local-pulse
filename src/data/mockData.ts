export interface ItineraryStop {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'shop' | 'park' | 'bar' | 'cultural' | 'walk';
  neighborhood: string;
  description: string;
  localTip: string;
  time: string;
  duration: string;
  safetyScore: 'safe' | 'caution' | 'warning';
  vibes: string[];
  transport: string;
  address: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  theme: string;
  stops: ItineraryStop[];
}

export interface SafetyIncident {
  id: string;
  type: string;
  location: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  lat: number;
  lng: number;
}

export const mockItinerary: DayItinerary[] = [
  {
    day: 1,
    date: "Monday, March 3",
    theme: "West Village & SoHo — Cafes, Vintage & Village Streets",
    stops: [
      {
        id: "1a",
        name: "Buvette",
        type: "cafe",
        neighborhood: "West Village",
        description: "Tiny, beloved French-inspired gastrette on Grove Street. Locals line up for the croque monsieur and house granola.",
        localTip: "Go before 9am to skip the line. Sit at the bar for faster service.",
        time: "8:30 AM",
        duration: "45 min",
        safetyScore: "safe",
        vibes: ["cozy", "busy"],
        transport: "Walk from hotel",
        address: "42 Grove St"
      },
      {
        id: "1b",
        name: "Bleecker Street Walk",
        type: "walk",
        neighborhood: "West Village",
        description: "Stroll down one of NYC's most charming streets. Independent bookshops, Italian delis, and neighborhood characters.",
        localTip: "Pop into Murray's Cheese for a free sample. Cross over to Perry Street for beautiful townhouses.",
        time: "9:30 AM",
        duration: "40 min",
        safetyScore: "safe",
        vibes: ["quiet", "residential"],
        transport: "Walk",
        address: "Bleecker St"
      },
      {
        id: "1c",
        name: "Saturdays NYC",
        type: "shop",
        neighborhood: "SoHo",
        description: "Surf-inspired concept store with a hidden garden café. Browse curated menswear and vintage boards.",
        localTip: "Get a cortado in their backyard — one of SoHo's best kept secrets.",
        time: "10:30 AM",
        duration: "30 min",
        safetyScore: "safe",
        vibes: ["relaxed", "trendy"],
        transport: "10 min walk",
        address: "31 Crosby St"
      },
      {
        id: "1d",
        name: "Prince Street Pizza",
        type: "restaurant",
        neighborhood: "SoHo",
        description: "Legendary Sicilian square slice with pepperoni cups that crisp up perfectly. Cash only, always a line.",
        localTip: "Order the pepperoni square — it's the only move. Line moves fast.",
        time: "12:30 PM",
        duration: "20 min",
        safetyScore: "safe",
        vibes: ["busy", "lively"],
        transport: "Walk",
        address: "27 Prince St"
      },
      {
        id: "1e",
        name: "Housing Works Bookstore Cafe",
        type: "cultural",
        neighborhood: "SoHo",
        description: "Stunning volunteer-run bookshop in a historic building. All proceeds support HIV/AIDS services.",
        localTip: "Check their event calendar — they host incredible author talks and live music.",
        time: "2:00 PM",
        duration: "45 min",
        safetyScore: "safe",
        vibes: ["quiet", "cultural"],
        transport: "5 min walk",
        address: "126 Crosby St"
      },
      {
        id: "1f",
        name: "Dante",
        type: "bar",
        neighborhood: "Greenwich Village",
        description: "Regularly voted one of the world's best bars. Their Negroni variations are legendary among locals.",
        localTip: "Come at 5pm for golden hour on MacDougal. Order the Garibaldi — simple but perfect.",
        time: "5:30 PM",
        duration: "1 hr",
        safetyScore: "safe",
        vibes: ["lively", "nightlife"],
        transport: "Walk",
        address: "79-81 MacDougal St"
      }
    ]
  },
  {
    day: 2,
    date: "Tuesday, March 4",
    theme: "Lower East Side & Williamsburg — Food, Art & Night Out",
    stops: [
      {
        id: "2a",
        name: "Russ & Daughters Cafe",
        type: "restaurant",
        neighborhood: "Lower East Side",
        description: "Fourth-generation appetizing shop since 1914. The lox, eggs, and onions are a NYC institution.",
        localTip: "The café on Orchard has shorter waits than the original Houston St shop.",
        time: "9:00 AM",
        duration: "50 min",
        safetyScore: "safe",
        vibes: ["busy", "cultural"],
        transport: "Subway F to Delancey",
        address: "127 Orchard St"
      },
      {
        id: "2b",
        name: "Dimes Square Walk",
        type: "walk",
        neighborhood: "Lower East Side",
        description: "The micro-neighborhood that's become a creative epicenter. Galleries, vintage shops, and coffee spots.",
        localTip: "Check out Café Forgot for natural wine and Canal Street Market for local designers.",
        time: "10:15 AM",
        duration: "45 min",
        safetyScore: "caution",
        vibes: ["trendy", "busy"],
        transport: "Walk",
        address: "Canal & Division St"
      },
      {
        id: "2c",
        name: "Artists & Fleas",
        type: "shop",
        neighborhood: "Williamsburg",
        description: "Curated indoor market with local makers — jewelry, vintage clothing, prints, and handmade goods.",
        localTip: "Best on weekends but weekdays are calmer. Grab a taco from the stand outside.",
        time: "12:30 PM",
        duration: "1 hr",
        safetyScore: "safe",
        vibes: ["relaxed", "trendy"],
        transport: "L train to Bedford Ave",
        address: "70 N 7th St"
      },
      {
        id: "2d",
        name: "Domino Park",
        type: "park",
        neighborhood: "Williamsburg",
        description: "Waterfront park with stunning Manhattan skyline views. Built on the old Domino Sugar refinery site.",
        localTip: "Walk south along the water to the new Williamsburg waterfront — spectacular at sunset.",
        time: "4:00 PM",
        duration: "45 min",
        safetyScore: "safe",
        vibes: ["relaxed", "scenic"],
        transport: "15 min walk",
        address: "15 River St"
      },
      {
        id: "2e",
        name: "Win Son",
        type: "restaurant",
        neighborhood: "Williamsburg",
        description: "Taiwanese-American cooking that's become a Brooklyn staple. The three cup chicken is unforgettable.",
        localTip: "Make a reservation or come early. Try the fly's head and a natural wine from their curated list.",
        time: "7:00 PM",
        duration: "1.5 hr",
        safetyScore: "safe",
        vibes: ["lively", "trendy"],
        transport: "Walk",
        address: "159 Graham Ave"
      }
    ]
  },
  {
    day: 3,
    date: "Wednesday, March 5",
    theme: "Harlem & Upper Manhattan — Soul Food, Jazz & History",
    stops: [
      {
        id: "3a",
        name: "Red Rooster",
        type: "restaurant",
        neighborhood: "Harlem",
        description: "Marcus Samuelsson's celebration of Harlem's diverse food culture. Brunch is a neighborhood event.",
        localTip: "Come for weekday brunch — less crowded, same incredible cornbread and shrimp & grits.",
        time: "10:00 AM",
        duration: "1 hr",
        safetyScore: "safe",
        vibes: ["lively", "cultural"],
        transport: "2/3 train to 125th",
        address: "310 Lenox Ave"
      },
      {
        id: "3b",
        name: "Lenox Avenue & 125th St Walk",
        type: "walk",
        neighborhood: "Harlem",
        description: "Walk the cultural heart of Black America. Historic churches, Apollo Theater, and neighborhood landmarks.",
        localTip: "Step into Sylvia's for a quick look — the original soul food restaurant. Walk west to see beautiful brownstones.",
        time: "11:30 AM",
        duration: "45 min",
        safetyScore: "caution",
        vibes: ["busy", "cultural"],
        transport: "Walk",
        address: "Lenox Ave"
      },
      {
        id: "3c",
        name: "The Cloisters",
        type: "cultural",
        neighborhood: "Washington Heights",
        description: "Medieval art museum in Fort Tryon Park. Feels like you've left NYC entirely. Stunning Hudson views.",
        localTip: "This is a Met Museum branch — your Met ticket works here. The herb garden is magical.",
        time: "1:30 PM",
        duration: "2 hr",
        safetyScore: "safe",
        vibes: ["quiet", "scenic"],
        transport: "A train to 190th",
        address: "99 Margaret Corbin Dr"
      },
      {
        id: "3d",
        name: "Silvana",
        type: "bar",
        neighborhood: "Harlem",
        description: "Middle Eastern café upstairs, live music venue downstairs. DJs, jazz, and neighborhood regulars.",
        localTip: "Check their schedule — they have incredible free live shows most nights. Great hummus too.",
        time: "8:00 PM",
        duration: "2 hr",
        safetyScore: "caution",
        vibes: ["nightlife", "lively"],
        transport: "Taxi recommended after 10pm",
        address: "300 W 116th St"
      }
    ]
  }
];

export const mockSafetyIncidents: SafetyIncident[] = [
  { id: "s1", type: "Theft", location: "Times Square, Midtown", time: "2 hours ago", severity: "low", description: "Pickpocketing reported near subway entrance", lat: 40.758, lng: -73.985 },
  { id: "s2", type: "Disturbance", location: "Penn Station", time: "4 hours ago", severity: "medium", description: "Verbal altercation at station concourse", lat: 40.750, lng: -73.992 },
  { id: "s3", type: "Theft", location: "Herald Square", time: "6 hours ago", severity: "low", description: "Unattended bag theft at retail store", lat: 40.749, lng: -73.988 },
  { id: "s4", type: "Assault", location: "East Village", time: "12 hours ago", severity: "high", description: "Physical altercation outside late-night venue", lat: 40.726, lng: -73.983 },
  { id: "s5", type: "Disturbance", location: "Union Square", time: "1 day ago", severity: "low", description: "Noise complaint near subway entrance", lat: 40.735, lng: -73.990 },
  { id: "s6", type: "Theft", location: "Williamsburg", time: "1 day ago", severity: "low", description: "Bicycle theft from street rack", lat: 40.714, lng: -73.961 },
  { id: "s7", type: "Robbery", location: "Lower East Side", time: "2 days ago", severity: "high", description: "Phone snatching near Delancey station", lat: 40.718, lng: -73.988 },
  { id: "s8", type: "Disturbance", location: "Washington Heights", time: "3 days ago", severity: "medium", description: "Loud party complaint in residential area", lat: 40.840, lng: -73.940 },
];

export const neighborhoodVibes: Record<string, { safety: string; vibe: string; bestTime: string; description: string }> = {
  "West Village": { safety: "Very Safe", vibe: "Cozy & Charming", bestTime: "All day", description: "Tree-lined streets, townhouses, and a strong local community feel." },
  "SoHo": { safety: "Safe", vibe: "Trendy & Busy", bestTime: "Morning–Evening", description: "Cast-iron architecture, boutiques, and galleries. Quieter on side streets." },
  "Lower East Side": { safety: "Moderate", vibe: "Edgy & Creative", bestTime: "Daytime–Early Night", description: "Art galleries, vintage shops, and late-night spots. Stay on main corridors at night." },
  "Williamsburg": { safety: "Safe", vibe: "Hip & Lively", bestTime: "All day", description: "Brooklyn's creative hub. Great food, waterfront parks, and nightlife." },
  "Harlem": { safety: "Moderate", vibe: "Cultural & Vibrant", bestTime: "Daytime–Evening", description: "Rich history, incredible food, and live music. Stick to main avenues at night." },
  "Greenwich Village": { safety: "Very Safe", vibe: "Lively & Historic", bestTime: "All day", description: "NYU energy, jazz clubs, comedy venues, and Washington Square Park." },
  "Washington Heights": { safety: "Moderate", vibe: "Residential & Authentic", bestTime: "Daytime", description: "Dominican culture, Fort Tryon Park, and The Cloisters museum." },
};
