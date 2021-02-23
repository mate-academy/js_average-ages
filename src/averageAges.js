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
  const isMan = person => person.sex === 'm';

  const wasBornInCentury = person => person.sex === 'm'
  && Math.ceil(person.died / 100) === century;

  const filteredMan = people.filter(
    century ? wasBornInCentury : isMan
  );
  const averageAgeOfMen = filteredMan.reduce((sum, year) => sum
    + (year.died - year.born), 0) / filteredMan.length;

  return averageAgeOfMen;
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
  // write code here
  const isWoman = person => person.sex === 'f';

  const hasWomanChildren = person => person.sex === 'f'
  && people.some(child => child.mother === person.name);

  const filteredWoman = people.filter(
    withChildren ? hasWomanChildren : isWoman
  );

  const averageAge = filteredWoman.reduce((sum, year) => (sum
    + (year.died - year.born)), 0) / filteredWoman.length;

  return averageAge;
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
  // write code here
  const withChild = person => people.some(
    mother => person.mother === mother.name
  );
  const onlyWithBoy = person => person.sex === 'm'
  && people.some(mother => person.mother === mother.name);

  const filteredChildren = people.filter(
    onlyWithSon ? onlyWithBoy : withChild);

  const ageDifferense = filteredChildren.reduce(
    (sum, child) => (sum + (child.born - people.find(
      mother => child.mother === mother.name).born)
    ), 0) / filteredChildren.length;

  return ageDifferense;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
