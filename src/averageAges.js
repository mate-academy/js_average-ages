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
  const men = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));
  const totalAge = men.reduce((sum, man) => sum + man.died - man.born, 0);

  return totalAge / men.length;
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
  const mothers = people.map(person => person.mother);

  const women = people.filter(person => person.sex === 'f'
    && (!withChildren || mothers.includes(person.name)));

  const totalAge = women.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0);

  return (totalAge / women.length);
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
  const mothersArr = people.filter(person => person.sex === 'f');
  const childrenArr = people.filter(person => person.mother
    && mothersArr.some(mother => mother.name === person.mother));
  const sonsList = childrenArr.filter(children => children.sex === 'm');

  const selectedList = onlyWithSon
    ? sonsList
    : childrenArr;
  const averageAgeDiff = selectedList.reduce((sum, child) => (
    sum + child.born - mothersArr.find(mother => (
      mother.name === child.mother)).born
  ), 0) / selectedList.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
