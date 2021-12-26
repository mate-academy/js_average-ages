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
  const men = century ? people.filter(person =>
    (Math.ceil(person.died / 100)) === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  return men.reduce((sum, man) => sum + (man.died - man.born), 0) / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren ? people.filter(person =>
    people.some(child => child.mother === person.name) && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  return women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0
  ) / women.length;
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
  const children = onlyWithSon ? people.filter(child => people.some(mother =>
    mother.name === child.mother) && child.sex === 'm')
    : people.filter(child => people.some(mother =>
      mother.name === child.mother));

  const result = children.reduce((sum, child) => {
    const mothers = people.find(mother => mother.name === child.mother);

    return sum + (child.born - mothers.born);
  }, 0) / children.length;

  return result;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
