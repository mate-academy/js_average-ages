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
  const men = people.filter((person) => {
    const centuryOfDeath = Math.ceil(person.died / 100);

    return person.sex === 'm' && (century ? centuryOfDeath === century : true);
  });

  const menAverageAge = men.reduce((accum, curr) => {
    const age = curr.died - curr.born;

    return accum + age;
  }, 0) / men.length;

  return menAverageAge;
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
  const women = people.filter((person) => {
    const hasChildren = people.some((child) => child.mother === person.name);

    return person.sex === 'f' && (withChildren ? hasChildren : true);
  });

  const wonenAverageAge = women.reduce((accum, curr) => {
    const age = curr.died - curr.born;

    return accum + age;
  }, 0) / women.length;

  return wonenAverageAge;
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
  const womenWithChildren = people.filter((person) => {
    const hasChildren = people.some((child) => child.mother === person.name);

    return person.sex === 'f' && hasChildren;
  });

  let numberOfChildren = 0;

  const ageDiff = womenWithChildren.reduce((acc, woman) => {
    const children = people.filter((person) => {
      return person.mother === woman.name
        && (onlyWithSon ? person.sex === 'm' : true);
    });
    let totallAgeDiff = 0;

    children.map((child) => {
      totallAgeDiff += child.born - woman.born;
      numberOfChildren++;
    });

    return (acc + totallAgeDiff);
  }, 0);

  const averegeAgeDiff = ageDiff / numberOfChildren;

  return averegeAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
