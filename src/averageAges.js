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
function calculateAverageAge(people) {
  return people.reduce(
    (acc, { died, born }) => acc + died - born, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const filteredMan = people.filter(({ sex, died }) =>
    sex === 'm' && ((!century || Math.ceil(died / 100) === century)));

  const averageAge = calculateAverageAge(filteredMan);

  return averageAge;
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
  const filteredWomen = people.filter(({ sex, name }) => sex === 'f'
    && (!withChildren || people.some(({ mother }) => mother === name)));

  const averageAge = calculateAverageAge(filteredWomen);

  return averageAge;
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
  const mothers = people.filter(({ sex, name }) => sex === 'f'
    && people.some(({ mother }) => mother === name));

  const filteredChildren = people.filter(({ mother, sex }) => {
    const hasMother = people.some(({ name }) => name === mother);

    return hasMother && (!onlyWithSon || sex === 'm');
  });

  const averageMothersAge = filteredChildren.map(child => {
    const foundMother = mothers.find(mother => mother.name === child.mother);

    return child.born - foundMother.born;
  });

  const result = averageMothersAge.reduce((sum, item) =>
    sum + item, 0) / averageMothersAge.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
