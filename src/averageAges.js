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
  let men = people.filter(a => a.sex === 'm');

  if (century) {
    men = men.filter(a => {
      return Math.ceil(a.died / 100) === century;
    });
  }

  const sumOfAges = men.reduce((prev, curr) => {
    const result = prev + (curr.died - curr.born);

    return result;
  }, 0);

  return sumOfAges / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(a => a.sex === 'f');

  if (withChildren) {
    women = women.filter(a => {
      return (people.some(b => b.mother === a.name));
    });
  }

  const sumOfAges = women.reduce((prev, curr) => {
    const result = prev + (curr.died - curr.born);

    return result;
  }, 0);

  return sumOfAges / women.length;
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
  const women = people.filter(a => a.sex === 'f');

  const womenWithChildren = women.filter(a => {
    return (people.some(b => b.mother === a.name));
  });

  let totalAgeAllWomen = 0;
  let countChildren = 0;

  womenWithChildren.map(i => {
    let thisChildren = people.filter(baby => baby.mother === i.name);

    if (onlyWithSon) {
      thisChildren = thisChildren.filter(baby => baby.sex === 'm');
    }

    countChildren += thisChildren.length;

    const totalAgeThisMother = thisChildren.reduce((accum, baby) => {
      const ageThisMother = baby.born - i.born;

      return accum + ageThisMother;
    }, 0);

    totalAgeAllWomen += totalAgeThisMother;
  });

  return totalAgeAllWomen / countChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
