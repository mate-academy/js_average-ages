'use strict';

// Use it to find average value from array with numbers.
// Output: number;
function countAverage(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

// Use it to count age of person from array with people data.
// Output: array with ages;
function getAges(people) {
  return people.map(person => person.died - person.born);
}

function calculateMenAverageAge(people, century) {
  const onlyMen = people
    .filter(person => person.sex === 'm')
    .filter(person => !century || century === Math.ceil(person.died / 100));
  const ages = getAges(onlyMen);

  return countAverage(ages);
}

function calculateWomenAverageAge(people, withonlyChildren) {
  const mothersList = people
    .map(person => person.mother)
    .filter(name => name !== null);

  const onlyWomen = people
    .filter((person) => person.sex === 'f')
    .filter((person) => !withonlyChildren || mothersList.includes(person.name));
  const ages = getAges(onlyWomen);

  return countAverage(ages);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const onlyChildren = people.filter((child) =>
    onlyWithSon
      ? people.find(
        (person) => child.mother === person.name && child.sex === 'm'
      )
      : people.find((person) => child.mother === person.name)
  );

  const differenceAges = onlyChildren
    .map(
      (child) =>
        child.born - people.find((mother) => mother.name === child.mother).born
    );
  const ages = countAverage(differenceAges);

  return ages;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
