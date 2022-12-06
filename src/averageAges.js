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
  const getMen = people.filter((person) => person.sex === 'm');
  const currentMan = century
    ? getMen.filter((person) => Math.ceil(person.died / 100) === century)
    : getMen;

  return currentMan
    .map((person) => person.died - person.born)
    .reduce((a, b) => a + b) / currentMan.length;
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
  let getWomen = people.filter((person) => person.sex === 'f');

  if (withChildren) {
    getWomen = people.filter((person) => person.sex === 'f'
    && people.some((child) => person.name === child.mother));
  }

  const lifeTime = getWomen.map((person) => person.died - person.born);
  const ageSum = lifeTime.reduce((sum, age) => sum + age);
  const averageAge = (ageSum / lifeTime.length);

  return averageAge;
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
  let getChildren = people.filter((child) => {
    return people.some((person) => person.name === child.mother);
  });

  getChildren = onlyWithSon
    ? getChildren.filter((child) => child.sex === 'm')
    : getChildren;

  const sumAge = getChildren.reduce((finalValue, child) => {
    const mother = people.find(p => p.name === child.mother);

    return finalValue + (child.born - mother.born);
  }, 0);

  return sumAge / getChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
