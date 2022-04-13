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

function avgCalc(arr) {
  return arr.reduce((prev, current) => prev + current) / arr.length;
}

function calculateMenAverageAge(people, century) {
  const menArr = people.filter(element =>
    century
      ? element.sex === 'm'
     && Math.ceil(element.died / 100) === century
      : element.sex === 'm'
  );

  const age = menArr.map(element => element.died - element.born);

  return avgCalc(age);
}
/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womenArr = people.filter(element =>
    withChildren
      ? people.some(child => child.mother === element.name
      && element.sex === 'f')
      : element.sex === 'f'
  );

  const age = womenArr.map(element => element.died - element.born);

  return avgCalc(age);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenArr = people.filter(element =>
    element.sex === 'f' && people.some(child =>
      child.mother === element.name)
  );

  const childrenArr = people.filter(element =>
    onlyWithSon
      ? element.sex === 'm'
      && people.some(mother => element.mother === mother.name)
      : people.some(mother => element.mother === mother.name)
  );

  const dif = childrenArr.map(element =>
    element.born - womenArr.find(mother =>
      element.mother === mother.name).born
  );

  return avgCalc(dif);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
