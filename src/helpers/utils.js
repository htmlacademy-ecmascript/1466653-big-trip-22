import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';
// const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

/* ---- SORTING ----- */
const sortEventsByPrice = (previousEvent, nextEvent) => (nextEvent.basePrice - previousEvent.basePrice);
const sortEventsByTime = (previousEvent, nextEvent) => {
  const previousEventDuration = dayjs(previousEvent.dateFrom).diff((previousEvent.dateTo));
  const nextEventDuration = dayjs(nextEvent.dateFrom).diff((nextEvent.dateTo));

  return (nextEventDuration - previousEventDuration);
};

/* ---- RANDOM ELEMENTS ---- */
const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export {
  isEscapeKey,
  // updateItem,
  sortEventsByPrice,
  sortEventsByTime,
  getRandomInteger,
  getRandomArrayElement,
};
