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
function calculateMenAverageAge(people, century = 0) {
  const menList = people.filter(person => century > 0
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');
  let MenAverageAge = menList.reduce((sumAgeMan, currenAgeMan) =>
    sumAgeMan + (currenAgeMan.died - currenAgeMan.born), 0);

  MenAverageAge = MenAverageAge / menList.length;

  return MenAverageAge;
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
  const womenList = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f');
  let WomenTotalAge = womenList.reduce((sumAgeWoman, woman) =>
    sumAgeWoman + (woman.died - woman.born), 0);

  WomenTotalAge = WomenTotalAge / womenList.length;

  return WomenTotalAge;
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
  const IsMother = child => people.some(woman => woman.name === child.mother);
  const children = people.filter(child =>
    onlyWithSon ? child.sex === 'm' && IsMother(child)
      : IsMother(child));

  const differentAge = children.map(child => child.born
    - people.find(mom => mom.name === child.mother).born);
  const averageDiffAge = differentAge.reduce((sum, age) =>
    sum + age) / children.length;

  return averageDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
