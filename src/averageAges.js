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

  const onlyMan = people
    .filter(man => man.sex === 'm');

  const manLivingAge = onlyMan
    .map(liveAge => liveAge.died - liveAge.born);

  const manAverageAge = manLivingAge
    .reduce((acc, cur) => acc + cur, 0) / manLivingAge.length;

  const manWithCentury = onlyMan
    .filter(man => Math.ceil(man.died / 100) === century);

  const manLivingAgeWithCentury = manWithCentury
    .map(liveAge => liveAge.died - liveAge.born);

  const averageAgeInCentury = manLivingAgeWithCentury
    .reduce((acc, cur) => acc + cur, 0) / manLivingAgeWithCentury.length;

  return century ? averageAgeInCentury : manAverageAge;
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
  const onlyWoman = people
    .filter(woman => woman.sex === 'f');

  const womanLivingAge = onlyWoman
    .map(liveAge => liveAge.died - liveAge.born);

  const womanAverageAge = womanLivingAge
    .reduce((acc, cur) => acc + cur, 0) / womanLivingAge.length;

  const onlyMother = onlyWoman
    .filter(mother => people
      .some(children => children.mother === mother.name));

  const motherLivingAge = onlyMother
    .map(liveAge => liveAge.died - liveAge.born);

  const motherAverageAge = motherLivingAge
    .reduce((acc, cur) => acc + cur, 0) / motherLivingAge.length;

  return withChildren ? motherAverageAge : womanAverageAge;
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
  const children = people
    .filter(person => people.some(child => person.mother === child.name));

  const averageAgeWithChildren = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born)
    .reduce((a, b) => a + b) / children.length;

  const childrenSon = children
    .filter(person => person.sex === 'm');

  const averageAgeOnlyWithSon = childrenSon
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born)
    .reduce((a, b) => a + b) / childrenSon.length;

  return onlyWithSon ? averageAgeOnlyWithSon : averageAgeWithChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
