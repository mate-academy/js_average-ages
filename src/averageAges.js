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
  const men = people.filter(person => person.sex === 'm');

  const averageAgeOfMen = men.reduce((sum, man) =>
    (sum + man.died - man.born), 0) / men.length;

  const menDiedCentury = men.filter(man =>
    Math.ceil(man.died / 100) === century);

  const averageAgeOfMenCentury = menDiedCentury.reduce((sum, man) =>
    (sum + man.died - man.born), 0) / menDiedCentury.length;

  return century ? averageAgeOfMenCentury : averageAgeOfMen;
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
  const women = people.filter(person => person.sex === 'f');

  const averageAgeOfWomen = women.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0) / women.length;

  const allmothers = people.map(person => person.mother);

  const womenWithChild = women.filter(woman =>
    allmothers.some(mother => mother === woman.name));

  const averageAgeOfWomensWithChild = womenWithChild.reduce((sum, woman) =>
    (sum + woman.died - woman.born), 0) / womenWithChild.length;

  return withChildren ? averageAgeOfWomensWithChild : averageAgeOfWomen;
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
  const womenWithChild = people.filter(woman =>
    people.find(person => woman.name === person.mother));

  const children = people.filter(child =>
    womenWithChild.find(mother => mother.name === child.mother));

  const ageDifference = children.map(child =>
    child.born - womenWithChild.find(mother =>
      mother.name === child.mother).born);

  const averageAgeDifferenceChild = ageDifference.reduce((sum, diff) =>
    sum + diff) / ageDifference.length;

  const sons = children.filter(child => child.sex === 'm');

  const ageDifferenceSons = sons.map(son =>
    son.born - womenWithChild.find(mother =>
      mother.name === son.mother).born);

  const averageAgeDifferenceSons = ageDifferenceSons.reduce((sum, diff) =>
    sum + diff) / ageDifferenceSons.length;

  return onlyWithSon ? averageAgeDifferenceSons : averageAgeDifferenceChild;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
