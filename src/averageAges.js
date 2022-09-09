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
  const mans = people.filter(person => person.sex === 'm');
  const filteredMans = century
    ? mans.filter(person => Math.ceil(person.died / 100) === century)
    : mans;

  const sumAge = filteredMans.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return sumAge / filteredMans.length;
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
  const moms = people.map(person => person.mother);
  const women = people.filter(person => person.sex === 'f');
  const filteredWomen = withChildren
    ? women.filter(person => moms.some(mom => mom === person.name))
    : women;

  const sumAge = filteredWomen.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return sumAge / filteredWomen.length;
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
  const sons = people.filter(person => person.sex === 'm');
  const moms = people.filter(
    mom => people.some(child => child.mother === mom.name)
  );
  const ageList = onlyWithSon
    ? sons.map(person => {
      const mom = moms.find(women => women.name === person.mother);

      return mom !== undefined ? person.born - mom.born : null;
    })
    : people.map(person => {
      const mom = moms.find(women => women.name === person.mother);

      return mom !== undefined ? person.born - mom.born : null;
    });

  const cleanAgeList = ageList.filter(age => age !== null);

  const sumAge = cleanAgeList.reduce((sum, age) => sum + age, 0);

  return sumAge / cleanAgeList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
