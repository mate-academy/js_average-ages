'use strict';

const specialFilter = (person, condition, value, i, arr) => {
  switch (condition) {
    case 'century':
      return (value ? person.sex === 'm'
      && Math.ceil(person.died / 100) === value
        : person.sex === 'm');

    case 'children':
      return (value ? arr.some(isMother => person.name === isMother.mother)
        : person.sex === 'f');

    case 'son':
      return value ? arr
        .some(child => child.name === person.mother && person.sex === 'm')
        : arr.some(child => child.name === person.mother);
  }
};

const averageAge = (sumAges, person) => {
  const age = person.died - person.born;

  return sumAges + age;
};

function calculateMenAverageAge(people, century) {
  const onlyMen = people
    .filter(person => specialFilter(person, 'century', century));

  return onlyMen.reduce(averageAge, 0) / onlyMen.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter((person, i, arr) =>
    specialFilter(person, 'children', withChildren, i, arr)
  );

  return onlyWomen.reduce(averageAge, 0) / onlyWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((person, i, arr) =>
    specialFilter(person, 'son', onlyWithSon, i, arr)
  );

  const ages = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born
  );

  return ages.reduce((sum, age) => sum + age) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
