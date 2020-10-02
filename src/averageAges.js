'use strict';

const averageAge = (sumAges, person) => {
  const age = person.died - person.born;
  const newSumAges = sumAges + age;

  return newSumAges;
};

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

const specialFilter = (person, condition, value, i, arr) => {
  switch (condition) {
    case 'century':
      return (value ? person.sex === 'm'
      && Math.ceil(person.died / 100) === value
        : person.sex === 'm');

    case 'children':
      return (value ? person.sex === 'f'
      && arr.some(isMother => person.name === isMother.mother)
        : person.sex === 'f');

    case 'son':
      return value ? person.sex === 'f'
      && arr.some(isMother => {
        return person.name === isMother.mother && isMother.sex === 'm';
      })
        : person.sex === 'f'
        && arr.some(isMother => person.name === isMother.mother);
  }
};

function calculateMenAverageAge(people, century) {
  const onlyMen = people
    .filter(person => specialFilter(person, 'century', century));

  return onlyMen.reduce(averageAge, 0) / onlyMen.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

const averageAgeDiff = (sumAges, mom, arr) => {
  const child = arr.find(person => mom.name === person.mother);
  const age = child.born - mom.born;
  const newSumAges = sumAges + age;

  return newSumAges;
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter((person, i, arr) => {
    return specialFilter(person, 'children', withChildren, i, arr);
  });

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
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const onlyWomen = people.filter((person, i, arr) => {
    return specialFilter(person, 'son', onlyWithSon, i, arr);
  });

  return onlyWomen
    .reduce((sumAges, mom) => averageAgeDiff(sumAges, mom, people), 0)
      / onlyWomen.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
