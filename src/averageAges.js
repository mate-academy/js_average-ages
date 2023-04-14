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
  let mens = people.filter(item => item.sex === 'm');

  mens = !century ? mens
    : mens.filter(item => {
      return Math.ceil(item.died / 100) === century;
    });

  const averageMensAge = mens.map(({ died, born }) => died - born)
    .reduce((acc, item) => acc + item, 0) / mens.length;

  return averageMensAge;
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
  let women = people.filter(item => item.sex === 'f');

  women = !withChildren ? women
    : women.filter(({ name }) =>
      people.some(({ mother }) => mother === name));

  const averageWomanAge = women.map(({ born, died }) => died - born)
    .reduce((acc, item) => acc + item, 0) / women.length;

  return averageWomanAge;
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
  let children = people.filter(child =>
    people.some(person =>
      child.mother === person.name));

  children = !onlyWithSon
    ? children : children.filter(child => child.sex === 'm');

  const ageDiffArr = children.map(child => {
    const personMother = people.find(mother => mother.name === child.mother);

    return child.born - personMother.born;
  });
  const averageAgeDiff = ageDiffArr.reduce((acc, item) => acc + item, 0)
  / ageDiffArr.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
