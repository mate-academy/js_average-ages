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
  const male = century
    ? people.filter(element => {
      return element.sex === 'm' && Math.ceil(element.died / 100) === century;
    })
    : people.filter(element => element.sex === 'm');

  const age = male.map(element => element.died - element.born);

  const aver = age.reduce((a, b) => a + b) / age.length;

  return aver;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const female = withChildren
    ? people.filter(element =>
      people.some(person => person.mother === element.name
      && element.sex === 'f'))
    : people.filter(element => element.sex === 'f');
  const age = female.map(element => element.died - element.born);

  const aver = age.reduce((a, b) => a + b) / age.length;

  return aver;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? people.some(mother => child.mother === mother.name) && child.sex === 'm'
    : people.some(mother => child.mother === mother.name)
  );

  const aver = children.map(child => {
    return child.born - people.find(mother => {
      return child.mother === mother.name;
    }).born;
  });

  return aver.reduce((a, b) => a + b, 0) / aver.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
