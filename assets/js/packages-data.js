// Package detail content. Day-by-day itinerary is unique per package (as given);
// overview text is reused verbatim from the homepage package cards; included/not
// included reuses the same generic list already used on tour-detail pages.

const PACKAGE_SHARED = {
  included: ['Certified naturalist guide', 'Hotel pickup & drop-off', 'Bottled water & light snack', 'All route fees included'],
  notIncluded: ['Travel insurance', 'Tips (optional)', 'National Park entry fee'],
};

const PACKAGES = {
  'amazing-tortugas': {
    title: 'Amazing Tortugas',
    image: 'assets/images/package-tortugas.jpg',
    icon: '🐢',
    duration: '4 Days / 3 Nights',
    tag: 'Small groups',
    overview: 'Walk among giant tortoises in their natural highland habitat, then cool off in a volcanic lava tunnel.',
    itinerary: [
      { day: 'Day 1', title: 'Transfer In', description: 'Upper Santa Cruz — Twin Craters ("Gemelos"), El Chato Ranch, Lava Tunnels.' },
      { day: 'Day 2', title: 'Charles Darwin Station & Tortuga Bay', description: 'AM Charles Darwin Station / PM Tortuga Bay.' },
      { day: 'Day 3', title: 'Island Excursion', description: 'Pinzón Island, Santa Fe, or Isabela.' },
      { day: 'Day 4', title: 'Transfer Out', description: '' },
    ],
  },
  'amazing-penguins': {
    title: 'Amazing Penguins',
    image: 'assets/images/package-penguins.jpg',
    icon: '🐧',
    duration: '5 Days / 4 Nights',
    tag: 'Snorkel incl.',
    overview: 'Snorkel alongside Galápagos penguins and playful sea lion pups at Isla Lobos and Kicker Rock.',
    itinerary: [
      { day: 'Day 1', title: 'Transfer In', description: '' },
      { day: 'Day 2', title: 'Island Excursion', description: 'Pinzón Island or Santa Fe.' },
      { day: 'Day 3', title: 'Bartolomé', description: 'Bartolomé Island.' },
      { day: 'Day 4', title: 'Tortuga Bay & Upper Santa Cruz', description: 'AM Tortuga Bay / PM Upper Santa Cruz.' },
      { day: 'Day 5', title: 'Transfer Out', description: '' },
    ],
  },
  'amazing-sharks': {
    title: 'Amazing Sharks',
    image: 'assets/images/package-sharks.jpg',
    icon: '🦈',
    duration: '4 Days / 3 Nights',
    tag: 'Advanced',
    overview: 'Dive or snorkel the legendary León Dormido (Kicker Rock) channel for a close look at hammerhead sharks.',
    itinerary: [
      { day: 'Day 1', title: 'Transfer In', description: 'Upper Santa Cruz — Twin Craters, El Chato Ranch, Lava Tunnels.' },
      { day: 'Day 2', title: 'Tortuga Bay & Charles Darwin Station', description: 'AM Tortuga Bay / PM Charles Darwin Station.' },
      { day: 'Day 3', title: 'Island Excursion', description: 'Pinzón Island, Daphne, or Isabela.' },
      { day: 'Day 4', title: 'Transfer Out', description: '' },
    ],
  },
  'amazing-adventure': {
    title: 'Amazing Adventure',
    image: 'assets/images/package-adventure.jpg',
    icon: '🚵',
    duration: '7 Days / 6 Nights',
    tag: 'Best seller',
    overview: 'A multi-island combo of hiking, kayaking and snorkeling for travelers who want it all in one trip.',
    itinerary: [
      { day: 'Day 1', title: 'Transfer In', description: 'Upper Santa Cruz — Twin Craters, El Chato Ranch, Lava Tunnels.' },
      { day: 'Day 2', title: 'Check-in & Ferry to Isabela', description: 'Check-in / AM Ferry Santa Cruz–Isabela.' },
      { day: 'Day 3', title: 'Sierra Negra Volcano', description: '' },
      { day: 'Day 4', title: 'Los Túneles', description: '' },
      { day: 'Day 5', title: 'Check-out & Ferry to Santa Cruz', description: 'Check-out AM / PM Ferry Isabela–Santa Cruz — Diving equipment testing.' },
      { day: 'Day 6', title: 'Diving Day', description: '' },
      { day: 'Day 7', title: 'Transfer Out', description: '' },
    ],
  },
};
