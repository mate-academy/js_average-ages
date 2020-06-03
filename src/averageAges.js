'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    return century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century;
  });

  const ageSum = men.reduce((accumulator, man) => {
    return accumulator + man.died - man.born;
  }, 0);

  return ageSum / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => {
    return !withChildren
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(child => {
        return person.name === child.mother;
      });
  });

  const ageSum = women.reduce((accumulator, woman) => {
    return accumulator + woman.died - woman.born;
  }, 0);

  return ageSum / women.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => {
    return people.some(mother => {
      return !onlyWithSon
        ? person.mother === mother.name
        : person.mother === mother.name && person.sex === 'm';
    });
  });

  function ageSum(accumulator, child) {
    const mother = people.find(person => child.mother === person.name);

    return accumulator + child.born - mother.born;
  }

  return children.reduce(ageSum, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
