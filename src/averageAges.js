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

  const menOfCentury = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const agesOfMen = menOfCentury.map(man => man.died - man.born);

  const sumOfAges = agesOfMen.reduce((a, b) => (a + b), 0);

  return sumOfAges / menOfCentury.length;
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
  const allWomen = people.filter(person => person.sex === 'f');

  const mothers = people.map(person => person.mother);

  const womenWithChildren = allWomen.filter(
    woman => mothers.includes(woman.name)
  );

  const women = withChildren ? womenWithChildren : allWomen;

  const agesOfWomen = women.map(woman => woman.died - woman.born);

  const sumOfAges = agesOfWomen.reduce((a, b) => (a + b), 0);

  return sumOfAges / women.length;
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
  const allChildren = people
    .filter(person => people
      .some(woman => woman.name === person.mother));

  const sons = allChildren.filter(child => child.sex === 'm');

  const children = onlyWithSon ? sons : allChildren;

  const ageDifferences = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  const sumOfageDifferences = ageDifferences.reduce((a, b) => (a + b), 0);

  const avgAgeDifference = sumOfageDifferences / ageDifferences.length;

  return avgAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
