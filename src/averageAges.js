'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : (person.sex === 'm')
  );

  const menAges = men.map(man => man.died - man.born);
  const totalMenAge = menAges.reduce((sum, age) => sum + age, 0);

  return totalMenAge / menAges.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name) && person.sex === 'f'
      : person.sex === 'f'
  );

  const womenAges = women.map(woman => woman.died - woman.born);
  const totalWomanAges = womenAges.reduce((sum, age) => sum + age, 0);

  return totalWomanAges / womenAges.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child =>
    onlyWithSon
      ? people.some(mother => child.mother === mother.name) && child.sex === 'm'
      : people.some(mother => child.mother === mother.name)
  );

  const ageDifference = children.map(child =>
    child.born - (people.find(mother => mother.name === child.mother)).born
  );

  const diffSum = ageDifference.reduce((sum, age) => sum + age, 0);

  return diffSum / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
