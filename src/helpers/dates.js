import dayjs from 'dayjs';
import { getRandomInteger } from './utils';

const getRandomStartDate = () => new Date(2024, 0, getRandomInteger(20, 31), getRandomInteger(7, 23), getRandomInteger(0, 59));
const getRandomEndDate = () => new Date(2024, 1, getRandomInteger(0, 29), getRandomInteger(7, 23), getRandomInteger(0, 59));

function getDateTimeFullText(date) {
  return date ? dayjs(date).format('YYYY-MM-DDTHH:mm') : '';
}

function getDateTimeShortText(date) {
  return date ? dayjs(date).format('YYYY-MM-DD') : '';
}

function getDateTimeFieldText(date) {
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

function getDateMonthText(date) {
  return date ? dayjs(date).format('MMM DD') : '';
}

function getTimeText(date) {
  return date ? dayjs(date).format('hh:mm') : '';
}

function getDuration(dateStart, dateEnd) {
  let minutes = 0;
  let hours = 0;
  let days = 0;

  minutes = ((new Date(dateEnd).getTime()) - (new Date(dateStart).getTime())) / (1000 * 60);

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }

  if (hours > 23) {
    days = Math.floor(hours / 24);
    hours = Math.floor(hours % 24);
  }

  return { minutes, hours, days };
}

export {
  getRandomStartDate,
  getRandomEndDate,
  getDateTimeFullText,
  getDateTimeShortText,
  getDateTimeFieldText,
  getDateMonthText,
  getTimeText,
  getDuration,
};
