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
function calculateMenAverageAge(people, century = false) {
  const menList = people.filter(person => {
    return (century !== false)
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const menAgeSum = menList.reduce((accum, man) => {
    return accum + (man.died - man.born);
  }, 0);

  return Number((menAgeSum / menList.length).toFixed(2));
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
function calculateWomenAverageAge(people, withChildren = false) {
  const mothersNamesList = people.map(person => person.mother);

  const womenList = people.filter(person => {
    return withChildren
      ? mothersNamesList.includes(person.name)
      : person.sex === 'f';
  });

  const womenAgeSum = womenList.reduce((accum, women) => {
    return accum + (women.died - women.born);
  }, 0);

  return Number((womenAgeSum / womenList.length).toFixed(2));
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const mothersNamesList = people.map(person => person.mother);

  const mothersList = people.filter(person => {
    return mothersNamesList.includes(person.name);
  });

  const childrenList = people.filter(person => {
    return onlyWithSon
      ? mothersList.some(mom => mom.name === person.mother)
      && person.sex === 'm'
      : mothersList.some(mom => mom.name === person.mother);
  });

  const bornAge = childrenList.reduce((accum, child) => {
    const childsMom = mothersList.find(mom => mom.name === child.mother);

    return accum + child.born - childsMom.born;
  }, 0);

  return Number((bornAge / childrenList.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
