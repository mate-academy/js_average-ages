'use strict';

function calculateMenAverageAge(people, century) {
  const relevantPeople = people.filter(person => {
    const centuryOfPersonDied = Math.ceil(person.died / 100);

    return (centuryOfPersonDied === century || !century) && person.sex === 'm';
  });

  const sumOfAgesRelevantPeople
  = relevantPeople.reduce((accum, currentValue) => {
    const personAge = currentValue.died - currentValue.born;

    return accum + personAge;
  }, 0);

  const averageAgeOfRelevantPeople = sumOfAgesRelevantPeople
    / relevantPeople.length;

  return averageAgeOfRelevantPeople;
}
// learn how to use array methods like .  filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const mothers = people.filter(person => {
    return (person.sex === 'f'
    && (people.find(child => child.mother === person.name) || !withChildren));
  });

  const sumOfAgesMothers
  = mothers.reduce((accum, currentValue) => {
    const personAge = currentValue.died - currentValue.born;

    return accum + personAge;
  }, 0);

  const averageAgeOfMothers = sumOfAgesMothers
    / mothers.length;

  return averageAgeOfMothers;
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
    people.some(person => person.name === child.mother));

  const sons = people.filter(child =>
    people.some(person => person.name === child.mother && child.sex === 'm'));

  const sonsConditionArray = onlyWithSon ? sons : children;

  const SumOfDifferenceAge = sonsConditionArray.reduce((prev, child) => {
    const childeMother = people.find(mother => mother.name === child.mother);

    return prev + (child.born - childeMother.born);
  }, 0);

  const averageDifferenceAge = SumOfDifferenceAge / sonsConditionArray.length;

  return averageDifferenceAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
