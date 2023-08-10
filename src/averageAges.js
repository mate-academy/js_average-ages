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
  const MALE = 'm';
  const men = people.filter(({ sex }) => sex === MALE);

  const menDiedInCentury = century
    ? men.filter(({ died }) => Math.ceil(died / 100) === century)
    : men;

  const avgAgeMen = menDiedInCentury
    .map(({ born, died }) => died - born)
    .reduce((sum, age) => sum + age, 0) / menDiedInCentury.length;

  return avgAgeMen;
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
  const FEMALE = 'f';
  const women = people.filter(({ sex }) => sex === FEMALE);

  const womenWithChild = withChildren
    ? women.filter(woman => people.some(child => child.mother === woman.name))
    : women;

  const avgAgeWomen = womenWithChild
    .map(({ born, died }) => died - born)
    .reduce((sum, age) => sum + age, 0) / womenWithChild.length;

  return avgAgeWomen;
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
  const MALE = 'm';
  const children = onlyWithSon
    ? people.filter(({ sex }) => sex === MALE) : people;

  const peopleWithMother = children
    .map(child => {
      child.momObject = people.find(mom => mom.name === child.mother);

      return child;
    })
    .filter(child => child.momObject);

  const avgAgeDiff = peopleWithMother
    .reduce((prev, child) => prev + child.born - child.momObject.born, 0)
    / peopleWithMother.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
