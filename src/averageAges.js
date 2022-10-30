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
 * 1. write code here
 * 2. learn how to use array methods like .filter .map .some .every .find .reduce
 * 3. avoid using loop and forEach
 * 4. replace `if ()` statement with &&, || or ?:
 * 5. without nesting
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredPeople = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  return filteredPeople
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0) / filteredPeople.length;
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
  const filteredPeople = withChildren
    ? people.filter(person => {
      return people.some(human => human.mother === person.name);
    })
    : people.filter(person => person.sex === 'f');

  return filteredPeople
    .map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0) / filteredPeople.length;
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
    ? people.filter(person => {
      return person.sex === 'm' && people
        .some(mother => mother.name === person.mother);
    })
    : people.filter(person => {
      return people.some(mother => mother.name === person.mother);
    });

  const ageDifference = children
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born);

  return ageDifference
    .reduce((sum, age) => sum + age, 0) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
