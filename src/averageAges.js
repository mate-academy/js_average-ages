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
  const menArr = people.filter((person) => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  const age = menArr.map((man) => man.died - man.born);
  const result = age.reduce((prev, x) => prev + x);

  return (result / menArr.length);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const womenArr = people.filter((woman) => withChildren
    ? woman.sex === 'f' && people.some((person) => person.mother === woman.name)
    : woman.sex === 'f');

  const age = womenArr.map((woman) => woman.died - woman.born);
  const result = age.reduce((prev, x) => prev + x);

  return (result / womenArr.length);
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.some(mother => mother.name === child.mother && child.sex === 'm')
      : people.some(mother => mother.name === child.mother));

  children.map((item) => (item.motherBorn
    = people.find(woman => woman.name === item.mother)));

  const existingMothers
    = children.filter(woman => (woman.motherBorn));

  const difference
    = existingMothers.map(person => person.born - person.motherBorn.born);

  const averageDifference
    = (difference.reduce((sum, current) => sum + current) / difference.length);

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
