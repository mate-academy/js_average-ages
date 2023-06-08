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
  const filteredMen = century
    ? people
      .filter(person => Math.ceil(person.died / 100) === century
      && person.sex === 'm')
    : people
      .filter(person => person.sex === 'm');

  const totalAge = filteredMen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const averageAge = totalAge / filteredMen.length;

  return +averageAge.toFixed(2);
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
  const filteredWomen = withChildren
    ? people.filter(person => people.some(child => child.mother === person.name)
      && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  const totalAge = filteredWomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  const averageAge = totalAge / filteredWomen.length;

  return +averageAge.toFixed(2);
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
  const children = people.filter(person =>
    people.find(child => child.name === person.mother)
    && (!onlyWithSon || (person.sex === 'm' && people
      .find(child => child.name === person.mother)))
  );

  const mothers = people.filter(person =>
    person.sex === 'f'
    && (!onlyWithSon || people.find(mommy => mommy.mother === person.name))
  );

  const diff = children.reduce((sum, data) =>
    sum + (data.born - mothers
      .find(mommy => mommy.name === data.mother).born), 0
  ) / children.length;

  return diff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
