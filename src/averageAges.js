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
  let peopleCentury = [...people];

  if (century !== null && typeof century === 'number') {
    peopleCentury = people.filter(person =>
      Math.ceil(person.died / 100) === century);
  }

  const men = peopleCentury.filter(person => person.sex === 'm');

  const sumAge = men.reduce((total, person) =>
    total + (person.died - person.born), 0);
  const averageAge = sumAge / men.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withwomen` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has women you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withwomen - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withwomen) {
  let women = [...people];

  if (withwomen === true) {
    women = people.filter(person =>
      person.sex === 'f' && people.some(p => p.mother === person.name));
  } else {
    women = women.filter(person => person.sex === 'f');
  }

  const sumAge = women.reduce((total, person) =>
    total + (person.died - person.born), 0);

  const averageAge = sumAge / women.length;

  return averageAge;
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
  const mothers = people.filter((person) =>
    people.some((child) => child.mother === person.name)
  );

  const children = people.filter((child) =>
    (onlyWithSon ? child.sex === 'm' : true)
      && (people.some((mother) => child.mother === mother.name))
  );

  const diffAge = children.map((child) =>
    child.born - mothers.find((mother) => mother.name === child.mother).born
  );

  const averageAge = diffAge.reduce((total, age) =>
    total + age, 0) / diffAge.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
