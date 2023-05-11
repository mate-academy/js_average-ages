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
const calculateSumAges = (filteredPeople) => {
  return filteredPeople.reduce((sum, person) => {
    const personsAge = person.died - person.born;

    return sum + personsAge;
  }, 0);
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredMen = people.filter((person) => (
    !century
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century
  ));

  const menAgeSum = calculateSumAges(filteredMen);

  return menAgeSum / filteredMen.length;
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
  const filteredWomen = people.filter((person) => (
    !withChildren
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(child => child.mother === person.name)
  ));

  const womenAgeSum = calculateSumAges(filteredWomen);

  return womenAgeSum / filteredWomen.length;
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
  const childWithMother = people.filter(child => (
    !onlyWithSon
      ? people.some(mother => mother.name === child.mother)
      : people.some(mother => mother.name === child.mother && child.sex === 'm')
  ));

  const sumAgesDifference = childWithMother.reduce((sum, child) => {
    const motherBirth = people.find(mother => (
      mother.name === child.mother
    )).born;
    const ageDifference = child.born - motherBirth;

    return sum + ageDifference;
  }, 0);

  return sumAgesDifference / childWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
