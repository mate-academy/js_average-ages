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

function calculateAverageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    const isMan = person.sex === 'm';
    const isCentury = Math.ceil(person.died / 100) === century;

    return century
      ? isMan && isCentury
      : isMan;
  });

  return calculateAverageAge(men);
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
  const women = people.filter(person => {
    const isWoman = person.sex === 'f';
    const hasChildren = people.some(child => child.mother === person.name);

    return withChildren
      ? isWoman && hasChildren
      : isWoman;
  });

  return calculateAverageAge(women);
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
  const children = people.filter(child => {
    const hasMother = people.some(mother => mother.name === child.mother);
    const isMan = child.sex === 'm';

    return onlyWithSon
      ? hasMother && isMan
      : hasMother;
  });

  const difference = children.reduce((ageSum, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return ageSum + (child.born - mother.born);
  }, 0);

  return difference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
