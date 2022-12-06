'use strict';

function getAverage(arr) {
  return arr
    .map(user => user.died - user.born)
    .reduce((acc, user) => acc + user) / arr.length;
}

function calculateMenAverageAge(people, century) {
  let mans = people.filter(user => user.sex === 'm');

  if (century !== undefined) {
    mans = mans.filter(man => Math.ceil(man.died / 100) === century);
  }

  return getAverage(mans);
}

function calculateWomenAverageAge(people, withChildren) {
  let gorilas = people.filter(user => user.sex === 'f');

  if (withChildren) {
    gorilas = people
      .filter(user => people.some(little => little.mother === user.name)
      );
  }

  return getAverage(gorilas);
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
