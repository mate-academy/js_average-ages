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
  const mens = people.filter(men => men.sex === 'm');
  const mensInCentury
  = mens.filter(men => Math.ceil(men.died / 100) === century);
  const trueMens = century
    ? mensInCentury
    : mens;
  const averageAge = trueMens.map(men => men.died - men.born);

  return averageAge.reduce((a, b) => a + b) / trueMens.length;
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
  const womens = people.filter(person => person.sex === 'f');
  const womensWithChildren = womens.filter(
    woman => people.some(child => child.mother === woman.name)
  );

  const trueWomens = withChildren
    ? womensWithChildren
    : womens;

  const avarageAge = trueWomens.map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b) / trueWomens.length;

  return avarageAge;
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
  const allChild = people.filter(child => child.mother !== null
    && people.find(woman => woman.name === child.mother));
  const sons = allChild.filter(child => child.sex === 'm');

  const children = onlyWithSon
    ? sons
    : allChild;

  const ageDiff = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return ageDiff.reduce((a, b) => a + b) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
