'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => man.sex === 'm');

  const avgMenAges = men.reduce((add, man) =>
    add + man.died - man.born, 0) / men.length;

  const menDiedInRequiredCentury = men.filter(man =>
    Math.ceil(man.died / 100) === century);

  const avgDiedMenAges = menDiedInRequiredCentury.reduce((add, diedMan) =>
    add + diedMan.died - diedMan.born, 0) / menDiedInRequiredCentury.length;

  return century ? avgDiedMenAges : avgMenAges;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman =>
    woman.sex === 'f');

  const avgWomenAge = women.reduce((add, woman) =>
    add + woman.died - woman.born, 0) / women.length;

  const womenWithChildren = women.filter(mother =>
    people.some(child =>
      child.mother === mother.name));

  const avgMothersAge = womenWithChildren.reduce((add, woman) =>
    add + woman.died - woman.born, 0) / womenWithChildren.length;

  return withChildren ? avgMothersAge : avgWomenAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenWithChildren = people.filter(mother =>
    people.some(child =>
      child.mother === mother.name));

  const children = people.filter(child =>
    womenWithChildren.some(mother =>
      mother.name === child.mother));

  const agesDiffMotherChild = children.map(child =>
    child.born - womenWithChildren.find(mother =>
      mother.name === child.mother).born);

  const avgAgeDiffMotherChild = agesDiffMotherChild.reduce((add, age) =>
    add + age) / agesDiffMotherChild.length;

  const sons = children.filter(son => son.sex === 'm');

  const agesDiffMotherSon = sons.map(son =>
    son.born - womenWithChildren.find(mother =>
      mother.name === son.mother).born);

  const avgAgeDiffMotherSon = agesDiffMotherSon.reduce((add, age) =>
    add + age) / agesDiffMotherSon.length;

  return onlyWithSon ? avgAgeDiffMotherSon : avgAgeDiffMotherChild;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
