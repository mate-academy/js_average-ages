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

  const mainCentury = century
    ? people.filter(
      person => Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter(
      person => person.sex === 'm');

  const count = mainCentury.map(el => el.died - el.born);

  return count.reduce(
    (prevAge, age) => prevAge + age, 0) / count.length;
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
    ? people.filter(woman => woman.sex === 'f'
    && people.some(child => child.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const ageWomen = women.map(age => age.died - age.born);

  return ageWomen.reduce((prev, current) => (
    prev + current), 0) / ageWomen.length;
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
    ? people.filter(person => person.sex === 'm'
    && people.some(mother => mother.name === person.mother))
    : people.filter(person => (
      people.some(mother => mother.name === person.mother)));

  const ageBetween = children.map(child => (
    child.born - people.find(mother => mother.name === child.mother).born));

  return ageBetween.reduce((prev, current) => (
    prev + current), 0) / ageBetween.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
