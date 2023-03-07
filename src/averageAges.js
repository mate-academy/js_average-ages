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

function getCentury(year) {
  return Math.ceil(year / 100);
}

function getAverage(ages) {
  return ages.reduce((acc, elem) => acc + elem) / ages.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(century ? person => person.sex === 'm'
  && getCentury(person.died) === century : person => person.sex === 'm');

  const ages = men.map(year => year.died - year.born);

  return getAverage(ages);
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

function getIsMother(people, woman) {
  return people.some(names => names.mother === woman.name);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(withChildren ? person => person.sex === 'f'
  && getIsMother(people, person) : person => person.sex === 'f');

  const ages = women.map(year => year.died - year.born);

  return getAverage(ages);
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
  const children = people.filter(child => onlyWithSon
    ? people.some(women => women.name === child.mother) && child.sex === 'm'
    : people.some(women => women.name === child.mother)
  );

  const aver = children.reduce((acc, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return acc + child.born - mother.born;
  }, 0);

  return aver / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
