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
  const menAge = people
    .filter((man) => arguments.length < 2
      ? man.sex === 'm'
      : man.sex === 'm' && Math.ceil(man.died / 100) === century)
    .map((index) => index.died - index.born);

  return getAverageAge(menAge);
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
  const womenAge = people
    .filter((woman) => arguments.length < 2
      ? woman.sex === 'f'
      : woman.sex === 'f' && people.some(child => child.mother === woman.name))
    .map((index) => index.died - index.born);

  return getAverageAge(womenAge);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const filteredPeople = onlyWithSon
    ? people
      .filter(person => person.sex === 'm' && people
        .find(mother => mother.name === person.mother))
    : people
      .filter(person => people
        .find(mother => mother.name === person.mother));

  const diffArr = filteredPeople.map(person =>
    person.born - people
      .find(mother => mother.name === person.mother).born);

  return getAverageAge(diffArr);
}

function getAverageAge(input) {
  return input.reduce((sum, age) => sum + age, 0) / input.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
