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
  const men = people.filter(x => {
    if (century !== undefined) {
      if (Math.ceil(x.died / 100) === +century && x.sex === 'm') {
        return true;
      }

      return false;
    } else if (x.sex === 'm') {
      return true;
    }
  });
  const totalAges = (prev, x) => prev + (x.died - x.born);
  const middleAge = men.reduce(totalAges, 0);

  return middleAge / men.length;
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
  const women = people.filter(x => x.sex === 'f');
  const womenWithChild = women.filter(woman => {
    return people.some(child => child.mother === woman.name);
  });
  const totalAges = (prev, x) => prev + (x.died - x.born);

  if (withChildren) {
    return womenWithChild.reduce(totalAges, 0) / womenWithChild.length;
  } else if (!withChildren) {
    return women.reduce(totalAges, 0) / women.length;
  }
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
  const arrayAges = [];
  let children = people.filter(kid =>
    people.some(mother => mother.name === kid.mother));

  if (onlyWithSon) {
    children = children.filter(son => son.sex === 'm');
  }

  const findDiference = children.map(kid =>
    people.some(mother => {
      if (mother.name === kid.mother) {
        arrayAges.push(kid.born - mother.born);
      }
    })
  );

  const totalAges = (prev, x) => prev + x;

  return arrayAges.reduce(totalAges, 0) / findDiference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
