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
  const men = people.filter(person => century
    ? person.sex === 'm' && (Math.ceil(person.died / 100) === century)
    : person.sex === 'm');

  const menAverageAge = men.map(person => person.died - person.born
  ).reduce((sum, digits) => (
    sum + digits
  ), 0) / (men.length);

  return menAverageAge;
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(children =>
      person.name === children.mother)
    : person.sex === 'f');

  const womenAverageAge = women.map(person => person.died - person.born
  ).reduce((sum, digits) => (
    sum + digits
  ), 0) / (women.length);

  return womenAverageAge;
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
  const mothers = people.filter(person => onlyWithSon
    ? person.sex === 'f' && people.some(children =>
      (person.name === children.mother) && children.sex === 'm')
    : person.sex === 'f' && people.some(children =>
      person.name === children.mother));

  const child = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother =>
      (mother.name === person.mother))
    : people.some(mother =>
      (mother.name === person.mother)));

  const averageAgeDifference = child.map(person => (
    person.born - mothers.find(mother =>
      person.mother === mother.name).born)
  ).reduce((sum, digits) => (
    sum + digits
  ), 0) / (child.length);

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
