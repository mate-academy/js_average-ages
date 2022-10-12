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
  const manList = century
    ? people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century,)
    : people.filter(person => person.sex === 'm');

  const totalAge = manList.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return totalAge / manList.length;
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
  const womanList = withChildren
    ? people.filter(
      person => person.sex === 'f'
        && people.find(
          child => child.mother === person.name))
    : people.filter(
      person => person.sex === 'f');

  const totalAge = womanList.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return totalAge / womanList.length;
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
    ? people.filter(
      child => child.sex === 'm' && child.mother && people.find(
        person => person.name === child.mother
      ))
    : people.filter(
      child => child.mother && people.find(
        person => person.name === child.mother
      )
    );

  let averageAge = children.reduce((sum, child) =>
    sum + child.born - (people.find(
      person => person.name === child.mother).born), 0);

  averageAge = averageAge / children.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
