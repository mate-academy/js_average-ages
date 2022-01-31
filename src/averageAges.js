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
  const men = century === undefined
    ? people.filter(m => m.sex === 'm')
    : people.filter(m => m.sex === 'm' && Math.ceil(m.died / 100) === century);

  const menAge = men.reduce((a, b) => a + b.died - b.born, 0);

  return menAge / men.length;
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
  const women = !withChildren
    ? people.filter(f => f.sex === 'f')
    : people.filter(f => f.sex === 'f'
      && people.some(child => child.mother === f.name));

  const womenAge = women.reduce((a, b) => a + b.died - b.born, 0);

  return womenAge / women.length;
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
  const mothers = !onlyWithSon
    ? people.filter(mother => mother.sex === 'f'
      && people.some(child => child.mother === mother.name))
    : people.filter(mother => (
      mother.sex === 'f'
      && people.some(child => child.mother === mother.name
      && child.sex === 'm'
      )));

  const childs = !onlyWithSon
    ? people.filter(child =>
      mothers.some(mother => child.mother === mother.name))
    : people.filter((child) => (
      mothers.some(mother => child.mother === mother.name)
      && child.sex === 'm'
    ));

  const differencies = [];

  childs.forEach(child => {
    const mother = mothers.find(m => m.name === child.mother);

    differencies.push(
      child.born - mother.born
    );
  });

  return differencies.reduce((a, b) => a + b) / differencies.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
