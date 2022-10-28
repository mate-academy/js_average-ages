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
// write code here
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

function calculateMenAverageAge(people, century) {
  const men = century ? people.filter(person =>
    Math.ceil(person.died / 100) === century).filter(findMen)
    : people.filter(findMen);

  return calculate(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(findWomen).filter(person =>
      people.find(mother => mother.mother === person.name))
    : people.filter(findWomen);

  return calculate(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenAndChildren = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const difference = womenAndChildren.map(child => child.born
    - people.find(mother => child.mother === mother.name).born);

  return calcDiff(difference);
}

const findMen = person => person.sex === 'm';

const findWomen = person => person.sex === 'f';

const calculate = filteredPeople => {
  return filteredPeople.reduce((sum, person) =>
    person.died - person.born + sum, 0) / filteredPeople.length;
};

const calcDiff = filteredPeople => {
  return filteredPeople.reduce((a, b) => a + b, 0) / filteredPeople.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
