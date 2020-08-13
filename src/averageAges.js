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
  let men = 0;

  return people.reduce((sum, person) => {
    if (person.sex === 'm'
      && (Math.ceil(person.died / 100) === century || !century)) {
      return (sum * men + (person.died - person.born)) / ++men;
    } else {
      return sum;
    }
  }, 0, century);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = 0;

  return people.reduce((sum, person) => {
    if ((person.sex === 'f' && !withChildren)
      || (person.sex === 'f'
      && people
        .some(child => child.mother === person.name) === withChildren)) {
      return (sum * women + (person.died - person.born)) / ++women;
    } else {
      return sum;
    }
  }, 0, withChildren);
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
  const mothers = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.some(mother => person.mother === mother.name)
    : people.some(mother => person.mother === mother.name)
  );

  const difference = mothers.map(child => child.born - people
    .find(mother => mother.name === child.mother).born);

  return difference.reduce((sum, age) => (
    sum + age
  )) / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
