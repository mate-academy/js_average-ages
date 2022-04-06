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
  const array = century ? people.filter(element => element.sex === 'm'
    && century === Math.ceil(element.died / 100))
    : people.filter(element => element.sex === 'm');

  const finalAge = century ? (array.map((element) =>
    element.died - element.born).reduce((prev, next) => prev + next)
    / array.length)
    : (array.map((element) => element.died
    - element.born).reduce((prev, next) => prev + next) / array.length);

  return +finalAge.toFixed(2);
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
  const agesMothersDiff = people.filter(el =>
    people.find(element => el.name === element.mother)).map((element) =>
    element.died - element.born);

  const motherAge = people.filter(el =>
    el.sex === 'f').map((element) =>
    element.died - element.born);

  const result = withChildren ? agesMothersDiff : motherAge;

  return +(result.reduce((prev, next) =>
    prev + next) / result.length).toFixed(2);
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
  const mothersSon = people.filter(el =>
    people.find(element =>
      (el.name === element.mother) && element.sex === 'm'));

  const mothers = people.filter(el =>
    people.find(element => el.name === element.mother));

  const motherArray = onlyWithSon ? mothersSon : mothers;

  const childrens = people.filter(el =>
    mothers.find(element => el.mother === element.name));

  const childrensSon = people.filter(el =>
    mothersSon.find(element => (el.mother === element.name) && el.sex === 'm'));

  const childrenArray = onlyWithSon ? childrensSon : childrens;

  const finalNum = childrenArray.map(element =>
    element.born - motherArray.find(el =>
      el.name === element.mother).born).reduce((prev, next) =>
    prev + next) / childrenArray.length;

  return +finalNum.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
