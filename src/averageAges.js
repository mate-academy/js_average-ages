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
// Нова функція після ревю
function getAverage(arg) {
  const midAges = arg.map(mid => mid.died - mid.born);
  const result = (midAges.reduce((one, two) => one + two)) / midAges.length;

  return +result.toFixed(2);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filtered = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  return getAverage(filtered);
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
  // write code here
  const mother = people.filter(person => withChildren
    ? people.find(child => child.mother === person.name)
    : person.sex === 'f');

  return getAverage(mother);
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
  // write code here
  let motherCount = 0;

  return people
    .filter(child => onlyWithSon ? child.sex === 'm' : true)
    .reduce((sum, child) => {
      const mother = people.find(person => child.mother === person.name);

      mother ? motherCount++ : motherCount = motherCount + 0;

      return mother ? sum + (child.born - mother.born) : sum;
    }, 0) / motherCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
