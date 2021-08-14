'use strict';

const averageAge = people => people.reduce((totalAge, person) => totalAge
  + (person.died - person.born), 0) / people.length;

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
  const menFilter = people.filter(({ sex }) => sex === 'm');
  const menFilterWithCentury = menFilter
    .filter(person => Math.ceil(person.died / 100) === century);

  const filteredMen = century === undefined
    ? menFilter
    : menFilterWithCentury;

  return averageAge(filteredMen);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenFilter = withChildren
    ? people.filter(woman => people.some(child =>
      child.mother === woman.name))
    : people.filter(person => person.sex === 'f');

  return averageAge(womenFilter);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenFilter = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(woman => woman.name === person.mother))
    : people.filter(person => people.some(woman =>
      woman.name === person.mother));

  const averageDiffFilter = childrenFilter.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  return averageDiffFilter.reduce((ageDiffSum, difference) =>
    ageDiffSum + difference) / averageDiffFilter.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
