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
  const men = people.filter((el) => el.sex === `m`);

  let averageAge;

  century
    ? averageAge = men.filter(el => Math.ceil(el.died / 100) === century)
      .reduce((sum, { died, born }) => sum + died - born, 0)
    / men.filter(el => Math.ceil(el.died / 100) === century).length

    : averageAge = men.reduce((sum, { died, born }) => sum + died - born, 0)
     / men.length;

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
  const women = people.filter(person => person.sex === `f`);

  // const mothers = women.filter(woman => people
  //   .some(child => child.mother === woman.name));
  // const mothersAges = mothers
  //   .reduce((sum, { died, born }) => sum + died - born, 0);
  // const averageAgeOfMothers = mothersAges / mothers.length;

  let averageAge;

  withChildren
    ? averageAge = women.filter(woman => people
      .some(child => child.mother === woman.name))
      .reduce((sum, { died, born }) => sum + died - born, 0)
      / women.filter(woman => people
        .some(child => child.mother === woman.name)).length

    : averageAge = women.reduce((sum, { died, born }) => sum + died - born, 0)
    / women.length;

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

  const children = people.filter(child => people
    .some(mother => child.mother === mother.name));

  let averageAge;

  onlyWithSon
    ? averageAge = children.filter(son => son.sex === `m`)
      .map(son => son.born - people
        .find(mother => son.mother === mother.name).born)
      .reduce((acc, el) => acc + el) / children.filter(son => son.sex === `m`)
      .map(son => son.born - people
        .find(mother => son.mother === mother.name).born).length

    : averageAge = children.map(child => child.born - people
      .find(mother => child.mother === mother.name).born)
      .reduce((acc, el) => acc + el) / children.map(child => child.born - people
      .find(mother => child.mother === mother.name).born).length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
