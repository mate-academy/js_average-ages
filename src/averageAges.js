'use strict';

const isMale = person => person.sex === 'm';
const isFemale = person => person.sex === 'f';

const calculateAverageAge = (ages) => {
  const sumOfAge = ages
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0);

  return sumOfAge / ages.length;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    century
      ? isMale(person) && Math.ceil(person.died / 100) === century
      : isMale(person)
  );

  return calculateAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person =>
    withChildren
      ? isFemale(person) && people.some(child => child.mother === person.name)
      : isFemale(person)
  );

  return calculateAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child =>
    onlyWithSon
      ? people.some(person => child.mother === person.name) && isMale(child)
      : people.some(person => child.mother === person.name)
  );

  const ageDiff = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return ageDiff.reduce((a, b) => a + b) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
