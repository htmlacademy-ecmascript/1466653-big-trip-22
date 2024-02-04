import dayjs from 'dayjs';

const DIGITS_NUMBER = 2;

function getDateTimeFullText(date) {
  return date ? dayjs(date).format('YYYY-MM-DDTHH:mm') : '';
}

function getDateTimeShortText(date) {
  return date ? dayjs(date).format('YYYY-MM-DD') : '';
}

function getDateTimeFieldText(date) {
  return date ? dayjs(date).format('DD/MM/YY HH:mm') : '';
}

function getMonthDateText(date) {
  return date ? dayjs(date).format('MMM DD') : '';
}

function getDateMonthText(date) {
  return date ? dayjs(date).format('DD MMM') : '';
}

function getTimeText(date) {
  return date ? dayjs(date).format('hh:mm') : '';
}

function getDuration(dateStart, dateEnd) {
  let minutes = 0;
  let hours = 0;
  let days = 0;

  minutes = Math.ceil(((new Date(dateEnd).getTime()) - (new Date(dateStart).getTime())) / (1000 * 60));

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }

  if (hours > 23) {
    days = Math.floor(hours / 24);
    hours = Math.floor(hours % 24);
  }

  return {
    minutes: minutes.toString().padStart(DIGITS_NUMBER, '0'),
    hours: hours.toString().padStart(DIGITS_NUMBER, '0'),
    days
  };
}

export {
  getDateTimeFullText,
  getDateTimeShortText,
  getDateTimeFieldText,
  getMonthDateText,
  getDateMonthText,
  getTimeText,
  getDuration,
};
