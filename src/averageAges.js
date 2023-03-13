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
  const arrOfMen = [...people].filter((person) =>
    person.sex === 'm'
      && (typeof century !== 'number'
      || Math.ceil(person.died / 100) === century));

  return getAverageAge(arrOfMen);
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
  const arrOfWomen = [...people].filter((person) =>
    person.sex === 'f'
      && (!withChildren
        || people.some(({ mother }) => mother === person.name)));

  return getAverageAge(arrOfWomen);
}

/**
   * Implement calculateAverageAgeDiff function.
   *
   * The function returns an average age
   *  difference between a child and his or her
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
  const arrOfChildren = [...people].filter(({ mother, sex }) =>
    people.some(parent => mother === parent.name)
      && (!onlyWithSon || sex === 'm'));

  return arrOfChildren.reduce((sum, child) => {
    const mother = people.find(parent => parent.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / (arrOfChildren.length || 1);
}

function getAverageAge(people) {
  return people
    .reduce((sum, { born, died }) =>
      sum + died - born
    , 0) / (people.length || 1);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
