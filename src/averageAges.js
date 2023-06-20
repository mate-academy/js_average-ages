'use strict';

const averageAge = function(array) {
  return array
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b) / array.length;
};

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
  const sexCondition = (person) => person.sex === 'm';
  const centuryCondition = (person) => Math.ceil(person.died / 100) === century;

  const filteredArr = people
    .filter(person =>
      century
        ? sexCondition(person) && centuryCondition(person)
        : sexCondition(person));

  return averageAge(filteredArr);
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
  const sexCondition = (person) => person.sex === 'f';
  const childCondition = (child, mother) => child.mother === mother.name;

  const filteredArr = people
    .filter(person => withChildren
      ? sexCondition(person) && people
        .some(child => childCondition(child, person))
      : sexCondition(person));

  return averageAge(filteredArr);
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
  const sonCondition = (child) => child.sex === 'm';
  
  const relativesCondition = (mothersArr, child) => mothersArr
    .some(mother => mother.name === child.mother);

  const mothers = people
    .filter(person => people
      .some(child => child.mother === person.name));
      
  const children = people
    .filter(child => onlyWithSon ? sonCondition(child)
  && relativesCondition(mothers, child)
      : relativesCondition(mothers, child));

  const ages = children
    .reduce((a, b)=> a += b.born - mothers
      .find(mother => mother.name === b.mother).born, 0);

  return ages
    .reduce((a, b) => a + b) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
