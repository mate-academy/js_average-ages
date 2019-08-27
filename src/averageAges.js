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
  return people.reduce((ageSum, man) => {
    if (man.sex === 'm' && (century === undefined
      || (man.died < century * 100 && man.died >= (century - 1) * 100))) {
      return ageSum + man.died - man.born;
    }

    return ageSum;
  }, 0) / people.filter(man => (man.sex === 'm' && (century === undefined
    || (man.died < century * 100 && man.died >= (century - 1) * 100)))).length;
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
  const mothers = people.reduce((obj, item) => {
    obj[item.mother] = '';
    return obj;
  }, {});

  return people.reduce((ageSum, woman) => {
    if (woman.sex === 'f'
      && (withChildren === undefined
        || mothers[woman.name] !== undefined)) {
      return ageSum + woman.died - woman.born;
    }

    return ageSum;
  }, 0) / people.filter(woman => woman.sex === 'f'
    && (withChildren === undefined
      || mothers[woman.name] !== undefined)).length;
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
  const mothers = people.reduce((obj, item) => {
    obj[item.name] = item.born;
    return obj;
  }, {});

  return people.reduce((age, child) => {
    if ((onlyWithSon === undefined || child.sex === 'm')
      && mothers[child.mother] !== undefined) {
      return age + child.born - mothers[child.mother];
    }

    return age;
  }, 0) / people
    .filter(child => (onlyWithSon === undefined || child.sex === 'm')
      && mothers[child.mother]).length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
