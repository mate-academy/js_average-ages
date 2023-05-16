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
function calculateAverage(people) {
  const sum = people.reduce((prev, person) =>
    (person.died - person.born) + prev, 0);

  return sum / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm'
  && (century ? Math.ceil(person.died / 100) === century : true));

  return calculateAverage(men);
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
  const women = people.filter(person => person.sex === 'f');
  const selectedWomen = withChildren
    ? women.filter(person => people.some(p => p.mother === person.name))
    : women;

  return calculateAverage(selectedWomen);
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
  const children = onlyWithSon
    ? people.filter(person => people.some(p => p.name === person.mother
      && person.sex === 'm'))
    : people.filter(person => people.some(p => p.name === person.mother));

  const totalAgeDiff = children.reduce((sum, child) => {
    const ageDiff = child.born - people.find(mother =>
      mother.name === child.mother).born;

    return ageDiff + sum;
  }, 0);

  return totalAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
