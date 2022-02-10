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
  const menArray = century
    ? people
      .filter(person => person.sex === 'm')
      .filter(person => century === Math.ceil(person.died / 100))
    : people.filter(person => person.sex === 'm');

  const yearsSum = menArray.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return yearsSum / menArray.length;
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
  const mothersArray = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => person.name === child.mother))
    : people.filter(person => person.sex === 'f');

  const yearsSum = mothersArray.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  return yearsSum / mothersArray.length;
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
  const childrenArray = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.some(mother => person.mother === mother.name))
    : people.filter(person =>
      people.some(mother => person.mother === mother.name));

  const yearsSum = childrenArray.reduce((prev, person) => {
    return prev
      + (person.born
      - (people.find(mother => person.mother === mother.name).born));
  }, 0);

  return yearsSum / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
