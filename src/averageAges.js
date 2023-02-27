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
  const man = people.filter(human =>
    century
      ? (human.sex === 'm' && Math.ceil(human.died / 100) === century)
      : human.sex === 'm');

  return man.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / man.length;
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
  const woman = people.filter(human =>
    withChildren
      ? people.some(item => human.name === item.mother)
      : human.sex === 'f');

  return woman.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / woman.length;
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
  const childs = people.filter(child =>
    onlyWithSon
      ? people.find(item => child.mother === item.name)
      && child.sex === 'm'
      : people.find(item => child.mother === item.name));

  const mothers = childs.map(childItem =>
    people.find(mother => childItem.mother === mother.name));

  const ageDiff = childs.map((child, index) =>
    (child.born - mothers[index].born));

  const medianAgeDiff = ageDiff.reduce((sum, arg) => (sum + arg))
    / ageDiff.length;

  return medianAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
