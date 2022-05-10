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
function getAverage(folks) {
  const folksAges = folks.map(person => person.died - person.born);

  const sumOfFolksAges = folksAges.reduce((sum, age) => sum + age, 0);

  return sumOfFolksAges / folksAges.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menCentury
    = men.filter(person => (Math.ceil(person.died / 100)) === century);

  return century ? getAverage(menCentury) : getAverage(men);
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

  return withChildren ? getAverage(womenWithChildren) : getAverage(women);
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
  const childrenWithMom = people.map(person => {
    const personMom
      = people.find(folk => person.mother === folk.name);

    return {
      ...person,
      mom: personMom,
    };
  }).filter(person => {
    const isChild
      = people.some(folk => person.mother === folk.name);

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

  return onlyWithSon ? mothersOfSonsAges : womenWithChildrenAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
