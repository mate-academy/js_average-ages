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
  const filteredMen = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = filteredMen.reduce((sum, person) => sum
  + (person.died - person.born), 0);

  return totalAge / filteredMen.length;
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
  const filteredWomen = withChildren
    ? people.filter(woman => woman.sex === 'f'
    && people.some(person => person.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const totalAge = filteredWomen.reduce((sum, woman) => sum
  + (woman.died - woman.born), 0);

  return totalAge / filteredWomen.length;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const filteredChildren = onlyWithSon
    ? people.filter(child => child.sex === 'm'
    && people.some(person => person.name === child.mother))
    : people.filter(child => people.some(person => person.name
    === child.mother));

  const ageDiffs = filteredChildren.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const totalAgeDiff = ageDiffs.reduce((sum, diff) => sum + diff, 0);

  return totalAgeDiff / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
