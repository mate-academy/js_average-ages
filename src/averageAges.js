'use strict';

function getAverageAges(people) {
  return people.reduce((sum, { died, born }) =>
    sum + (died - born), 0)
    / people.length;
}

function getMother(people) {
  return people.filter(women => women.sex === 'f'
    && people.some(person => person.mother === women.name));
}

function getSon(people, mothers) {
  return people.filter(child => child.sex === 'm'
  && mothers.find(mother => mother.name === child.mother));
}

function getChild(people, mothers) {
  return people.filter(child =>
    mothers.find(mother => mother.name === child.mother));
}

function getMale(people) {
  return people.filter(({ sex }) => sex === 'm');
}

function getFemale(people) {
  return people.filter(({ sex }) => sex === 'f');
}

function calculateMenAverageAge(people, century) {
  const filteredByCentury = century
    ? people.filter(({ died }) => Math.ceil(died / 100) === century)
    : people;

  const filteredBySex = getMale(filteredByCentury);

  return getAverageAges(filteredBySex);
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredByMotherStatus = withChildren
    ? getMother(people)
    : getFemale(people);

  return getAverageAges(filteredByMotherStatus);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = getMother(people);

  const children = onlyWithSon
    ? getSon(people, mothers)
    : getChild(people, mothers);

  return children.reduce((sum, child) => {
    const mother = mothers.find(mom => mom.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
