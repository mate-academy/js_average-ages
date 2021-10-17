'use strict';

function calculateMenAverageAge(people, century) {
  const filteredByMen = century
    ? people.filter(
      ({ sex, died }) => sex === 'm' && century === Math.ceil(died / 100)
    )
    : people.filter(({ sex }) => sex === 'm');
  const averageAge
  = filteredByMen.reduce((acc, man) => {
    const yearsOfLife = man.died - man.born;

    return acc + yearsOfLife;
  }, 0) / filteredByMen.length || 0;

  return averageAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const filteredByWomen = withChildren
    ? people.filter(
      ({ sex, name }) =>
        sex === 'f' && people.some(({ mother }) => mother === name)
    )
    : people.filter(({ sex }) => sex === 'f');
  const averageAge
  = filteredByWomen.reduce((acc, woman) => {
    const yearsOfLife = woman.died - woman.born;

    return acc + yearsOfLife;
  }, 0) / filteredByWomen.length || 0;

  return averageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(
    (person) =>
      person.sex === 'f' && people.some((child) => child.mother === person.name)
  );
  const children = onlyWithSon
    ? people.filter(
      (child) =>
        child.sex === 'm'
          && mothers.some((mother) => child.mother === mother.name)
    )
    : people.filter((child) =>
      mothers.some((mother) => child.mother === mother.name)
    );

  const averageAgeDiff
    = children.reduce((acc, child) => {
      const mother = people.find((mom) => child.mother === mom.name);

      return acc + (child.born - mother.born);
    }, 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
