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
const callBackReduce = (sum, person) => sum + (person.died - person.born);
// callback for reduce for every function;

function calculateMenAverageAge(people, century) {
  const men = people.filter(item => item.sex === 'm');
  // filter only men;
  const diedThisCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;
  // for diedThisCentury assign our condition - if century is specified or not;

  const agesSum = diedThisCentury.reduce(callBackReduce, 0)
    / diedThisCentury.length;
  //  calculate average by dividing the sum of every male person
  //  by number of male persons;

  return agesSum;
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
  const callBackFilter = (person) =>
    withChildren === true
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f';
    // callback to filter women;

  const women = people.filter(callBackFilter);
  const result = women.reduce(callBackReduce, 0) / women.length;

  return result;
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
  const callBackSon = (sum, child) =>
    sum + (child.born
      - people.find(mother => mother.name === child.mother).born);

  const callBackFilter = (child) =>
    onlyWithSon === true
      ? people.some(mother => child.mother === mother.name
          && child.sex === 'm')
      : people.some(mother => child.mother === mother.name);

  const children = people.filter(callBackFilter);
  const result = children.reduce(callBackSon, 0) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
