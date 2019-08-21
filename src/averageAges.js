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
  let counter = 0;

  return people
    .reduce((ageSum, man) => {
      if (man.sex === 'm' && (century === undefined
        || (man.died < century * 100 && man.died >= (century - 1) * 100))) {
        counter++;

        return ageSum + man.died - man.born;
      }

      return ageSum;
    }, 0) / counter;
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
  const mothers = people.map(item => item.mother);

  let counter = 0;

  return people
    .reduce((ageSum, woman) => {
      if (woman.sex === 'f'
        && (withChildren === undefined || mothers.includes(woman.name))) {
        counter++;

        return ageSum + woman.died - woman.born;
      }

      return ageSum;
    }, 0) / counter;
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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = new Map(people.map(item => [item.name, item.born]));

  let counter = 0;

  return people
    .reduce((age, child) => {
      if ((onlyWithSon === undefined || child.sex === 'm')
        && mothers.has(child.mother)) {
        counter++;

        return age + child.born - mothers.get(child.mother);
      }

      return age;
    }, 0) / counter;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
