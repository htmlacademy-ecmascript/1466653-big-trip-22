/* --- SORT TYPES --- */
const FilterType = {
  DEFAULT: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

/* --- DESTINATIONS --- */
const CITIES = new Map([
  ['Chamonix', 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.'],
  ['Geneva', 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.'],
  ['Paris', 'Paris is the capital and most populous city of France. Since the 17th century, Paris has been one of the world\'s major centres of finance, diplomacy, commerce, culture, fashion, gastronomy and many area.'],
  ['London', 'London is the capital and largest city of England and the United Kingdom, with a population of just under 9 million.'],
  ['Berlin', 'Berlin is the capital and largest city of Germany by both area and population. Its more than 3.85 million inhabitants make it the European Union\'s most populous city, according to population within city limits'],
  ['Moscow', 'Moscow is the capital and largest city of Russia. The city stands on the Moskva River with a population estimated at 13.0 million residents within the city limits, over 18.8 million residents in the urban area, and over 21.5 million residents in the metropolitan area'],
  ['New York', 'Situated on one of the world\'s largest natural harbors, New York City comprises five boroughs, each of which is coextensive with a respective county'],
  ['San-Francisco', 'San Francisco, officially the City and County of San Francisco, is the commercial, financial, and cultural center of Northern California'],
  ['Dubai', 'Established in the 19th century as a small fishing village, Dubai grew into a regional trading hub from the early 20th century and grew rapidly in the late 20th and early 21st century with a focus on tourism and luxury, having the second most five-star hotels in the world, and the tallest building in the world, the Burj Khalifa, which is 828 metres (2,717 ft) tall.'],
]);

const IMG_URL = 'https://loremflickr.com/248/152?random=';

const IMG_DESCRIPTIONS = [
  'Night view of the city',
  'Crowded streets of the city',
  'The beautiful city',
  'City\'s kyscrapers',
  'The most stunning view of the city',
  'City colors',
  'City transport',
];

/* --- OFFERS --- */
const OFFER_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const OFFER_TITLES = [
  'Upgrade to a business class',
  'Extra space',
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train'
];

export { FilterType, SortType, CITIES, IMG_URL, IMG_DESCRIPTIONS, OFFER_TYPES, OFFER_TITLES };
