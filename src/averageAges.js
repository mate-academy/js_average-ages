'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  return calcAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? people.some(mother => person.name === mother.mother)
    : person.sex === 'f'
  );

  return calcAverageAge(women);
}

function calcAverageAge(people) {
  const ages = people.map(person => person.died - person.born);
  const sum = ages.reduce((age1, age2) => age1 + age2, 0);

  return sum / people.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => onlyWithSon
    ? people.some(mother => person.mother === mother.name) && person.sex === 'm'
    : people.some(mother => person.mother === mother.name)
  );

  const agesDiff = children.map(
    child => child.born - people.find(
      mother => child.mother === mother.name
    ).born
  );
  const sum = agesDiff.reduce(
    (age1, age2) => age1 + age2, 0
  );

  return sum / agesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
