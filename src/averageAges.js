
'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(child => child.sex === 'm');
  const beforeReduce = century
    ? men.filter(man => century === Math.ceil(man.died / 100))
    : men;

  return beforeReduce.reduce((sum, man, i, array) => {
    return sum + (man.died - man.born) / array.length;
  }, 0);
}

function calculateWomenAverageAge(people, withChildren) {
  const womans = people.filter(child => child.sex === 'f');
  const beforeReduce = withChildren
    ? womans.filter(woman => people.some(human =>
      human.mother === woman.name))
    : womans;

  return beforeReduce.reduce((sum, woman, i, array) => {
    return sum + (woman.died - woman.born) / array.length;
  }, 0);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleSelector = !onlyWithSon
    ? people
    : people.filter(child => child.sex === 'm');

  const children = peopleSelector.filter(human => people
    .some(mother => mother.name === human.mother));

  const childrenAges = children.map((child) => (
    child.born - (
      people.find((mother) => mother.name === child.mother).born
    )
  ));

  const agesDiff = childrenAges
    .reduce((sum, ages) => sum + ages) / childrenAges.length;

  return agesDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
