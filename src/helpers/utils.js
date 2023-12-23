/* ---- RANDOM ELEMENTS ---- */
const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export { getRandomInteger, getRandomArrayElement };
