// Tour detail content, sourced from the "tour details" reference Figma file.
// Itinerary, included and meeting point are identical across every tour in
// that reference (generic placeholder content), so they're kept here once
// and shared. Everything else is unique per tour.

const TOUR_SHARED = {
  included: ['Certified naturalist guide', 'Hotel pickup & drop-off', 'Bottled water & light snack', 'All route fees included'],
  itinerary: [
    { time: '07:30', activity: 'Hotel Pickup', description: 'Door-to-door from your hotel in Puerto Baquerizo Moreno.' },
    { time: '08:15', activity: 'Arrive & explore', description: 'Reach the site with your guide and start at an easy pace.' },
    { time: '10:30', activity: 'Free time & photos', description: 'Swim, relax or photograph the wildlife and landscapes.' },
    { time: '12:00', activity: 'Return', description: 'Comfortable transfer back to your hotel.' },
  ],
  meetingPoint: 'Hotel pickup · Puerto Baquerizo Moreno',
  maxGroupSize: 'Groups are organized at 16 passengers per guide, with no limit on the total number of pax (i.e., multiple guide groups can be accommodated).',
};

const ISLAND_PAGES = {
  'Santa Cruz': 'island-santa-cruz.html',
  'San Cristóbal': 'island-san-cristobal.html',
  'Isabela': 'island-isabela.html',
};

function tourIcon(durationType) {
  if (durationType.includes('Diving')) return '🐠';
  if (durationType.includes('Snorkel')) return '🤿';
  if (durationType.includes('Short tour')) return '⏱';
  return '🥾';
}

function tourCategory(durationType) {
  if (durationType.includes('Diving')) return { label: 'Diving', colorClass: 'tour-badge--blue' };
  if (durationType.includes('Snorkel')) return { label: 'Snorkel', colorClass: 'tour-badge--green' };
  if (durationType.includes('Short tour')) return { label: 'Short Tour', colorClass: 'tour-badge--coral' };
  return { label: 'Day Tour', colorClass: 'tour-badge--mint' };
}

const TOURS = {
  // ---- Santa Cruz ----
  'bartolome': { image: 'assets/images/tour-bartolome.jpg', title: 'Bartolomé Island', island: 'Santa Cruz', duration: 'Full day', difficulty: 'Moderate', overview: 'Climb to the famous viewpoint over Pinnacle Rock, then snorkel with penguins and turtles below.', highlights: ['Iconic Pinnacle Rock view', 'Snorkel with penguins', 'Volcanic moonscape'], bookingDurationType: 'Full day · Day tour' },
  'seymour': { image: 'assets/images/tour-booby.jpg', title: 'North Seymour', island: 'Santa Cruz', duration: 'Full day', difficulty: 'Easy', overview: 'Walk among nesting blue-footed boobies and magnificent frigate birds on this seabird-packed island.', highlights: ['Blue-footed boobies', 'Frigatebird colonies', 'Land & marine iguanas'], bookingDurationType: 'Full day · Day tour' },
  'floreana': { image: 'assets/images/tour-flamingo.jpg', title: 'Floreana Island', island: 'Santa Cruz', duration: 'Full day', difficulty: 'Easy', overview: "Discover the islands' human history at Post Office Bay and snorkel the rich waters of Devil's Crown.", highlights: ['Historic Post Office Bay', "Devil's Crown snorkel", 'Flamingo lagoon'], bookingDurationType: 'Full day · Day tour' },
  'plazas-islands': { image: 'assets/images/tour-land-iguana.jpg', title: 'South Plaza (Islas Plazas)', island: 'Santa Cruz', duration: 'Full day', difficulty: 'Easy', overview: 'A tiny island carpeted in red sesuvium and cactus, home to land iguanas and swallow-tailed gulls.', highlights: ['Land iguanas', 'Red sesuvium carpets', 'Cliff-edge seabirds'], bookingDurationType: 'Full day · Day tour' },
  'daphne': { image: 'assets/images/tour-volcano.jpg', title: 'Daphne Island', island: 'Santa Cruz', duration: 'Full day', difficulty: 'Easy', overview: 'Circle this iconic tuff cone famed in evolutionary research, ringed by boobies and tropicbirds.', highlights: ['Famous Darwin-finch island', 'Nesting seabirds', 'Dramatic crater cone'], bookingDurationType: 'Full day · Day tour' },
  'santa-fe': { image: 'assets/images/tour-sea-lion.jpg', title: 'Santa Fe Island', island: 'Santa Cruz', duration: 'Full day', difficulty: 'Easy', overview: 'Snorkel a calm turquoise bay full of sea lions, then walk among giant Opuntia cactus and endemic iguanas.', highlights: ['Sea lion snorkel bay', 'Endemic Santa Fe iguana', 'Giant Opuntia cactus'], bookingDurationType: 'Full day · Day tour' },
  'pinzon': { image: 'assets/images/tour-snorkel-turtle.jpg', title: 'Snorkel · Pinzón Island', island: 'Santa Cruz', duration: 'Full day', difficulty: 'Easy', overview: 'A relaxed boat day snorkeling the clear reefs around Pinzón with turtles, rays and reef fish.', highlights: ['Clear-water reef snorkel', 'Turtles & white-tip sharks', 'Relaxed boat day'], bookingDurationType: 'Full day · Snorkel' },
  'diving-gordon-rocks': { image: 'assets/images/tour-hammerhead.jpg', title: 'Diving · Gordon Rocks', island: 'Santa Cruz', duration: 'Full day · 2 dives', difficulty: 'Advanced', overview: 'The legendary advanced site — strong currents and a near-certain wall of scalloped hammerheads.', highlights: ['Schooling hammerheads', 'Strong-current drift dive', 'Advanced certification required'], bookingDurationType: 'Full day · 2 dives · Diving' },
  'diving-seymour-mosquera': { image: 'assets/images/tour-diving-reef.jpg', title: 'Diving · Seymour / Mosquera', island: 'Santa Cruz', duration: 'Full day · 2 dives', difficulty: 'Moderate', overview: 'Two dives among reef sharks, eagle rays and sea lions in nutrient-rich channels.', highlights: ['Reef sharks & eagle rays', 'Playful sea lions', '2 guided dives'], bookingDurationType: 'Full day · 2 dives · Diving' },
  'diving-floreana': { image: 'assets/images/tour-diving-reef.jpg', title: 'Diving · Floreana', island: 'Santa Cruz', duration: 'Full day · 2 dives', difficulty: 'Moderate', overview: 'Dive the volcanic walls and pinnacles around Floreana, rich with rays, turtles and reef fish.', highlights: ['Volcanic walls & pinnacles', 'Rays & sea turtles', '2 guided dives'], bookingDurationType: 'Full day · 2 dives · Diving' },
  'las-grietas': { image: 'assets/images/tour-las-grietas.jpg', title: 'Las Grietas', island: 'Santa Cruz', duration: '2–3 hours', difficulty: 'Easy', overview: 'A short trail and water taxi lead to a stunning crevice of clear brackish water perfect for a swim.', highlights: ['Crystal crevice swim', 'Scenic salt-pan trail', 'Quick half-morning trip'], bookingDurationType: '2–3 hours · Short tour' },
  'charles-darwin-station': { image: 'assets/images/tour-giant-tortoise.jpg', title: 'Charles Darwin Station', island: 'Santa Cruz', duration: '2 hours', difficulty: 'Easy', overview: 'Visit the tortoise breeding centre and learn how giant tortoises are raised and returned to the wild.', highlights: ['Tortoise breeding centre', 'Conservation exhibits', 'Easy self-paced walk'], bookingDurationType: '2 hours · Short tour' },
  'highlands': { image: 'assets/images/tour-giant-tortoise.jpg', title: 'Santa Cruz Highlands', island: 'Santa Cruz', duration: 'Half day', difficulty: 'Easy', overview: 'Explore Los Gemelos craters, walk-through lava tunnels and giant tortoises roaming free at El Chato.', highlights: ['Los Gemelos craters', 'Walk-through lava tunnels', 'Wild giant tortoises'], bookingDurationType: 'Half day · Short tour' },
  'bay-tour-santa-cruz': { image: 'assets/images/tour-sea-lion.jpg', title: 'Santa Cruz Bay Tour', island: 'Santa Cruz', duration: 'Half day', difficulty: 'Easy', overview: "A boat loop of Academy Bay's islets and beaches with snorkeling stops close to town.", highlights: ['Bay islets & beaches', 'Sea lions & sharks at Punta Estrada', 'Central location'], bookingDurationType: 'Half day · Short tour' },

  // ---- San Cristóbal ----
  'tour-360': { image: 'assets/images/tour-kicker-rock.jpg', title: 'Tour 360°', island: 'San Cristóbal', duration: 'Full day', difficulty: 'Easy', overview: 'Sail right around San Cristóbal in a day, snorkeling at León Dormido and remote bays teeming with marine life.', highlights: ['Full island circumnavigation', 'Snorkel at León Dormido', 'Seabird cliffs & beaches'], bookingDurationType: 'Full day · Day tour' },
  'punta-pitt-walk': { image: 'assets/images/tour-booby.jpg', title: 'Punta Pitt — Walk & Snorkel', island: 'San Cristóbal', duration: 'Full day', difficulty: 'Moderate', overview: 'Hike volcanic cliffs where all three booby species nest, then snorkel the clear coves below.', highlights: ['Red-footed booby colony', 'Volcanic coastal hike', 'Snorkel turquoise coves'], bookingDurationType: 'Full day · Snorkel' },
  'espanola-island': { image: 'assets/images/tour-marine-iguana.jpg', title: 'Isla Española', island: 'San Cristóbal', duration: 'Full day', difficulty: 'Moderate', overview: 'Visit the oldest island to see waved albatross, the famous blowhole and colourful marine iguanas.', highlights: ['Waved albatross (seasonal)', 'Dramatic blowhole', 'Colourful marine iguanas'], bookingDurationType: 'Full day · Day tour' },
  'upper-part': { image: 'assets/images/tour-giant-tortoise.jpg', title: 'Highlands Tour (Parte Alta)', island: 'San Cristóbal', duration: 'Half day · 4h', difficulty: 'Easy', overview: "Climb into San Cristóbal's green highlands to meet giant tortoises, lush miconia forest and sweeping island views.", highlights: ['Giant tortoise reserve', 'Miconia cloud forest', 'Panoramic island viewpoints'], bookingDurationType: 'Half day · 4hr · Day tour' },
  'snorkel-leon-dormido': { image: 'assets/images/tour-kicker-rock.jpg', title: 'Snorkel · León Dormido (Kicker Rock)', island: 'San Cristóbal', duration: 'Half day', difficulty: 'Moderate', overview: 'Snorkel the channel of this towering rock among reef sharks, rays, turtles and shoals of fish.', highlights: ['Iconic Kicker Rock channel', 'Reef & hammerhead sharks', 'Sea turtles & rays'], bookingDurationType: 'Half day · Snorkel' },
  'diving-punta-pitt': { image: 'assets/images/tour-diving-reef.jpg', title: 'Diving · Punta Pitt', island: 'San Cristóbal', duration: 'Full day · 2 dives', difficulty: 'Advanced', overview: "Advanced dives off the island's eastern tip with strong life — sharks, rays and big schools.", highlights: ['2 guided dives', 'Sharks & eagle rays', 'Certified divers only'], bookingDurationType: 'Full day · 2 dives · Diving' },
  'diving-espanola-island': { image: 'assets/images/tour-diving-reef.jpg', title: 'Diving · Isla Española', island: 'San Cristóbal', duration: 'Full day · 2 dives', difficulty: 'Advanced', overview: "A full-day dive trip to Española's rich walls and pinnacles for experienced divers.", highlights: ['2 guided dives', 'Walls & pinnacles', 'Turtles, sharks, rays'], bookingDurationType: 'Full day · 2 dives · Diving' },
  'diving-roca-ballena': { image: 'assets/images/tour-diving-reef.jpg', title: 'Diving · Roca Ballena', island: 'San Cristóbal', duration: 'Half day · 2 dives', difficulty: 'Moderate', overview: 'A protected site ideal for a relaxed two-dive day among reef fish, rays and playful sea lions.', highlights: ['2 guided dives', 'Calm protected site', 'Sea lions & rays'], bookingDurationType: 'Half day · 2 dives · Diving' },
  'diving-bahia-darwin': { image: 'assets/images/tour-diving-reef.jpg', title: 'Diving · Bahía Darwin', island: 'San Cristóbal', duration: 'Half day · 2 dives', difficulty: 'Moderate', overview: 'An easy, sheltered bay dive — a great choice for newer divers and check-out dives.', highlights: ['2 guided dives', 'Sheltered, easy entry', 'Great for new divers'], bookingDurationType: 'Half day · 2 dives · Diving' },
  'night-diving': { image: 'assets/images/tour-night-diving.jpg', title: 'Night Diving', island: 'San Cristóbal', duration: 'Evening · 1 dive', difficulty: 'Advanced', overview: 'Descend after dark to see a completely different reef — sleeping fish, octopus and hunting rays.', highlights: ['Guided night dive', 'Octopus & sleeping turtles', 'Certified divers only'], bookingDurationType: 'Evening · 1 dive · Diving' },

  // ---- Isabela ----
  'los-tuneles': { image: 'assets/images/tour-snorkel-turtle.jpg', title: 'Los Túneles', island: 'Isabela', duration: 'Full day', difficulty: 'Moderate', overview: 'Glide over surreal lava arches and tunnels, then snorkel with turtles, seahorses and white-tip sharks.', highlights: ['Lava arch formations', 'Turtles & seahorses', 'Blue-footed booby colony'], bookingDurationType: 'Full day · Snorkel' },
  'sierra-negra-volcan-chico': { image: 'assets/images/tour-volcano.jpg', title: 'Sierra Negra & Volcán Chico', island: 'Isabela', duration: 'Full day', difficulty: 'Moderate', overview: "Hike to the rim of one of the world's largest active calderas and across steaming volcanic fields.", highlights: ['Massive active caldera', 'Steaming fumarole fields', 'Sweeping island views'], bookingDurationType: 'Full day · Day tour' },
  'tintoreras-breeding-centre': { image: 'assets/images/tour-tintoreras.jpg', title: 'Tintoreras & Breeding Centre', island: 'Isabela', duration: 'Half day', difficulty: 'Easy', overview: "Spot resting white-tip sharks in lava channels and penguins, then visit Isabela's tortoise centre.", highlights: ['White-tip shark channel', 'Penguins & marine iguanas', 'Tortoise breeding centre'], bookingDurationType: 'Half day · Short tour' },
  'sulphur-mines': { image: 'assets/images/tour-sulphur.jpg', title: 'Minas de Azufre (Sulphur Mines)', island: 'Isabela', duration: 'Full day', difficulty: 'Advanced', overview: 'A longer trek beyond Sierra Negra to vivid yellow sulphur fields and bubbling fumaroles.', highlights: ['Vivid sulphur fields', 'Active fumaroles', 'Full-day volcano trek'], bookingDurationType: 'Full day · Day tour' },
};
