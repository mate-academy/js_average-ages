'use strict';

function calculateMenAverageAge(people, century) {
  const database = century
    ? people.filter(man => man.sex === 'm'
      && Math.ceil(man.died / 100) === century)
    : people.filter(man => man.sex === 'm');

  const averageAge = database.reduce((allMan, man) =>
    allMan + (man.died - man.born) / database.length, 0);

  return +averageAge.toFixed(2);
}

function calculateWomenAverageAge(people, withChildren) {
  const database = withChildren
    ? people.filter(woman => woman.sex === 'f'
      && people.some(child => child.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const averageAge = database.reduce((allWoman, woman) =>
    allWoman + (woman.died - woman.born) / database.length, 0);

  return +averageAge.toFixed(2);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const database = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(woman => woman.name === child.mother)
    : people.some(woman => woman.name === child.mother)
  );

  const ageGap = database.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born);

  const averageGap = ageGap.reduce((sum, age) => sum + age, 0) / ageGap.length;

  return +averageGap.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
