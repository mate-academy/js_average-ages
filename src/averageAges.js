'use strict';

function calculateMenAverageAge(people, century) {
  const findMen = person => person.sex === 'm';
  const findDeadInRange = person => Math.ceil(person.died / 100) === century;
  const lifeSpan = (acc, person) => acc + (person.died - person.born);

  const everyDeadMen = people.filter(findMen);
  const deadList = century
    ? everyDeadMen.filter(findDeadInRange)
    : everyDeadMen;
  const avgAge = deadList.reduce(lifeSpan, 0) / deadList.length;

  return avgAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const findWomen = person => person.sex === 'f';
  const findMoms = woman => (people.some(kid => kid.mother === woman.name));
  const lifeSpan = (acc, person) => acc + (person.died - person.born);

  const everyWoman = people.filter(findWomen);
  const womenList = withChildren
    ? everyWoman.filter(findMoms)
    : everyWoman;
  const avgAge = womenList.reduce(lifeSpan, 0) / womenList.length;

  return avgAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const findBoys = person => person.sex === 'm';
  const findMoms = child => people.find(woman => child.mother === woman.name);
  const findAgeDiff = (acc, kid) => acc + kid.born - findMoms(kid).born;

  const everyChild = people.filter(findMoms);
  const childList = onlyWithSon
    ? everyChild.filter(findBoys)
    : everyChild;
  const avgDiff = childList.reduce(findAgeDiff, 0) / childList.length;

  return avgDiff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
