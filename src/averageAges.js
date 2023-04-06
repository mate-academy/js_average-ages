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
  // replace if () statement with &&, || or ?:
  // without nesting

  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  return men.map(person => person.died - person.born)
    .reduce((a, b) => a + b) / men.length;
}
/**
@@ -38,6 +46,12 @@ function calculateMenAverageAge(people, century) {
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people.filter(person => withChildren
    ? people.some(human => human.mother === person.name)
    : person.sex === 'f');

  return women.map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / women.length;
}

/**
@@ -56,6 +70,13 @@ function calculateWomenAverageAge(people, withChildren) {
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const children = people.filter(person => onlyWithSon
    ? people.find(woman => woman.name === person.mother) && person.sex === 'm'
    : people.find(woman => woman.name === person.mother));

  return children.map(person =>
    person.born - people.find(mother => person.mother === mother.name).born)
    .reduce((a, b) => a + b, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
