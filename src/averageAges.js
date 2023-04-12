'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century) : men;
  const menAges = menCentury.map(person => person.died - person.born);
  const sumAges = menAges.reduce((sum, age) => sum + age, 0);
  const avrAge = sumAges / menAges.length;

  return avrAge;
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
  const women = people.filter(person => person.sex === 'f');
  const womenChildren = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;
  const womenAges = womenChildren.map(person => person.died - person.born);
  const sumAges = womenAges.reduce((sum, age) => sum + age, 0);
  const avrAge = sumAges / womenAges.length;

  return avrAge;
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
  const filterBySex = people.filter(
    person => onlyWithSon ? person.sex === 'm' : true);
  const children = filterBySex.filter(person => people.find(mother =>
    mother.name === person.mother));
  const ages = children.map(person => person.born - people.find(mother =>
    mother.name === person.mother).born);

  return ages.reduce((sum, age) => sum + age) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
