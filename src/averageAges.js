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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter((person) => (person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true)));
  const ageSum = men
    .reduce((total, next) => (total + next.died - next.born), 0);

  return ageSum / men.length;
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
  // write code here
  const women = people
    .filter((person) => person.sex === 'f'
    && (withChildren ? people
      .some((child) => child.mother === person.name) : true));
  const ageSum = women
    .reduce((total, next) => total + next.died - next.born, 0);

  return ageSum / women.length;
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
  // write code here
  const mothers = people
    .filter((person) => people.some((child) => child.mother === person.name
    && (onlyWithSon ? child.sex === 'm' : true)));

  let childrenCount = 0;

  const mothersBirthAges = mothers.map((person) => {
    const children = people.filter((child) => child.mother === person.name
      && (onlyWithSon ? child.sex === 'm' : true));

    childrenCount += children.length;

    const motherBirthAge = children
      .map((child) => child.born - person.born);

    return motherBirthAge.reduce((total, next) => total + next);
  });

  return mothersBirthAges.reduce((total, next) => total + next) / childrenCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
