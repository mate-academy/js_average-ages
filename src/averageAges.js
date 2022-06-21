'use strict';

// const people = require('./people');

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
function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAverageAge(people) {
  const totalAge = people.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return totalAge / people.length;
}

function calculateMenAverageAge(people, century) {
  let men = getPeopleBySex(people, 'm');
  const menInCentury = men
    .filter(man => Math.ceil(man.died / 100) === century);

  if (century) {
    men = menInCentury;
  }

  return getAverageAge(men);
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
  let women = getPeopleBySex(people, 'f');
  const mothersWithChildren = women.filter(woman =>
    people.some(child => child.mother === woman.name));

  if (withChildren) {
    women = mothersWithChildren;
  }

  return getAverageAge(women);
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
    people.some(mother => child.mother === mother.name));
  const sons = getPeopleBySex(children, 'm');

  if (onlyWithSon) {
    children = sons;
  }

  const ageDiff = children.map(child =>
    child.born - people.find(woman => woman.name === child.mother).born);

  return ageDiff.reduce((sum, difference) =>
    sum + difference, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
