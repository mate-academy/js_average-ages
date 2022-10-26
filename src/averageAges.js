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
  const men = (!century)
    ? people.filter(person => person.sex === 'm')
    : people.filter(
      person => person.sex === 'm' && century === Math.ceil(person.died / 100)
    );

  return calculateAverageAge(men);
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
  const women = people.filter(person => person.sex === 'f');
  const mothers = women.filter(woman => (
    people.find(person => woman.name === person.mother))
  );

  const womenAverageAge = (!withChildren)
    ? calculateAverageAge(women)
    : calculateAverageAge(mothers);

  return +womenAverageAge.toFixed(2);
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
    ? people.filter(person => people.find(mother => (
      mother.name === person.mother && person.sex === 'm'))
    )
    : people.filter(person => people.find(mother => (
      mother.name === person.mother))
    );

  const ageDifference = children.reduce((sum, child) => (
    sum + child.born - people.find(mother => mother.name === child.mother).born
  ), 0);

  return +(ageDifference / children.length).toFixed(2);
}

function calculateAverageAge(people) {
  const averageAge = people.reduce((sumAge, person) => (
    sumAge + (person.died - person.born)
  ), 0) / people.length;

  return +averageAge.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
