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
  const filteredPeople = people.filter(el => (
    (Math.ceil(el.died / 100) === (century || Math.ceil(el.died / 100)))
   && (el.sex !== 'f')));

  return filteredPeople.reduce((total, male) =>
    total + (male.died - male.born), 0) / filteredPeople.length;
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
  const filteredPeople = !withChildren
    ? people.filter(el => (el.sex !== 'm'))
    : people.filter(el => (people.find(child => el.name === child.mother)));

  return filteredPeople.reduce((total, female) =>
    total + (female.died - female.born), 0) / filteredPeople.length;
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
  const onlyChid = !onlyWithSon
    ? people.filter(child => people.find(mother => (
    child.mother === mother.name)))
    : people.filter(child => (people.find(mother =>child.mother === mother.name
     && child.sex === 'm')));

  return onlyChid.reduce((total, child) => {
    return total + child.born - people.find(mother => (
      child.mother === mother.name)).born;
  }, 0) / onlyChid.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
