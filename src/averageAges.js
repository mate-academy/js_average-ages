'use strict';

const getSex = (people, sex) => people.filter(person => person.sex === sex);

/* Calculate Men Average Age */

function calculateMenAverageAge(people, century) {
  let isMen = getSex(people, 'm');

  const isMenInCentury = isMen.filter(person =>
    Math.ceil(person.died / 100) === century);

  isMen = century
    ? isMenInCentury
    : isMen;

  const averageAgeMen = isMen.reduce(
    (sum, man) => sum + (man.died - man.born), 0
  ) / isMen.length;

  return averageAgeMen;
}

/* Calculate Women Average Age */

function calculateWomenAverageAge(people, withChildren) {
  let isWoman = getSex(people, 'f');

  const womenWithKids = people.filter(
    person => people.some(child => child.mother === person.name));

  isWoman = withChildren
    ? womenWithKids
    : isWoman;

  const averageAgeWomen = isWoman.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0
  ) / isWoman.length;

  return averageAgeWomen;
}

/* Calculate Men Average Difference */

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(
    child => people.some(mother => mother.name === child.mother));

  const isBoy = getSex(children, 'm');

  children = onlyWithSon
    ? isBoy
    : children;

  const averageAgeDiff = children.reduce(
    (sum, child) => sum + (child.born - people.find(
      mom => child.mother === mom.name).born), 0
  ) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
