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
function averageAge(array) {
  return array.reduce(
    (sum, elem) => sum + (elem.died - elem.born), 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => !century
    ? person.sex === 'm'
    : person.sex === 'm' && Math.ceil(person.died / 100) === century);

  return averageAge(men);
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
  const women = people.filter(person => !withChildren
    ? person.sex === 'f'
    : person.sex === 'f' && people.some(child => child.mother === person.name));

  return averageAge(women);
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
  const children = people.filter(child => people.some(mother => {
    return !onlyWithSon
      ? mother.name === child.mother
      : mother.name === child.mother && child.sex === 'm';
  }));

  const averageAges = children.reduce((sum, child) => {
    const mothers = people.find(mother => child.mother === mother.name);

    return sum + (child.born - mothers.born);
  }, 0) / children.length;

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
