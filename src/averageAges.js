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
  const men = century ? people.filter(person =>
    Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter(person => person.sex === 'm');
  const menAge = (Math.round((men.reduce((sumAges, person) => sumAges
    + (person.died - person.born), 0) / men.length) * 100) / 100);

  return menAge;
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
  const women = withChildren ? people.filter(person =>
    people.some(child => child.mother === person.name) && person.sex === 'f')
    : people.filter(person => person.sex === 'f');
  const womenAge = +(women.reduce((sumAges, person) =>
    sumAges + (person.died - person.born), 0) / women.length).toFixed(2);

  return womenAge;
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
  const children = onlyWithSon ? people.filter(person =>
    people.some(mother => mother.name === person.mother) && person.sex === 'm')
    : people.filter(person =>
      people.some(mother => mother.name === person.mother));
  const diffAges = +(children.reduce((sumAges, child) => {
    const motherOfchild = people.find(mother => mother.name === child.mother);

    return sumAges + (child.born - motherOfchild.born);
  }, 0) / children.length).toFixed(2);

  return diffAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
