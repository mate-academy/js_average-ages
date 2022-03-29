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
function calculateMenAverageAge(people, century) {
  let newArray = [];
  let avgAge = 0;

  if (century === undefined) {
    newArray = people.filter(x => x.sex === 'm');

    avgAge = newArray.reduce((sum, x) => sum + x.died - x.born, 0)
    / newArray.length;

    return avgAge;
  }

  newArray = people.filter(x => x.sex === 'm'
  && Math.ceil(x.died / 100) === century);

  avgAge = newArray.reduce((sum, x) => sum + x.died - x.born, 0)
  / newArray.length;

  return avgAge;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let newArray = [];
  let avgAge = 0;

  if (withChildren === undefined) {
    newArray = people.filter(x => x.sex === 'f');

    avgAge = newArray.reduce((sum, x) => sum + x.died - x.born, 0)
    / newArray.length;

    return avgAge;
  }

  newArray = people.filter(a => a.sex === 'f'
  && people.find(x => x.mother === a.name));

  avgAge = newArray.reduce((sum, x) => sum + x.died - x.born, 0)
  / newArray.length;

  return avgAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  if (onlyWithSon === undefined) {
    let newArray = [];

    const result = people.filter(a =>
      people.find(x => x.name === a.mother)).map(a => {
      const motherObj = people.find(x => x.name === a.mother);

      return a.born - motherObj.born;
    });

    newArray = result.reduce((sum, x) => sum + x, 0) / result.length;

    return newArray;
  } else {
    let newArray = [];

    const result = people.filter(a => a.sex === 'm'
    && people.find(x => x.name === a.mother)).map(a => {
      const motherObj = people.find(x => x.name === a.mother);

      return a.born - motherObj.born;
    });

    newArray = result.reduce((sum, x) => sum + x, 0) / result.length;

    return newArray;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
