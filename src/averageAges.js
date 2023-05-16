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
  const isMan = person => person.sex === 'm';
  const isBornThisCentury = person =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century;

  const filteredMen = people.filter(
    century ? isBornThisCentury : isMan
  );

  const averageMenAge = filteredMen.reduce(
    (accum, person) => (accum + (person.died - person.born)
    / filteredMen.length), 0);

  return averageMenAge;
}

// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  const isWoman = person => person.sex === 'f';
  const hasChildren = person => person.sex === 'f'
  && people.some(child => child.mother === person.name);

  const filteredWoman = people.filter(
    withChildren ? hasChildren : isWoman
  );

  const averageWomanAge = filteredWoman.reduce(
    (accum, person) => (accum + (person.died - person.born)
    / filteredWoman.length), 0);

  return averageWomanAge;
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
  const hasChild = person => people.some(
    mother => person.mother === mother.name
  );

  const hasBoy = person => person.sex === 'm'
  && people.some(mother => person.mother === mother.name);

  const filteredChildren = people.filter(
    onlyWithSon ? hasBoy : hasChild
  );

  const ageDifference = filteredChildren.reduce(
    (accum, child) => (accum + (child.born - people.find(
      mother => child.mother === mother.name).born)
    ), 0) / filteredChildren.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
