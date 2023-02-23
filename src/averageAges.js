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
  const filteredMans = people
    .filter(person =>
      person.sex === 'm' && (
        Math.ceil(person.died / 100) === century || !century));
  const calculateLifeYears = filteredMans.map(man => man.died - man.born);

  return calculateLifeYears.reduce((sum, year) =>
    sum + year) / calculateLifeYears.length;
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
  const filteredWoman = people
    .filter(persons => persons.sex === 'f' && (people
      .some(child => child.mother === persons.name) || !withChildren));

  const calculateLifeYears = filteredWoman.map(woman =>
    woman.died - woman.born);

  return calculateLifeYears.reduce((sum, year) =>
    sum + year) / calculateLifeYears.length;
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
  const filteredWoman = people
    .filter(person =>
      (!onlyWithSon || person.sex === 'm') && people
        .some(child => child.name === person.mother));

  const findDeferenceYears = filteredWoman
    .map(child => child.born - people
      .find(person => person.name === child.mother).born);

  const calculateTotalYears = findDeferenceYears.reduce(
    (sum, year) => sum + year
  );

  return calculateTotalYears / findDeferenceYears.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
