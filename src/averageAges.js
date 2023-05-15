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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const agesOfMen = people
    .filter(({ sex, died }) => sex === 'm' && isDiedInCentury(died, century))
    .map(person => person.died - person.born);
  const totalAges = agesOfMen.reduce((a, b) => a + b, 0);

  return (totalAges / agesOfMen.length) || 0;
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
  const agesOfWomen = people
    .filter(person => {
      const isMother = !withChildren || isHasChildren(people, person.name);

      return person.sex === 'f' && isMother;
    })
    .map(person => person.died - person.born);
  const totalAges = agesOfWomen.reduce((a, b) => a + b, 0);

  return (totalAges / agesOfWomen.length) || 0;
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
  const mothers = people.filter(person => isHasChildren(people, person.name));
  const children = people
    .filter(child => {
      const motherNames = mothers.map(mom => mom.name);

      return motherNames
        .includes(child.mother) && (!onlyWithSon || child.sex === 'm');
    });
  const differenceAges = children.map(child => {
    const mother = mothers.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });
  const totalDifferenceAges = differenceAges.reduce((a, b) => a + b, 0);

  return (totalDifferenceAges / differenceAges.length) || 0;
}

function isDiedInCentury(died, initialCentury) {
  const centuryOfDied = Math.ceil(died / 100);
  const century = initialCentury || centuryOfDied;

  return centuryOfDied === century;
}

function isHasChildren(people, motherName) {
  return people.some(person => person.mother === motherName);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
