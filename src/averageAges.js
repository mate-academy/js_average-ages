'use strict';

function calculateMenAverageAge(people, century) {
  let ageOfPassage = [];

  (century === undefined)
    ? (people.map(item => (item.sex === 'm')
      && ageOfPassage.push(item.died - item.born)))
    : (people.map(item =>
      (item.sex === 'm' && Math.ceil(item.died / 100) === century)
      && ageOfPassage.push(item.died - item.born)));

  ageOfPassage = calulateAvarageAge(ageOfPassage);

  return ageOfPassage;
}

function calculateWomenAverageAge(people, withChildren) {
  let womenAverageAge = [];
  let resultOfAverageAge = 0;
  const objWoman = filterIfFemale([...people]);

  objWoman.map(value => (withChildren === undefined)
    ? womenAverageAge.push(value.died - value.born) : false);

  objWoman.map(item => {
    people.map(value => (item.name === value.mother && withChildren === true)
      ? womenAverageAge.push(item.died - item.born) : false);
  });

  if (withChildren === true) {
    womenAverageAge = (womenAverageAge
      .filter((x, index, array) => array.indexOf(x) === index));
  }
  resultOfAverageAge = calulateAvarageAge(womenAverageAge);

  return resultOfAverageAge;
}

const calulateAvarageAge = (womenAverageAgeay) => {
  const womenAverageAgeLength = womenAverageAgeay.length;
  const resultOfAverageAge = (womenAverageAgeay
    .reduce((accum, current) => accum + current) / womenAverageAgeLength);

  return resultOfAverageAge;
};
const filterIfFemale = (womenAverageAgeay) => womenAverageAgeay
  .filter(people => people.sex === 'f');

function calculateAverageAgeDiff(people, onlyWithSon) {
  let allFemaleProvided = [];
  const dateDifference = [];

  (onlyWithSon === true)
    ? allFemaleProvided = people.filter(child => child.sex === 'm'
    && people.some(mother => mother.name === child.mother))
    : allFemaleProvided = people.filter(child => people.find(
      mother => mother.name === child.mother));

  allFemaleProvided.map(item => {
    people.map(value => (value.name === item.mother)
      ? dateDifference.push(item.born - value.born) : false,
    );
  });

  return calulateAvarageAge(dateDifference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
