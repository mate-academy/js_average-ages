'use strict';

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

function calculateMenAverageAge(people, century = null) {
  let averageAges;

  century === null ? averageAges = people.filter((human) => human.sex === 'm')
    : averageAges = people.filter((human) =>
      human.sex === 'm' && Math.ceil(human.died / 100) === century);

  return averageAges.reduce((acc, man) =>
    acc + man.died - man.born, 0) / averageAges.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren = false) {
  let i = 0;
  const averageAges = withChildren ? people.reduce((acc, human) => {
    if (haveChild(people, human)) {
      i++;

      return acc + human.died - human.born;
    } else {
      return acc;
    }
  }, 0)
    : people.reduce((acc, human) => {
      if (human.sex === 'f') {
        i++;

        return acc + human.died - human.born;
      } else {
        return acc;
      }
    }, 0);

  return averageAges / i;
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

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let i = 0;
  let child;

  const averageAges = onlyWithSon ? people.reduce((acc, human) => {
    child = (human.sex === 'f') ? haveChild(people, human) : '';

    if (human.name === child.mother && child.sex === 'm') {
      i++;

      return acc + child.born - human.born;
    } else {
      return acc;
    }
  }, 0) / i
    : people.reduce((acc, human) => {
      child = (human.sex === 'f') ? haveChild(people, human) : '';

      if (human.name === child.mother) {
        i++;

        return acc + child.born - human.born;
      } else {
        return acc;
      }
    }, 0) / i;

  return averageAges;
}

function haveChild(people, mother) {
  const child = people.find((human) => mother.name === human.mother);

  return (child !== undefined) ? child : false;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
