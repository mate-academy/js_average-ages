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

  const men = people.filter((person) => (
    person.sex === 'm' && (!century || Math.ceil(person.died / 100) === century)
  ));

  return men.reduce((total, man) => (
    total + man.died - man.born), 0) / men.length;
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
  const women = people.filter((person) => (
    person.sex === 'f'
    && (!withChildren || people.some((child) => child.mother === person.name))
  ));

  return women.reduce((total, woman) => (
    total + woman.died - woman.born), 0) / women.length;
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
  const mothers = people.filter((person) => (
    people.some((child) => (
      child.mother === person.name && (!onlyWithSon || child.sex === 'm')
    ))
  ));

  const mothersBirthAges = mothers.map((person) => {
    const children = people.filter((child) => (
      child.mother === person.name && (!onlyWithSon || child.sex === 'm')
    ));

    const motherBirthAge = children
      .map((child) => child.born - person.born);

    return motherBirthAge;
  });

  const allBirthAges = mothersBirthAges
    .reduce((allAges, motherAges) => allAges.concat(motherAges));

  return allBirthAges
    .reduce((total, ageSum) => total + ageSum) / allBirthAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
