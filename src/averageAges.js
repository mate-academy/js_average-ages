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
  const ages = (century === undefined)
    ? people.filter(human => human.sex === 'm')
      .map(human => human.died - human.born)
    : people.filter(human => human.sex === 'm')
      .filter(value => Math.trunc(value.died / 100) + 1 === century)
      .map(human => human.died - human.born);

  return ages.reduce((result, element) =>
    (result + element), 0) / ages.length;
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
  const ages = (withChildren === undefined)
    ? people.filter(human => human.sex === 'f')
      .map(human => human.died - human.born)
    : people.filter(human => {
      const children = people.filter(child => child.mother === human.name);

      return children.length !== 0;
    }).map(human => human.died - human.born);

  return ages.reduce((result, element) =>
    (result + element), 0) / ages.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let agesArray = [];
  let differenceOfAges = people.filter(human => {
    const children = people.filter(child => child.mother === human.name);

    return children.length !== 0;
  }).map(motherOf => {
    const childAges = people.filter(childOf => childOf.mother === motherOf.name)
      .map(isChild => {
        return (onlyWithSon === false)
          ? isChild.born - motherOf.born
          : (isChild.sex === 'm')
            ? isChild.born - motherOf.born
            : undefined;
      });

    agesArray = [...agesArray, ...childAges]
      .filter(value => value !== undefined);

    return childAges;
  });

  differenceOfAges = agesArray;

  return differenceOfAges.reduce((result, element) =>
    (result + element), 0) / differenceOfAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
