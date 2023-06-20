'use strict';

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(({ sex }) => sex === 'm');
  const menInSelectedCentury = !century
    ? onlyMen
    : onlyMen.filter(({ died }) => Math.ceil(died / 100) === century);

  return calculateAverageAge(menInSelectedCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(({ sex }) => sex === 'f');
  const mothers = allWomen
    .filter(({ name }) => people.find(({ mother }) => name === mother));

  const womenAges = (!withChildren
    ? allWomen
    : mothers);

  return calculateAverageAge(womenAges);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people
    .filter(({ sex }) => sex === 'f')
    .filter(({ name }) => people.find(({ mother }) => name === mother));

  const children = people
    .filter(({ mother }) => mothers.find(({ name }) => mother === name));

  const filteredChildren = (onlyWithSon
    ? children.filter(({ sex }) => sex === 'm')
    : children);

  const ageDifferences = filteredChildren
    .reduce((val, child) => {
      const mother = mothers.find(({ name }) => child.mother === name);
      const difference = child.born - mother.born;

      return val + difference;
    }, 0);

  return ageDifferences / filteredChildren.length;
}

function calculateAverageAge(people) {
  const ages = people.map(({ died, born }) => died - born);
  const sumOfAges = ages.reduce((sum, age) => sum + age, 0);

  return sumOfAges / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
