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
  // write code here
  const men = people.filter(p => p.sex === 'm');
  const selectedMen = century
    ? men.filter(p => Math.ceil(p.died / 100) === century)
    : men;

  const menAges = selectedMen.map(p => p.died - p.born);

  return calculateAverage(menAges);
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
  // write code here
  const women = people.filter(p => p.sex === 'f');

  if (withChildren) {
    const motherName = people.map(p => p.mother);
    const womenMothers = women.filter(woman => motherName.includes(woman.name));
    const mathersAges = womenMothers.map(p => p.died - p.born);

    return calculateAverage(mathersAges);
  } else {
    const womenAges = women.map(p => p.died - p.born);

    return calculateAverage(womenAges);
  }
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
  const children = people.filter(person => (
    people.some(mother => mother.name === person.mother)
    && (onlyWithSon
      ? person.sex === 'm'
      : true
    )
  ));
  const ageDiffs = children
    .map(child => (
      child.born - people.find(mother => mother.name === child.mother).born)
    );

  return calculateAverage(ageDiffs);
}

function calculateAverage(input) {
  return input.reduce((a, b) => a + b, 0) / input.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
