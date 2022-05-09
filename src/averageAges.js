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
  const men = people.filter(man => man.sex === 'm');

  const filteredMen = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return filteredMen
    .reduce((acc, age) =>
      ((acc + (age.died - age.born))), 0) / filteredMen.length;
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
  const filteredWomen = withChildren
    ? people.filter(woman => woman.sex === 'f'
      && people.some(child => child.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  return filteredWomen
    .reduce((acc, age) =>
      ((acc + (age.died - age.born))), 0) / filteredWomen.length;
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
  const children = onlyWithSon
    ? people.filter(person => people.some(child => child.name === person.mother)
      && person.sex === 'm')
    : people.filter(person => people.some(child =>
      child.name === person.mother));

  const diff = children.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const ages = diff.reduce((acc, age) => acc + age);
  const diffAges = ages / diff.length;

  return diffAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
