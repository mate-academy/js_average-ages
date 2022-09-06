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
  const men = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAgeDied = men.map(year =>
    year.died - year.born).reduce((sum, x) => sum + x);

  const menAverageAge = menAgeDied / men.length;

  return menAverageAge;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
    ? people.filter(mother => people.find(person =>
      (person.mother === mother.name)))
    : people.filter(person => person.sex === 'f');

  const womenAgeDied = women.map(year =>
    year.died - year.born).reduce((sum, x) => sum + x);

  const womenAverageAge = womenAgeDied / women.length;

  return womenAverageAge;
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
  const womenWithChild = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    && people.find(mother => mother.name === person.mother)
    : people.find(mother => mother.name === person.mother));

  const mothersAges = womenWithChild.map(kid => 
    kid.born - people.find(mom => mom.name === kid.mother).born);

  const differenceAverage = mothersAges.reduce((sum, x) =>
    sum + x) / mothersAges.length;

  return differenceAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
