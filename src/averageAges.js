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
function getAverageAge(peopleList, sex) {
  const sexFilterList = peopleList.filter(sexFilter => sexFilter.sex === sex);
  const ageList = sexFilterList.map(person => person.died - person.born);

  return ageList.reduce((sum, person) => sum + person, 0) / ageList.length;
}

function calculateMenAverageAge(people, century) {
  const mensList = century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  return getAverageAge(mensList, 'm');
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
  const womensList = withChildren
    ? people.filter(woman =>
      people.some(person => person.mother === woman.name))
    : people;

  return getAverageAge(womensList, 'f');
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
  const children = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.some(woman => woman.name === person.mother))
    : people.filter(person => people.some(woman =>
      woman.name === person.mother));

  const averageAgeDifference = children.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  return averageAgeDifference.reduce((sum, current) =>
    sum + current) / averageAgeDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
