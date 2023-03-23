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
  const men = people.filter(eachMan => eachMan.sex === 'm');
  const centuryMen = men.filter(man => Math.ceil(man.died / 100) === century);

  return century
    ? centuryMen.reduce((acc, human) => (
      acc + human.died - human.born)
    , 0) / centuryMen.length
    : (men.reduce((acc, human) => (
      acc + human.died - human.born)
    , 0) / men.length);
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
  const women = people.filter(eachWomen => eachWomen.sex === 'f');

  const mothers = women.filter(eachWomen =>
    people.some(eachPeople => eachPeople.mother === eachWomen.name));

  return withChildren
    ? mothers.reduce((acc, human) => (
      acc + human.died - human.born
    ), 0) / mothers.length
    : (women.reduce((acc, human) => (
      acc + human.died - human.born
    ), 0) / women.length);
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
  const mothers = people.filter(eachWomen =>
    people.some(eachPeople => eachPeople.mother === eachWomen.name));

  const peopleWithMothers = people.filter(man =>
    mothers.some(mom => mom.name === man.mother));
  const sonsWithMothers = peopleWithMothers.filter(man => man.sex === 'm');

  return onlyWithSon
    ? sonsWithMothers.reduce((acc, child) => (
      acc + child.born - mothers.find(mom => (
        mom.name === child.mother)
      ).born
    ), 0) / sonsWithMothers.length
    : peopleWithMothers.reduce((acc, child) => (
      acc + child.born - mothers.find(mom => (
        mom.name === child.mother)
      ).born
    ), 0) / peopleWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
