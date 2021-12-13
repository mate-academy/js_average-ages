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

const getPersonAge = person => person.died - person.born;
const getSum = (x, y) => x + y;

function calculateMenAverageAge(people, century = 0) {
  let age = people.filter(x => x.sex === 'm').map(getPersonAge);

  if (century) {
    const cent = (century - 1) * 100;
    const filt = people
      .filter(p => p.died >= cent && p.died <= cent + 100);

    age = filt.filter(man => man.sex === 'm').map(getPersonAge);
  }

  return Math.round(age.reduce(getSum) / age.length * 100) / 100;
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
  let allAge = people.filter(x => x.sex === 'f').map(getPersonAge);

  if (withChildren) {
    allAge = people.filter(mother => people
      .some(dauther => dauther.mother === mother.name))
      .map(getPersonAge);
  }

  return Math.round(allAge.reduce(getSum) / allAge.length * 100) / 100;
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
  const mothers = people.filter(mother => people
    .some(child => child.mother === mother.name));

  const children = people.filter(child => people
    .some(mother => child.mother === mother.name));

  let result = children.map(child => child.born - mothers
    .filter(mom => mom.name === child.mother)[0].born);

  if (onlyWithSon) {
    const childrenBoys = children.filter(boy => boy.sex === 'm');

    result = childrenBoys.map(child => child.born - mothers
      .find(mom => mom.name === child.mother).born);
  }

  result = Math.round(result.reduce(getSum) * 100 / result.length) / 100;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
