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
  let mens = [...people].filter(human => century
    ? human.sex === 'm' && Math.ceil(human.died / 100) === century
    : human.sex === 'm');

  mens = mens.map(men => (men.died - men.born));

  return mens.reduce((a, b) => a + b) / mens.length;
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
  let woman = [...people].filter(human => withChildren
    ? human.sex === 'f' && people.some(diva => (diva.mother === human.name))
    : human.sex === 'f');

  woman = woman.map(diva => (diva.died - diva.born));

  return woman.reduce((a, b) => a + b) / woman.length;
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
  let childs = [...people].filter(human => onlyWithSon
    ? human.mother !== null && human.sex === 'm'
    : human.mother !== null);

  childs = childs.filter(child => (
    people.some(woman => woman.name === child.mother)
  ));

  childs = childs.map(child => {
    const mother = people.find(human => human.name === child.mother);

    return child.born - mother.born;
  });

  return childs.reduce((a, b) => a + b) / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
