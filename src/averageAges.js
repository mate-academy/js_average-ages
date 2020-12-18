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
  const ages = [];
  const allMale = (param) =>
    param.every(men => men.sex === 'm' ? ages.push(men.died - men.born) : men);
  const allMaleCentury = (param) =>
    param.every(men => men.sex === 'm'
      && Math.ceil(men.died / 100) === century
      ? ages.push(men.died - men.born) : men);

  century === undefined
    ? allMale(people)
    : allMaleCentury(people);

  return ages.reduce((sum, age) =>
    sum + age, 0) / ages.length;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const ages = [];
  const allWomen = (param) =>
    (param.every(women => women.sex === 'f'
      ? ages.push(women.died - women.born) : women));
  const allWomenWithChild = (param) =>
    param.every((women, i, humans) => women.sex === 'f'
      && humans.some(baby => baby.mother === women.name)
      ? ages.push(women.died - women.born) : women);

  withChildren === undefined
    ? allWomen(people)
    : allWomenWithChild(people);

  return ages.reduce((r, e) =>
    r + e, 0) / ages.length;
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
  const ages = [];
  const allWomenWithChild = (param) =>
    param.map((mom, i, arrayPeople) =>
      arrayPeople.map(baby => baby.mother === mom.name
        ? ages.push(baby.born - mom.born) : baby));
  const allWomenWithSon = (param) =>
    param.map((mom, i, arrayPeople) =>
      arrayPeople.map(baby => baby.mother === mom.name && baby.sex === 'm'
        ? ages.push(baby.born - mom.born) : baby));

  onlyWithSon === undefined
    ? allWomenWithChild(people)
    : allWomenWithSon(people);

  return ages.reduce((r, e) =>
    r + e) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
