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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  men = men.map(({ born, died }) => died - born);

  const commonAge = men.reduce((prevValue, currValue) => prevValue + currValue);

  return commonAge / men.length;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(person => people.some(child => (
      child.mother === person.name)
    ));
  }

  women = women.map(({ born, died }) => died - born);

  const commonAge = women.reduce(
    (prevValue, currValue) => prevValue + currValue
  );

  return commonAge / women.length;
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
  let children = people.filter(person => people.some(
    mother => mother.name === person.mother)
  );

  if (onlyWithSon) {
    children = children.filter(person => person.sex === 'm');
  }

  children = children.map(
    person =>
      person.born
      - people.find(mother => mother.name === person.mother).born
  );

  const commonAge = children.reduce(
    (prevValue, currValue) => prevValue + currValue
  );

  return commonAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
