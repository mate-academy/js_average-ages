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
  const men = (people.filter(persone => century ? persone.sex === 'm'
    && (Math.ceil(persone.died / 100) === century) : persone.sex === 'm'));

  const ages = men.map((persone) => persone.died - persone.born);
  const menAverageAge = ages.reduce((sum, i) => sum + i) / ages.length;

  return menAverageAge;
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
  const women = (people.filter(persone => withChildren
    ? persone.sex === 'f' && people.find(children =>
      children.mother === persone.name)
    : persone.sex === 'f'));

  const ages = women.map((persone) => persone.died - persone.born);
  const womenAverageAge = ages.reduce((sum, i) => sum + i) / ages.length;

  return womenAverageAge;
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
  const women = people.filter(woman => onlyWithSon
    ? people.find(child => child.mother === woman.name && child.sex === 'm')
    : people.find(child => child.mother === woman.name));

  const children = people.filter(child => onlyWithSon
    ? people.find(woman => woman.name === child.mother)
    && child.sex === 'm'
    : people.find(woman => woman.name === child.mother));

  const agesDiff = children.map(child =>
    (child.born - women.find(woman => child.mother === woman.name).born));

  const averageAgeDiff = agesDiff.reduce((sum, age) =>
    sum + age) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
