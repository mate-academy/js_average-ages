'use strict';
/* eslint-disable */
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
  const male = century
    ? people.filter(person => (
      Math.ceil(person.died / 100) === century && person.sex === 'm'
    ))
    : people.filter(person => person.sex === 'm');

  return getAge(male) / male.length;
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
  // write code here
  const female = withChildren
    ? people.filter(person => (
      people.some(personchild => personchild.mother === person.name)
    ))
    : people.filter(person => person.sex === 'f');

  return getAge(female) / female.length;

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
  // write code here

  const children = onlyWithSon
    ? people.filter(person =>
      people.some(mom => (
        mom.name === person.mother && person.sex === 'm')
    ))
    : people.filter(person => (
      people.some(mom => mom.name === person.mother)
    ));

  return children.reduce((ageDiffSum, person) => (
    ageDiffSum + (person.born - people.find(mom => person.mother === mom.name).born)
  ), 0) / children.length;
}

function getAge(people) {
  return people.reduce((a, person) => (
    a + (person.died - person.born)
  ), 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
