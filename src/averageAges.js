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
  const men = people.filter(person => person.sex === 'm');

  const menCentury
    = men.filter(person => (Math.ceil(person.died / 100)) === century);

  const menAges = men.map(person => person.died - person.born);
  const menCenturyAges = menCentury.map(person => person.died - person.born);

  const sumOfAllMenAges = menAges.reduce((sum, age) => sum + age, 0);
  const sumOfCenturyMenAges = menCenturyAges.reduce(
    (sum, age) => sum + age, 0);

  return (arguments.length < 2) ? (sumOfAllMenAges / men.length)
    : (sumOfCenturyMenAges / menCentury.length);
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

  const womenWithChildren
    = women.filter(woman => {
      const isMother = people.some(person => person.mother === woman.name);

      return isMother;
    });

  const womenAges = women.map(woman => woman.died - woman.born);
  const womenWithChildrenAges
    = womenWithChildren.map(woman => woman.died - woman.born);

  const sumWomenAges = womenAges.reduce((sum, age) => sum + age, 0);
  const sumWomenWithChildrenAges = womenWithChildrenAges.reduce(
    (sum, age) => sum + age, 0);

  return (arguments.length < 2) ? (sumWomenAges / womenAges.length)
    : (sumWomenWithChildrenAges / womenWithChildrenAges.length);
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren
    = women.filter(woman => {
      const isMother = people.some(person => person.mother === woman.name);

      return isMother;
    });

  const childrenWithMom = people.map(person => {
    const personMom
      = womenWithChildren.find(woman => person.mother === woman.name);

    return {
      ...person,
      mom: personMom,
    };
  }).filter(person => {
    const isChild
      = womenWithChildren.some(woman => person.mother === woman.name);

    return isChild;
  });

  const sons = childrenWithMom.filter(child => child.sex === 'm');

  const womenWithChildrenAges
    = childrenWithMom.map((child) => child.born - child.mom.born)
      .reduce((sum, age) => sum + age, 0)
    / childrenWithMom.length;

  const mothersOfSonsAges = sons.map((child) => child.born - child.mom.born)
    .reduce((sum, age) => sum + age, 0)
    / sons.length;

  return (arguments.length < 2) ? womenWithChildrenAges
    : mothersOfSonsAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
