'use strict';

const getAvarge = (all, a) => all + a;
const lifeDuration = ({ died, born }) => died - born;

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
  let men;

  century
    ? men = people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : men = people.filter(person => person.sex === 'm');

  const life = men.map(lifeDuration);
  const sum = life.reduce(getAvarge);
  const result = sum / life.length;

  return result;

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
  let women;

  withChildren
    ? women = people.filter(person =>
      person.sex === 'f' && people.find(child => child.mother === person.name))
    : women = people.filter(person => person.sex === 'f');

  const life = women.map(lifeDuration);
  const sum = life.reduce(getAvarge);
  const result = sum / life.length;

  return result;
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
  let children;

  onlyWithSon
    ? children = people.filter(child => {
      return people.some(mom => mom.name === child.mother && child.sex === 'm');
    })
    : children = people.filter(child => {
      return people.some(mom => mom.name === child.mother);
    });

  const ages = children.map(child => {
    const moms = people.find(mom => mom.name === child.mother);

    return child.born - moms.born;
  });

  const result = ages.reduce(getAvarge) / ages.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
