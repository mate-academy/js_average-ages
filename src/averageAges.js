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
  const mens = people.filter(person => (person.sex === 'm'));

  const centurySpecified = century !== undefined
    ? mens.filter(men => (Math.ceil(men.died / 100)) === century)
    : mens;

  const averageAge = centurySpecified.reduce((prev, curr) =>
    prev + curr.died - curr.born, 0) / centurySpecified.length;

  return averageAge;
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
  const womans = people.filter(person => (person.sex === 'f'));

  const hasChildren = withChildren !== undefined
    ? womans.filter(woman =>
      people.some(person => person.mother === woman.name))
    : womans;

  const averageAge = hasChildren.reduce((prev, curr) =>
    prev + curr.died - curr.born, 0) / hasChildren.length;

  return averageAge;
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
  const mothers = people.filter(woman =>
    people.some(person => person.mother === woman.name));

  const childrens = people.filter(person =>
    people.some(woman => woman.name === person.mother));

  const withSon = onlyWithSon !== undefined
    ? childrens.filter(child => (child.sex === 'm'))
    : childrens;

  const ageDifference = withSon.reduce((diff, child) => {
    const findMother = mothers.find(woman => woman.name === child.mother);

    return diff + child.born - findMother.born;
  }, 0) / withSon.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
