'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of x's death by 100: Math.ceil(x.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const calculateAverage = arr => arr.reduce((total, sex) => (
  total + (sex.died - sex.born)
), 0) / arr.length;

function calculateMenAverageAge(people, century) {
  const mens = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century);

  return calculateAverage(mens);
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
  const findMoms = person => person.sex === 'f'
    && (people.find(children => person.name === children.mother));
  const womens = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(findMoms);

  return calculateAverage(womens);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for Moms and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const findMotherAndSon = child => people
    .find(mother => child.mother === mother.name)
      && child.sex === 'm';
  const childs = !onlyWithSon
    ? people.filter(child =>
      people.find(mother => child.mother === mother.name))
    : people.filter(findMotherAndSon);

  return childs.reduce((total, child) =>
    total + (child.born - people.find(mother =>
      child.mother === mother.name).born), 0) / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
