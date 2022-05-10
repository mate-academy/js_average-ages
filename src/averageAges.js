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
function calculateMenAverageAge(people1, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // const men = people.filter((a) => a.sex === 'm');
  let men = [];

  century === undefined
    ? men = people1.filter((a) => a.sex === 'm')
    : men = people1.filter((a) =>
      Math.ceil(a.died / 100) === century && a.sex === 'm');

  return Math.round(men.map(man => man.died - man.born)
    .reduce((sum, x) => sum + x, 0) / men.length * 100) / 100;
};

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
function calculateWomenAverageAge(people2, withChildren) {
  // write code here
  let women = [];

  withChildren === undefined
    ? women = people2.filter(person => person.sex === 'f')
    : women = people2.filter(person => people2.some(item =>
      item.mother === person.name));

  return Math.round(women.map(woman => woman.died - woman.born)
    .reduce((sum, x) => sum + x, 0) / women.length * 100) / 100;
};

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
function calculateAverageAgeDiff(people3, onlyWithSon) {
  // write code here
  let children = [];

  onlyWithSon === undefined
    ? children = people3.filter(person =>
      people3.find(mom => person.mother === mom.name))
    : children = people3.filter(person => people3.find(mom =>
      mom.name === person.mother && person.sex === 'm'));

  const agesDifference = children.map(child => {
    const mom = people3.find(person => child.mother === person.name);

    return child.born - mom.born;
  });

  const averageAge = agesDifference.reduce((a, b) => a + b, 0);

  return averageAge / agesDifference.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
