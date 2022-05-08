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
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  return men.map((man) => man.died - man.born)
    .reduce((a, b) => a + b) / men.length;
};
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return women.map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b) / women.length;
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
  const childrens = people.filter(person => {
    return people.some(mother => mother.name === person.mother);
  });

  const allSons = people.filter(child => {
    return people.some(mother => mother.name === child.mother)
    && (child.sex === 'm');
  });

  const activeChild = onlyWithSon ? allSons : childrens;

  const age = activeChild.map(child => {
    const childMom = people.find(mother => {
      return mother.name === child.mother;
    });

    return child.born - childMom.born;
  });

  return age.reduce((prevAge, nextAge) => prevAge + nextAge, 0) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
