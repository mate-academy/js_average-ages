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
  const male = (century === undefined)
    ? people.filter(human => human.sex === 'm')
    : people.filter(human => human.sex === 'm'
      && century === Math.ceil(human.died / 100));

  const sumOfFilteredMale = male.map(human => human.died - human.born)
    .reduce((accumulator, age) => accumulator + age);
  const averageAge = sumOfFilteredMale / male.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const female = (withChildren === undefined)
    ? people.filter(human => human.sex === 'f')
    : people.filter(human => human.sex === 'f'
      && people.find(child => child.mother === human.name));

  const sumOfFilteredFemale = female.map(human => human.died - human.born)
    .reduce((accumulator, age) => accumulator + age);
  const averageAge = sumOfFilteredFemale / female.length;

  return averageAge;
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
  const children = people.filter(human => (onlyWithSon === undefined)
    ? people.some(mother => mother.name === human.mother)
    : people.some(mother => mother.name === human.mother)
      && human.sex === 'm');

  const differenceAge = children.map(human =>
    human.born - people.find(mother => mother.name === human.mother).born);

  const averageAge = differenceAge.reduce((accumulator, age) =>
    accumulator + age) / differenceAge.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
