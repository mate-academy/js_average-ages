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

  men = century ? men.filter(
    person => Math.ceil(person.died / 100) === century
  ) : men;

  return Number(((men.map(person => person.died - person.born)
    .reduce((sum, year) => sum + year)) / men.length).toFixed(2));
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

  women = withChildren ? women.filter(woman => (
    people.find(person => woman.name === person.mother)
  )) : women;

  return Number(((women.map(person => person.died - person.born)
    .reduce((sum, year) => sum + year)) / women.length).toFixed(2));
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
  let mothers = people.filter(woman => {
    return woman.sex === 'f'
      && people.find(child => child.mother === woman.name);
  });

  let children = people.filter(child => (
    people.find(woman => child.mother === woman.name)
  ));

  mothers = onlyWithSon ? mothers.filter(woman => {
    return people.find(child => (
      child.mother === woman.name && child.sex === 'm'
    ));
  }) : mothers;

  children = onlyWithSon ? children.filter(child => {
    return people.find(woman => (
      child.mother === woman.name && child.sex === 'm'
    ));
  }) : children;

  const ageDifferenceSum = children.reduce((sum, child) => {
    const mom = mothers.find(woman => child.mother === woman.name);
    const ageDifference = child.born - mom.born;

    return sum + ageDifference;
  }, 0);

  return Number((ageDifferenceSum / children.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
