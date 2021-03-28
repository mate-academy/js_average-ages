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

const getCentury = (year) => {
  return Math.ceil(year / 100);
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(({ sex, died }) => {
    return sex === 'm' && (
      century === undefined || getCentury(died) === century
    );
  });
  const agesSum = men.map(({ born, died }) => died - born)
    .reduce((total, age) => total + age, 0);

  return agesSum / men.length;
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
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(({ name, sex }) => {
    return sex === 'f' && (
      !withChildren || people.some(({ mother }) => mother === name)
    );
  });

  const agesSum = women.map(({ born, died }) => died - born)
    .reduce((total, age) => total + age, 0);

  return agesSum / women.length;
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
  const children = people.filter(({ mother, sex }) => {
    const hasMother = people.some(({ name }) => name === mother);

    return hasMother && (!onlyWithSon || sex === 'm');
  });

  const agesDiffSum = children.map(({ mother, born }) => {
    const mothersDOB = people.find(({ name }) => name === mother).born;

    return born - mothersDOB;
  }).reduce((total, ageDiff) => total + ageDiff);

  return agesDiffSum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
