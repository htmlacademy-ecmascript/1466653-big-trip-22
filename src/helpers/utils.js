import dayjs from 'dayjs';
import { FilterType } from './const';

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
const isDurationEqual = (eventA, eventB) => dayjs(eventA.dateFrom).diff((eventA.dateTo)) === dayjs(eventB.dateFrom).diff((eventB.dateTo));

const sortEventsByPrice = (previousEvent, nextEvent) => (nextEvent.basePrice - previousEvent.basePrice);
const sortEventsByTime = (previousEvent, nextEvent) => {
  const previousEventDuration = dayjs(previousEvent.dateFrom).diff((previousEvent.dateTo));
  const nextEventDuration = dayjs(nextEvent.dateFrom).diff((nextEvent.dateTo));

  return (previousEventDuration - nextEventDuration);
};
const sortEventsByDate = (previousEvent, nextEvent) => dayjs(previousEvent.dateFrom).diff((nextEvent.dateFrom));

const filter = {
  [FilterType.DEFAULT]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom, 'minutes')),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs().isAfter(point.dateFrom, 'minutes') && dayjs().isBefore(point.dateTo, 'minutes')),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateTo, 'minutes')),
};

export {
  filter,
  isEscapeKey,
  isDatesEqual,
  isDurationEqual,
  sortEventsByPrice,
  sortEventsByTime,
  sortEventsByDate,
};
