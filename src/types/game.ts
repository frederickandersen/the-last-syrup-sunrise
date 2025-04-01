export type Character = {
  id: string;
  name: string;
  description: string;
  perks: string[];
  flaws: string[];
  compulsions: string[];
  secretObjective: string;
};

export type SocialMission = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
};

export type PowerCard = {
  id: string;
  name: string;
  description: string;
  used: boolean;
};

export type GameState = {
  selectedCharacter: Character | null;
  socialMissions: SocialMission[];
  powerCards: PowerCard[];
  currentBar: number;
  completedMissions: number;
  isGameStarted: boolean;
  drinkPasses: number;
};

export const CHARACTERS: Character[] = [
  {
    id: 'pickle-prophet',
    name: 'The Pickle Prophet',
    description: 'He who speaks to pickled things. Every olive is a prophecy.',
    perks: [
      'Skip a drink if ordering food or snacks',
      'Gain 1 brine token per bar if someone else eats something pickled. Three tokens and you can pass on a drink'
    ],
    flaws: [
      'Must order a snack if available (especially pickled)',
      'Cannot drink sweet cocktails',
      'If you go a full bar without eating or ordering food, you take a penalty drink'
    ],
    compulsions: [
      'Sniff each drink before sipping and give a "verdict"',
      'Eat the garnish before sipping'
    ],
    secretObjective: 'Convince three strangers that snacks are the key to enlightenment'
  },
  {
    id: 'detective-slavo',
    name: 'Det. Slavo Mercurio',
    description: 'Retired. Disgraced. Divorced three times. But the city still calls.',
    perks: [
      'Once per bar, interrogate another player (they must drink your drink)',
      'Skip a round if you had whiskey or stout last round'
    ],
    flaws: [
      'If you leave a bar without finishing your drink, your next drink must be neat',
      'If someone leaves the table before you, you must toast to "unsolved cases" and take a sip'
    ],
    compulsions: [
      'Always toast with "To the case!"',
      'If a bar has a pool table: must challenge a stranger. If you win, the others take a shot. If you lose, you must take a punishment shot'
    ],
    secretObjective: 'Solve three "mysteries" by gathering information from strangers'
  },
  {
    id: 'brother-chrome',
    name: 'Brother Chrome',
    description: 'Monk of the Divine Bop. He dances for the salvation of all rhythm.',
    perks: [
      'Dance for full song and assign next drink to someone else',
      'If you get a stranger to dance, 1 friend must down half their drink',
      'Music playing? You are immune to drink chucking'
    ],
    flaws: [
      'Cannot stand still while drinking',
      'If asked to dance with a stranger, declining will result in a shot'
    ],
    compulsions: [
      'Must say "vibration" or "pulse" when ordering',
      'Join if someone air-drums'
    ],
    secretObjective: 'Get five strangers to join you in a synchronized dance'
  },
  {
    id: 'comrade-fantomas',
    name: 'Comrade Fantômas',
    description: 'A revolutionary who forgets what was being revolted against. Still yells about it anyway.',
    perks: [
      'Once per bar: toast "to the workers" and everyone else drinks',
      'The People\'s Veto: Once per crawl, if two players agree, you may cancel a punishment',
      'Make a stranger laugh = skip next drink'
    ],
    flaws: [
      'Only simple drinks (beer, wine, spirit + mixer)',
      'When asked what drink, spend less than 15 seconds deciding. Or else, drink twice'
    ],
    compulsions: [
      'Drink if someone mentions money',
      'Change your name tag every 2 bars'
    ],
    secretObjective: 'Start three successful "revolutions" by getting strangers to join your cause'
  },
  {
    id: 'hollow-archivist',
    name: 'The Hollow Archivist',
    description: 'Knows everything. Recalls nothing. Carries a ledger filled with blank pages.',
    perks: [
      'Skip 1 drink per bar if logging everyone\'s drinks',
      'If you log drinks for 3 players across 3 bars, you may choose who drinks next',
      'Record a stranger\'s name, force everybody else to drink',
      'Once per bar, remind everyone to drink water. If everyone does, you may skip your next drink'
    ],
    flaws: [
      'No drink repeats',
      'Must drink in 4 separate sips (no chugging)'
    ],
    compulsions: [
      'Drink if something is spilled or dropped',
      'Log "entry complete" when music starts or stops'
    ],
    secretObjective: 'Document the entire night in your ledger, including three stranger interactions.'
  }
];

export const SOCIAL_MISSIONS: SocialMission[] = [
  {
    id: 'olive-trade',
    name: 'The Olive Trade',
    description: 'Barter with a stranger using an olive or snack to get something in return.',
    completed: false
  },
  {
    id: 'inventory-check',
    name: 'Inventory Check',
    description: 'Convince a stranger to show you an item from their pocket or bag.',
    completed: false
  },
  {
    id: 'cold-case',
    name: 'The Cold Case',
    description: 'Describe a made-up missing person and ask three strangers if they\'ve seen them.',
    completed: false
  },
  {
    id: 'stranger-prophecy',
    name: 'The Stranger Prophecy',
    description: 'Convince a stranger to join your table by claiming they appeared in your dream.',
    completed: false
  },
  {
    id: 'tradecraft',
    name: 'Tradecraft',
    description: 'Trade an object or story to a bartender or stranger for a drink or a secret.',
    completed: false
  },
  {
    id: 'floor-recruiter',
    name: 'Floor Recruiter',
    description: 'Get two strangers to join you on the dance floor (at the same time).',
    completed: false
  }
];

export const POWER_CARDS: PowerCard[] = [
  {
    id: 'switcheroo',
    name: 'The Switcheroo',
    description: 'Swap your current drink with another player\'s, no questions asked.',
    used: false
  },
  {
    id: 'ghost',
    name: 'The Ghost',
    description: 'Take a break. You are unseen for one location.',
    used: false
  },
  {
    id: 'megatoast',
    name: 'The Megatoast',
    description: 'Raise a dramatic toast and make everyone at the table down their drink.',
    used: false
  },
  {
    id: 'shapeshifter',
    name: 'The Shapeshifter',
    description: 'Temporarily steal another player\'s perk for one round.',
    used: false
  },
  {
    id: 'redirect',
    name: 'The Redirect',
    description: 'Force a social mission onto another player.',
    used: false
  }
]; 