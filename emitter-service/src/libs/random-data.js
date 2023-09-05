const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomData = (names, cities) => {
  const namesIndex = getRandomInt(names.length);
  const citiesLength = cities.length;
  const originIndex = getRandomInt(citiesLength);
  const destinationIndex = getRandomInt(citiesLength);
  return {
    name: names[namesIndex],
    origin: cities[originIndex],
    destination: cities[destinationIndex],
  };
};

module.exports = { getRandomInt, getRandomData };
