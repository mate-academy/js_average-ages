'use strict';

/* Implement calculateMenAverageAge function
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
  const men = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));

  const totalAverage = men.reduce((acc, man) => (
    acc + man.died - man.born
  ), 0);

  return (totalAverage / men.length);
}

/* Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If withChildren is
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
  const mothersList = people.map(person => person.mother);

  const women = people.filter(person => person.sex === 'f'
    && (!withChildren || mothersList.includes(person.name)));

  const totalAverage = women.reduce((acc, woman) => (
    acc + woman.died - woman.born
  ), 0);

  return (totalAverage / women.length);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If onlyWithSon is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothersList = people.filter(person => person.sex === 'f');
  const childrenList = people.filter(person => person.mother
    && mothersList.some(mother => mother.name === person.mother));
  const sonsList = childrenList.filter(children => children.sex === 'm');

  const selectedList = onlyWithSon
    ? sonsList
    : childrenList;
  const averageAgeDiff = selectedList.reduce((acc, child) => (
    acc + child.born - mothersList.find(mother => (
      mother.name === child.mother)).born
  ), 0) / selectedList.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
