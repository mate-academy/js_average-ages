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
  let listOfMen = people.filter(person => person.sex === 'm');

  century
    ? listOfMen = listOfMen.filter(
      person => Math.ceil(person.died / 100) === century
    )
    : listOfMen;

  return listOfMen.map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0) / listOfMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let listOfWomen = people.filter(person => person.sex === 'f');

  withChildren
    ? listOfWomen = listOfWomen.filter(
      woman => people.find(person => person.mother === woman.name)
    )
    : listOfWomen;

  return listOfWomen.map(person => person.died - person.born)
    .reduce((sum, age) => sum + age, 0) / listOfWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const diffOfAges = people
    .filter(person => onlyWithSon ? person.sex === 'm' : true)
    .map(person => {
      const mother = people.find(woman => woman.name === person.mother);
      return mother ? person.born - mother.born : undefined;
    }).filter(diff => diff);

  return diffOfAges.reduce((sum, diff) => sum + diff, 0) / diffOfAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
