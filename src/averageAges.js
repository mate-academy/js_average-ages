'use strict';

function calculateAverageAge(listOfPeople) {
  return listOfPeople.reduce((sum, a) => (
    sum + (a.died - a.born)
  ), 0) / listOfPeople.length;
}

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
  const men = people.filter(person => (
    person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true
    )));

  return calculateAverageAge(men);
}

/**
 * Implement calculateWomenAverageAge function
 *
@@ -36,10 +41,19 @@ function calculateMenAverageAge(people, century) {
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people.filter(person => person.sex === 'f');

  return withChildren
    ? calculateAverageAge(findWomenWithChildren(women, people))
    : calculateAverageAge(women);
}

function findWomenWithChildren(women, people) {
  return women.filter(female => (
    people.find(person => person.mother === female.name)));
}
/**
 * Implement calculateAverageAgeDiff function.
 *
@@ -54,8 +68,33 @@ function calculateWomenAverageAge(people, withChildren) {
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const mothers = people.filter((person) => {
    return people.some((child) => child.mother === person.name);
  });

  const children = people.filter(({ mother, sex }) => {
    return people.some(({ name }) => {
      if (onlyWithSon) {
        return mother === name && sex === 'm';
      }

      return mother === name;
    });
  });

  const ageSum = children.reduce((sum, child) => {
    const mother = mothers.find((person) => {
      return person.name === child.mother;
    });

    const diff = child.born - mother.born;

    return sum + diff;
  }, 0) / children.length;

  return ageSum;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
