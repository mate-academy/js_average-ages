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

  const men = people.filter(({ sex, died }) => century
    ? sex === 'm' && Math.ceil(died / 100) === century
    : sex === 'm');

  const mensAge = men.reduce((accValue, { died, born }) => {
    return accValue + (died - born);
  }, 0);

  return mensAge / men.length;
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

  const mothers = people.reduce((acc, person) => {
    acc[person.mother] = person.name;

    return acc;
  }, {});

  const women = people.filter(person =>
    withChildren
      ? mothers[person.name]
      : person.sex === 'f');

  const result = women.reduce((accValue, { died, born }) => {
    return accValue + (died - born);
  }, 0);

  return result / women.length;
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
  const mothers = people.reduce((acc, person) => {
    acc[person.name] = person;

    return acc;
  }, {});

  const motherWithChildren = people.filter(child =>
    onlyWithSon
      ? mothers[child.mother]
         && child.sex === 'm'
      : mothers[child.mother]
  );

  const calculateAge = motherWithChildren.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const averageAge = calculateAge.reduce((sum, age) =>
    sum + age) / calculateAge.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
