'use strict';

function calculateMenAverageAge(people, century) {
  const findDeadInRange = person => Math.ceil(person.died / 100) === century;

  const everyDeadMan = getPeopleBySex('m', people);

  const listToCount = century
    ? everyDeadMan.filter(findDeadInRange)
    : everyDeadMan;
  const avgAge = getLifeSpan(listToCount) / listToCount.length;

  return avgAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const findMoms = woman => (people.some(kid => kid.mother === woman.name));

  const everyWoman = getPeopleBySex('f', people);
  const listToCount = withChildren
    ? everyWoman.filter(findMoms)
    : everyWoman;
  const avgAge = getLifeSpan(listToCount) / listToCount.length;

  return avgAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMoms = child => people.find(woman => child.mother === woman.name);
  const findAgeDiff = (acc, kid) => acc + kid.born - findMoms(kid).born;

  const everyChild = people.filter(findMoms);
  const listToCount = onlyWithSon
    ? getPeopleBySex('m', everyChild)
    : everyChild;
  const avgDiff = listToCount.reduce(findAgeDiff, 0) / listToCount.length;

  return avgDiff;
};

function getPeopleBySex(sex, list) {
  return list.filter(person => person.sex === sex);
};

function getLifeSpan(list) {
  return list.reduce((acc, person) => acc + (person.died - person.born), 0);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
