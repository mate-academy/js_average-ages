'use strict';

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

  return calculateAverageAge(onlyMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f'
  );

  return calculateAverageAge(onlyWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const onlyMothers = people.filter(person =>
    people.some(child => child.mother === person.name)
  );

  const onlyChildren = people.filter(child => {
    return people.some(mother =>
      onlyWithSon
        ? child.mother === mother.name && child.sex === 'm'
        : child.mother === mother.name
    );
  });

  const averageAgeDiffer = onlyChildren.reduce((sumAges, child) => {
    const { born: childBorn } = child;
    const { born: motherBorn } = onlyMothers.find(person => {
      return person.name === child.mother;
    });

    return sumAges + childBorn - motherBorn;
  }, 0) / onlyChildren.length;

  return averageAgeDiffer;
}

function calculateAverageAge(people) {
  const averageAge = people.reduce((sumAges, person) => {
    return sumAges + person.died - person.born;
  }, 0) / people.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
