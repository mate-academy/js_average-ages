'use strict';

function calculateMenAverageAge(people, century) {
  let mans = people.filter(user => user.sex === 'm');

  if (century !== undefined) {
    mans = mans.filter(man => Math.ceil(man.died / 100) === century);
  }

  return mans
    .map(man => man.died - man.born)
    .reduce((acc, age) => {
      return acc + age;
    }) / mans.length;
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
  let gorilas = people.filter(user => user.sex === 'f');

  if (withChildren) {
    gorilas = people
      .filter(user => user.sex === 'f'
        && people
          .some(little => little.mother === user.name)
      );
  }

  return gorilas
    .map(gorila => gorila.died - gorila.born)
    .reduce((acc, age) => {
      return acc + age;
    }) / gorilas.length;
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
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
