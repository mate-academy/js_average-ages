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
  const man = people.filter(person => (century
    ? person.sex === 'm'
      && Math.ceil(person.died / 100) === century
    : person.sex === 'm'));

  const sumAges = getSumOfAvgAge(man);
  const avgAges = getAvgAges(sumAges, man.length);

  return avgAges;
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
  let woman = withChildren
    ? people
      .filter(person => person.mother !== null)
      .map(person => person.mother)
    : people.filter(person => person.sex === 'f');

  woman = withChildren
    ? people.filter(item => woman.includes(item.name))
    : woman;

  const sumAges = getSumOfAvgAge(woman);
  const avgAges = getAvgAges(sumAges, woman.length);

  return avgAges;
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
  const findMom = onlyWithSon
    ? people.filter(person => hasMother(people, person.mother)
      && person.sex === 'm')
    : people.filter(person => hasMother(people, person.mother));

  const sumAges = (findMom.reduce((sum, woman) => {
    const mother = people.find(mom => mom.name === woman.mother);
    const difference = woman.born - mother.born;

    return sum + difference;
  }, 0));

  const avgAges = getAvgAges(sumAges, findMom.length);

  return avgAges;
}

function getSumOfAvgAge(sex) {
  return sex.reduce(
    (sum, person) => sum + (person.died - person.born), 0);
}

function getAvgAges(sumAges, count) {
  return sumAges / count;
}

function hasMother(people, mothername) {
  return people.some(person => person.name === mothername);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
