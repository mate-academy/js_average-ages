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
  const pAge = person => person.died - person.born;
  const pSum = (x, y) => x + y;

  if (!century) {
    const age = people.filter(x =>
      x.sex === 'm').map(pAge);

    return Math.round(age.reduce(pSum) / (age.length) * 100) / 100;
  } else {
    const cent = (century - 1) * 100;
    const filt = people.filter(p => p.died > cent
      && p.died < (cent + 100));

    const age = filt.filter(x => x.sex === 'm').map(pAge);

    return Math.ceil(age.reduce(pSum) / age.length * 100) / 100;
  }
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
  const pAge = person => person.died - person.born;
  const pSum = (x, y) => x + y;

  if (withChildren === undefined) {
    const allAge = people.filter(x => x.sex === 'f').map(pAge);

    return Math.round(allAge.reduce(pSum) / allAge.length * 100) / 100;
  } else {
    const allAge = people.filter(x => x.name
      && people.some(y => y.mother === x.name)).map(pAge);

    return Math.round(allAge.reduce(pSum) / allAge.length * 100) / 100;
  }
}

/**
 * Implement calculateAverageAgeDiff function. Реализуй
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
  const mom = people.filter(x => people.find(y => x.name === y.mother));
  const childrenBoys = people.filter(x => x.sex === 'm'
  && mom.find(y => y.name === x.mother));

  const childrenAll = people.filter(x =>
    mom.find(y => y.name === x.mother));

  if (onlyWithSon === undefined) {
    const resultAll = childrenAll.map(x =>
      x.born - mom.find(y => y.name === x.mother).born);

    return Math.round(resultAll.reduce((a, b) => a + b)
    / resultAll.length * 100) / 100;
  } else {
    const result = childrenBoys.map(x =>
      x.born - mom.find(y => y.name === x.mother).born);

    return Math.ceil(result.reduce((a, b) => a + b)
    / result.length * 100) / 100;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
