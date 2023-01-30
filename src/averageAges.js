'use strict';

const middleAge = (person) =>
  person.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / person.length;

function calculateMenAverageAge(people, century) {
  const filterMan = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return middleAge(filterMan);
}

function calculateWomenAverageAge(people, withChildren) {
  const filterWoman = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.some(woman => person.name === woman.mother)
      : person.sex === 'f'
  );

  return middleAge(filterWoman);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    onlyWithSon
      ? people.some(human => human.name === person.mother && person.sex === 'm')
      : people.some(human => human.name === person.mother)
  );

  const totalAges = children.reduce((sum, child) => {
    const motherBorn = people.find(mother => mother.name === child.mother).born;

    return sum + child.born - motherBorn;
  }, 0);

  return totalAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
