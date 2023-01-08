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
  const men = century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAge = men.map(calcAge);

  return calcAverageAge(men, menAge);
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
      && people.find(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const womenAge = women.map(calcAge);

  return calcAverageAge(women, womenAge);
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
  const mothers = people.filter(person =>
    people.find(child => child.mother === person.name));

  const children = onlyWithSon
    ? people.filter(child => child.sex === 'm'
      && mothers.find(mother => mother.name === child.mother))
    : people.filter(child =>
      mothers.find(mother => mother.name === child.mother));

  const diffAge = children.map(child =>
    child.born - mothers.find(mother => mother.name === child.mother).born);

  return calcAverageAge(children, diffAge);
}

function calcAverageAge(individs, individsAge) {
  const sumOfAge = individsAge.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAge / individs.length;

  return +averageAge.toFixed(2);
}

const calcAge = person => person.died - person.born;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
