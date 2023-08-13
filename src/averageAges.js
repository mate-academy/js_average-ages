'use strict';

const MALE = 'm';
const FEMALE = 'f';

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => person.sex === MALE);
  const filteredMen = century !== undefined
    ? men.filter((person) => Math.ceil(person.died / 100) === century)
    : men;

  return averageAge(filteredMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((person) => person.sex === FEMALE);
  const filteredWomen = women.filter((woman) => withChildren
    ? people.some((person) => person.mother === woman.name)
    : true
  );

  return averageAge(filteredWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = people.filter(person => onlyWithSon
    ? people.find(mother => mother.name === person.mother
      && person.sex === MALE)
    : people.find(mother => mother.name === person.mother)
  );

  const ageGap = filteredChildren.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return ageGap.reduce((acc, age) => acc + age) / ageGap.length;
}

function averageAge(people) {
  return people.reduce((acc, person) =>
    acc + (person.died - person.born), 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
