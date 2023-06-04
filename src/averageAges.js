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
const sumAgeDifference = (sum, x) => sum + (x.died - x.born);
const averageAge
= (peopleArray) => peopleArray.reduce(sumAgeDifference, 0) / peopleArray.length;

function calculateMenAverageAge(people, century) {
  const menArray = century
    ? people.filter((x) =>
      ((x.sex === 'm') && (century === Math.ceil(x.died / 100))))
    : people.filter((x) => ((x.sex === 'm')));

  return averageAge(menArray);
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
  const womenArray = withChildren
    ? people.filter((x) =>
      ((x.sex === 'f') && people.some(isMother => x.name === isMother.mother)))
    : people.filter((x) => ((x.sex === 'f')));

  return averageAge(womenArray);
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
  const childrenArray = onlyWithSon
    ? people.filter((x) =>
      (people.some(haveMother => x.mother === haveMother.name)
      && (x.sex === 'm')))
    : people.filter((x) =>
      (people.some(haveMother => x.mother === haveMother.name)));

  return childrenArray.reduce((sum, child) => {
    const mother = people.find(({ name }) => name === child.mother);

    return sum + child.born - mother.born;
  }, 0) / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
