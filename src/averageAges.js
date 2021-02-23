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
  let i = 0;

  if (century === null) {
    const sum = people.reduce((accumulator, human) => {
      if (human.sex === 'm') {
        i++;

        return accumulator + human.died - human.born;
      } else {
        return accumulator;
      }
    }, 0);

    return sum / i;
  }

  if (typeof century === 'number') {
    const sum = people.reduce((accumulator, human) => {
      if (human.sex === 'm'
      && Math.ceil(human.died / 100) === century) {
        i++;

        return accumulator + human.died - human.born;
      } else {
        return accumulator;
      }
    }, 0);

    return sum / i;
  }
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

  if (withChildren === false) {
    return people.reduce((acc, human) => {
      if (human.sex === 'f') {
        i++;

        return acc + human.died - human.born;
      } else {
        return acc;
      }
    }, 0) / i;
  } else {
    return people.reduce((acc, human) => {
      if (haveChild(people, human)) {
        i++;

        return acc + human.died - human.born;
      } else {
        return acc;
      }
    }, 0) / i;
  }
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
  let child;
  let i = 0;

  if (onlyWithSon === false) {
    return people.reduce((acc, human) => {
      if (human.sex === 'f') {
        child = haveChild(people, human);
      } else {
        child = '';
      }

      if (human.name === child.mother) {
        i++;

        return acc + child.born - human.born;
      } else {
        return acc;
      }
    }, 0) / i;
  } else {
    return people.reduce((acc, human) => {
      if (human.sex === 'f') {
        child = haveChild(people, human);
      } else {
        child = '';
      }

      if (human.name === child.mother && child.sex === 'm') {
        i++;

        return acc + child.born - human.born;
      } else {
        return acc;
      }
    }, 0) / i;
  }
}

function haveChild(people, mother) {
  const sr = people.find((human) => mother.name === human.mother);

  if (sr !== undefined) {
    return sr;
  } else {
    return false;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
