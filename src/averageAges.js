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
  const filteredMen = people.filter(
    person => person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100)));

  const filteredMenAge = filteredMen.map(year => year.died - year.born);

  const result = filteredMenAge.reduce((a, b) => a + b) / filteredMenAge.length;

  return result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(
    person => withChildren
      ? person.sex === 'f'
      && people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  const ages = women.map(person => person.died - person.born);

  return ages.reduce((a, b) => a + b) / ages.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ages = [];
  const onlyMothers = people.filter(woman => {
    return people.some((person) => person.mother === woman.name);
  });

  onlyMothers.filter(mother => {
    const children = people.filter(person => onlyWithSon
      ? person.mother === mother.name
      && person.sex === 'm'
      : person.mother === mother.name);

    children.filter(child => ages.push(child.born - mother.born));
  });

  return ages.reduce((a, b) => a + b, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
