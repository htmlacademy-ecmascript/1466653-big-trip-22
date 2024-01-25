import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
const isDurationEqual = (eventA, eventB) => dayjs(eventA.dateFrom).diff((eventA.dateTo)) === dayjs(eventB.dateFrom).diff((eventB.dateTo));

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
  isDatesEqual,
  isDurationEqual,
  sortEventsByPrice,
  sortEventsByTime,
  sortEventsByDate,
  getRandomInteger,
  getRandomArrayElement,
};
