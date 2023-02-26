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
  const men = people.filter(person => person.sex === 'm');
  const death = men.filter(man => Math.ceil(man.died / 100) === century);
  let life;

  century
    ? life = death.map(({ died, born }) => died - born)
    : life = men.map(({ died, born }) => died - born);

  const result = life.reduce((sum, a) => sum + a);

  return result / life.length;

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
  const women = people.filter(person => person.sex === 'f');
  const mothers = women.filter(woman =>
    people.find(person => person.mother === woman.name));

  let life;

  withChildren
    ? life = mothers.map(({ died, born }) => died - born)
    : life = women.map(({ died, born }) => died - born);

  const result = life.reduce((sum, a) => sum + a);

  return result / life.length;
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
  const sumOfAll = (sum, a) => sum + a;
  let children = people.filter(child => {
    return people.some(mom => mom.name === child.mother);
  });

  onlyWithSon && (children = children.filter(child => child.sex === 'm'));

  const ages = children.map(child => {
    const moms = people.find(mom => mom.name === child.mother);

    return child.born - moms.born;
  });

  return ages.reduce(sumOfAll) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
