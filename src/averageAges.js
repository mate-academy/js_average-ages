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
  let amount = 0;
  const result = people.reduce((summ, person) => {
    if (person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100))) {
      amount++;

      return summ + person.died - person.born;
    }

    return summ;
  }, 0);

  return result / amount;
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
function calculateWomenAverageAge(people, withChildren = false) {
  let amount = 0;
  const result = people.reduce((summ, person) => {
    if (person.sex === 'f'
    && (!withChildren || people.find(el => el.mother === person.name))) {
      amount++;

      return summ + person.died - person.born;
    }

    return summ;
  }, 0);

  return result / amount;
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
  let amount = 0;
  const result = people.reduce((summ, person) => {
    const temp = people.find(el => el.name === person.mother);

    if (person.mother
    && ((onlyWithSon && person.sex === 'm')
    || (!onlyWithSon)) && temp) {
      amount++;

      return summ + person.born - temp.born;
    }

    return summ;
  }, 0);

  return result / amount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
