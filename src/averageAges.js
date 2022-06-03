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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const personMan = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)

    : people.filter(person => person.sex === 'm');

  const personAge = personMan.map(person => person.died - person.born);
  const sumAges = personAge.reduce((sum, age) => (sum + age));
  const average = Math.round(sumAges / personAge.length * 100) / 100;

  return average;
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
  const personWomen = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const personAge = personWomen.map(person => person.died - person.born);
  const sumAges = personAge.reduce((sum, age) => (sum + age));
  const average = Math.round(sumAges / personAge.length * 100) / 100;

  return average;
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
  const personChild = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(mother => mother.name === person.mother))
    : people.filter(person => people.some(mother => mother.name
      === person.mother));

  const differenceAge = personChild.map(child => child.born
    - people.find(mother => mother.name === child.mother).born);

  return differenceAge.reduce((prev, age) => prev + age, 0)
  / differenceAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
