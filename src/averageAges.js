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
function getAverageAge(arr) {
  const ages = arr.reduce((acc, person) => acc + person.died - person.born, 0);

  return ages / arr.length;
}

function calculateMenAverageAge(people, century) {
  const menArr = people.filter(person => person.sex === 'm'
    && (!century || Math.ceil(person.died / 100) === century));

  return getAverageAge(menArr);
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
  const womenArr = people.filter(person => person.sex === 'f');

  const filteredWomenArr = withChildren
    ? womenArr.filter(person => people.some(y => y.mother === person.name))
    : womenArr;

  return getAverageAge(filteredWomenArr);
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
function calculateAgeDifference(child, mother) {
  return child.born - mother.born;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const arr = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const children = arr.filter(
    person => people.some(mother => mother.name === person.mother)
  );

  const pairs = children.map((child) =>
    ([child, people.find((mother) => mother.name === child.mother)]));

  const sum = pairs.reduce((diff, pair) =>
    diff + calculateAgeDifference(pair[0], pair[1]), 0);

  const result = sum / pairs.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
