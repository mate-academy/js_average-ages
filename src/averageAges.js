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
    ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );
  const menAge = men.map(man => man.died - man.born);

  return menAge.reduce((sum, current) => sum + current, 0) / menAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? person.sex === 'f'
    && people.some(children => children.mother === person.name)
    : person.sex === 'f'
  );
  const womanAge = women.map(woman => woman.died - woman.born);

  return womanAge.reduce((sum, current) => sum + current, 0) / womanAge.length;
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
  const women = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    && people.some(woman => woman.name === person.mother)
    : people.some(woman => woman.name === person.mother)
  );
  const ageDiff = women.map(children => children.born
    - people.find(woman => woman.name === children.mother).born);

  return ageDiff.reduce((sum, current) => sum + current, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
