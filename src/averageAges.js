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
  const menList = people.filter(person =>
    person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century)
  );

  const menSumAge = menList.reduce((
    sum, man) => sum + (man.died - man.born
  ), 0);

  const menAverageAge = menSumAge / menList.length;

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
  const womenList = people.filter(person =>
    person.sex === 'f'
    && (!withChildren || people.some(child => child.mother === person.name))
  );

  const womenSumAge = womenList.reduce((
    sum, woman) => sum + (woman.died - woman.born
  ), 0);

  const womenAverageAge = womenSumAge / womenList.length;

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
  const childrenList = people.filter(person =>
    people.some(mother => person.mother === mother.name)
    && (!onlyWithSon || person.sex === 'm')
  );

  const sumAgeDiff = childrenList.reduce((
    sum, child) => sum + (child.born - people.find(
    mother => child.mother === mother.name).born
  ), 0);

  const averageAgeDiff = sumAgeDiff / childrenList.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
