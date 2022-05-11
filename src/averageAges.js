'use strict';

function likeReduceAge(person) {
  return +(person.reduce((sum, x) => (sum + x)) / person.length).toFixed(2);
}

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
  const man = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const manAge = man.map(person => person.died - person.born);

  return likeReduceAge(manAge);
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
  const woman = withChildren
    ? people.filter(mother => people.some(person =>
      mother.name === person.mother))
    : people.filter(person => person.sex === 'f');

  const womanAge = woman.map(person => person.died - person.born);

  return likeReduceAge(womanAge);
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

  const difference = children.map(child => {
    const motherChild = people.find(mother => mother.name === child.mother);

    return child.born - motherChild.born;
  });

  return likeReduceAge(difference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
