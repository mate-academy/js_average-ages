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
function getAverage(arr) {
  const sum = arr.reduce((a, b) => a + b);
  return sum / arr.length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with logical operators (&&, ||)
  // or ternary operator (?:)
  // without nesting
  let men;

  century !== undefined
    ? men = people.filter(person => person.sex === 'm')
      .filter(man => Math.ceil(man.died / 100) === century)
    : men = people.filter(person => person.sex === 'm');

  const menAge = men.map(man => man.died - man.born);
  const averageAge = getAverage(menAge);

  return averageAge;
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
  let women;

  withChildren
    ? women = people.filter(person => person.sex === 'f')
      .filter(woman => people.find(person => person.mother === woman.name))
    : women = people.filter(person => person.sex === 'f');

  const womenAge = women.map(woman => woman.died - woman.born);
  const averageAge = getAverage(womenAge);

  return averageAge;
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
  const children = people.filter(child => (onlyWithSon
    ? child.sex === 'm' : true)
    && people.find(mother => {
      if (child.mother === mother.name) {
        child.motherBorn = mother.born;
        return true;
      }
      return false;
    }));

  const ageDiff = children.map(child => child.born - child.motherBorn);
  const averageAgeDiff = getAverage(ageDiff);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
