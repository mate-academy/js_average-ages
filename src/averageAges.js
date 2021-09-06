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
  const arrMan = people.filter(el => {
    const calcCentery = Math.ceil(el.died / 100);

    return century
      ? el.sex === 'm' && calcCentery === century
      : el.sex === 'm';
  })
    .map(el => el.died - el.born);

  return arrMan.reduce((sum, man) => sum + man, 0) / arrMan.length;

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
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const arrWoman = people.filter(el =>
    withChildren
      ? people.some(child => child.mother === el.name)
      : el.sex === 'f'
  );

  return arrWoman.reduce((sum, wom) =>
    sum + (wom.died - wom.born), 0) / arrWoman.length;
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
  const arrChild = people.filter(el =>
    onlyWithSon
      ? people.some(child => el.mother === child.name && el.sex === 'm')
      : people.some(child => el.mother === child.name)
  );

  const ageDif = arrChild.map(item => {
    const childMother = people.find(mother => mother.name === item.mother);

    return item.born - childMother.born;
  });

  return ageDif.reduce((count, person) =>
    count + person, 0) / ageDif.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
