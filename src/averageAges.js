'use strict';

function getAverageAge(people) {
  const ages = people.reduce((accumulator, person) =>
    accumulator + (person.died - person.born), 0);

  const averageAge = ages / people.length;

  return averageAge;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex, died }) => sex === 'm'
    && (Math.ceil(died / 100) === century || !century));

  return getAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? people.some(somePerson => person.name === somePerson.mother)
    : person.sex === 'f');

  return getAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(({ sex, mother }, i, arr) =>
    onlyWithSon
      ? arr.some(person => person.name === mother) && sex === 'm'
      : arr.some(person => person.name === mother));

  const ages = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born,
  );

  const sumOfAges = ages.reduce((accumulator, age) => accumulator + age);

  const averageAgeDiff = sumOfAges / ages.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
