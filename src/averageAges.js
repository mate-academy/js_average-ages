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
  const getMen = person => person.sex === 'm';
  const getDiedBeforeCentury = person =>
    Math.ceil(person.died / 100) === century || !century;
  const getMenAge = person => person.died - person.born;

  const menAge = people
    .filter(getMen)
    .filter(getDiedBeforeCentury)
    .map(getMenAge);

  const sumAge = menAge.reduce((previous, currentValue) => {
    return previous + currentValue;
  }, 0);

  const averageAge = sumAge / menAge.length;

  return averageAge;
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
function calculateWomenAverageAge(people, withChildren) {
  const getWomen = person => person.sex === 'f';
  const getWomenWithChildren = woman => people
    .some(child => child.mother === woman.name) || !withChildren;
  const getWomenAge = person => person.died - person.born;

  const womenAge = people
    .filter(getWomen)
    .filter(getWomenWithChildren)
    .map(getWomenAge);

  const sumAge = womenAge.reduce((previous, currentValue) => {
    return previous + currentValue;
  }, 0);

  const averageAge = sumAge / womenAge.length;

  return averageAge;
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
  const getWomen = person => person.sex === 'f';
  const getWomenWithChildren = woman => people.some(child =>
    child.mother === woman.name);
  const getChildrenWithWothers = person =>
    mothers.find(woman => woman.name === person.mother);
  const getMothersWithSons = child => child.sex === 'm' || !onlyWithSon;
  const getMotherOfChild = child => {
    const motherOfChild = mothers
      .find(mother => child.mother === mother.name);

    return child.born - motherOfChild.born;
  };

  const mothers = people
    .filter(getWomen)
    .filter(getWomenWithChildren);

  const children = people
    .filter(getChildrenWithWothers)
    .filter(getMothersWithSons);

  const ageDifference = children.map(getMotherOfChild);

  const sumAge = ageDifference.reduce((previous, currentValue) => {
    return previous + currentValue;
  }, 0);

  const averageAge = sumAge / ageDifference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
