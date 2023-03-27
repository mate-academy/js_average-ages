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
  const men = people.filter(person =>
    person.sex === 'm' && (
      !century || Math.ceil(person.died / 100) === century));

  const averageAges = getAverageAges(men);

  return averageAges;
}

function getAverageAges(people) {
  const ages = people.map(person => {
    return person.died - person.born;
  });

  return ages.reduce((a, b) => a + b, 0) / ages.length;
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const averageAges = (women
    .map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b)) / women.length;

  return averageAges;
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
  const moms = people
    .filter(mother => people.some(child => child.mother === mother.name));

  const children = onlyWithSon
    ? people.filter(person => hasMother(people, person.mother)
      && person.sex === 'm')
    : people.filter(person => hasMother(people, person.mother));

  const averageAges = children.reduce((difference, child) => {
    const childMother = moms.find(woman => woman.name === child.mother);

    return difference + (child.born - childMother.born);
  }, 0);

  return averageAges / children.length;
}

function hasMother(people, motherName) {
  return people.some(person => person.name === motherName);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
