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
  const man = people.filter((person) => (
    century
      ? isMale(person) && Math.ceil(person.died / 100) === century
      : isMale(person)));

  return averageAge(man);
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
  const women = people.filter(mother => withChildren
    ? people.some(child => child.mother === mother.name)
    : mother.sex === 'f');

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
  const children = people.filter(child => onlyWithSon
    ? isMale(child) && people.find(mother => child.mother === mother.name)
    : people.find(mother => child.mother === mother.name));

  const diff = children.map(child => child.born
    - people.find(mother => child.mother === mother.name).born);

  return diff.reduce((acc, cur) => acc + cur, 0) / diff.length;
}

function averageAge(group) {
  const sum = group.reduce((a, b) => a + (b.died - b.born), 0);

  return sum / group.length;
}

function isMale(person) {
  return person.sex === 'm';
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
