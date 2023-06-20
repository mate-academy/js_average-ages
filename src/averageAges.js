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
  let men = people.filter((person) => person.sex === 'm');

  men = century !== undefined
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const menAges = men.map(man => man.died - man.born);
  const sumAges = menAges.reduce((a, b) => a + b, 0);

  return sumAges / menAges.length;
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
  let women = people.filter((person) => person.sex === 'f');

  women = withChildren !== undefined
    ? women.filter(woman => {
      return people.some(person => person.mother === woman.name);
    })
    : women;

  const womenAges = women.map(woman => woman.died - woman.born);
  const sumAges = womenAges.reduce((a, b) => a + b, 0);

  return sumAges / womenAges.length;
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
  const hasMother = people.filter(child => {
    const mother = people.find(person => person.name === child.mother);

    return mother && (onlyWithSon ? child.sex === 'm' : true);
  });

  const ageDifference = hasMother.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const sumAgeDifference = ageDifference.reduce((a, b) => a + b, 0);

  const averageAgeDifference = sumAgeDifference / ageDifference.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
