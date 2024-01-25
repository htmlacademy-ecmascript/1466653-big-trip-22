import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';

/* ---- SORTING ----- */
const sortEventsByPrice = (previousEvent, nextEvent) => (nextEvent.basePrice - previousEvent.basePrice);
const sortEventsByTime = (previousEvent, nextEvent) => {
  const previousEventDuration = dayjs(previousEvent.dateFrom).diff((previousEvent.dateTo));
  const nextEventDuration = dayjs(nextEvent.dateFrom).diff((nextEvent.dateTo));

  return (nextEventDuration - previousEventDuration);
};
const sortEventsByDate = (previousEvent, nextEvent) => dayjs(previousEvent.dateFrom).diff((nextEvent.dateFrom));

/* ---- RANDOM ELEMENTS ---- */
const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export {
  isEscapeKey,
  sortEventsByPrice,
  sortEventsByTime,
  sortEventsByDate,
  getRandomInteger,
  getRandomArrayElement,
};
