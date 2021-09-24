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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let pArr = [...people];

  pArr.map(el => (el.age = el.died - el.born));

  pArr = pArr.filter(el => el.sex === 'm');

  if (century) {
    pArr = pArr.filter(el => Math.ceil(el.died / 100) === century);
  }

  const sumAge = pArr.reduce((acumulator, current) => {
    return acumulator + current.age;
  }, 0);

  return pArr.length === 0 ? 0 : sumAge / pArr.length;
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
  // write code here
  let pArr = [...people];

  pArr.map(el => (el.age = el.died - el.born));

  if (withChildren) {
    pArr.map(el => {
      const child = pArr.find(value => value.mother === el.name);

      if (child) {
        el.hasChildren = 'yes';
      }
    });
    pArr = pArr.filter(el => el.hasChildren === 'yes');
  }

  pArr = pArr.filter(el => el.sex === 'f');

  const sumAge = pArr.reduce((acumulator, current) => {
    return acumulator + current.age;
  }, 0);

  return pArr.length === 0 ? 0 : sumAge / pArr.length;
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
  // write code here
  let pArr = [...people];

  pArr.map(el => {
    const setMother = pArr.find(value => el.mother === value.name);

    if (setMother) {
      el.motherBorn = setMother.born;
    }
    el.diff = el.born - el.motherBorn;
  });
  pArr = pArr.filter(el => el.hasOwnProperty('motherBorn'));

  if (onlyWithSon) {
    pArr = pArr.filter(el => el.sex === 'm');
  }

  const sumAge = pArr.reduce((acumulator, current) => {
    return acumulator + current.diff;
  }, 0);

  return pArr.length === 0 ? 0 : sumAge / pArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
