'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex, died }) => century
    ? Math.ceil(died / 100) === century && sex === 'm' : sex === 'm');

  const count = men.reduce((sum, { born, died }) => sum + died - born, 0);

  return count / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const wemen = people.filter(({ sex, name }) => withChildren
    ? people.some(p => p.mother === name) : sex === 'f');

  const count = wemen.reduce((sum, { born, died }) => sum + died - born, 0);

  return count / wemen.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person =>
    onlyWithSon
      ? people.some(item => item.name === person.mother && person.sex === 'm')
      : people.some(item => item.name === person.mother)
  );

  const agesDifferences = children.reduce((sum, child) => {
    const mother = people.find(
      mom => (mom.name === child.mother)
    );

    const difference = child.born - mother.born;

    return sum + difference;
  }, 0);

  return agesDifferences / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
