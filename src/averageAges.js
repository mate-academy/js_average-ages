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

function averageAge(ages) {
  return ages.reduce(
    (sumOfAges, curAge) => sumOfAges + curAge
  ) / ages.length;
}

function calculateMenAverageAge(people, century) {
  let menAges = [];

  menAges = people.filter(
    (person) => century === undefined
      ? person.sex === 'm'
      : person.sex === 'm'
      && Math.ceil(person.died / 100) === century
  ).map((person) => person.died - person.born);

  return averageAge(menAges);
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
  let womenAges = [];

  womenAges = people.filter(
    (person) => withChildren
      ? people.some(child => person.name === child.mother)
      : person.sex === 'f'
  ).map((person) => person.died - person.born);

  return averageAge(womenAges);
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
  let children = [];

  children = people.filter(
    child => people.some(mother => onlyWithSon
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name
    ));

  const motherAges = children.map(
    child => child.born - people.find(
      mother => child.mother === mother.name).born
  );

  return averageAge(motherAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
