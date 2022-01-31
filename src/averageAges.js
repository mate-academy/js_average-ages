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
function calculateMenAverageAge(people, century = undefined) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let man = [];
  let lifeTime = [];

  man = people.filter(({ sex, died }) => ((sex === 'm'))
    && (century
      ? (Math.ceil(died / 100) === century)
      : true));

  lifeTime = man.map(({ born, died }) => died - born);

  return ((lifeTime.reduce((sum, age) => sum + age) / lifeTime.length));
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
  let women = [];
  let lifeTime = [];

  women = people.filter(({ sex, name }) => ((sex === 'f')
   && (withChildren
     ? (people.some((person) => person.mother === name))
     : true)));

  lifeTime = women.map(({ born, died }) => died - born);

  return (lifeTime.reduce((sum, age) => sum + age) / lifeTime.length);
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
  let mom = [];
  let kid = [];
  let ageDiffer = [];

  mom = people.filter(person =>
    (people.some((parent) => person.name === parent.mother)));

  kid = people.filter((child) => (mom.some((parent) =>
    (parent.name === child.mother)
        && (onlyWithSon
          ? (child.sex === 'm')
          : true))));

  ageDiffer = kid.map((child) =>
    child.born - mom.find((mother) =>
      (child.mother === mother.name)).born);

  return (ageDiffer.reduce((a, b) => a + b) / ageDiffer.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
