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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const menAverageAge = men
    .map(age => (
      age.died - age.born
    )).reduce(
      (sum, index) => sum + index
    ) / men.length;

  return menAverageAge;
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && isMother(people, person)
    : person.sex === 'f'
  );

  const womenAverageAge = women
    .map(age => (
      age.died - age.born
    )).reduce((sum, index) => sum + index
    ) / women.length;

  return womenAverageAge;
}

function isMother(people, mother) {
  return people.some(person => person.mother === mother.name);
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
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm' && hasMother(people, person)
    : hasMother(people, person)
  );

  const mothers = people.filter(person =>
    person.sex === 'f' && isMother(people, person));

  const ageDifference = children
    .map(child => child.born - mothers
      .find(
        person => person.name === child.mother
      ).born
    );

  const averageAgeDifference = ageDifference
    .reduce(
      (sum, index) => sum + index
    ) / ageDifference.length;

  return averageAgeDifference;
}

function hasMother(people, child) {
  return people.some(person =>
    person.sex === 'f' && person.name === child.mother
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
