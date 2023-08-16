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
    : person.sex === 'm');

  const menAgeSum = men
    .map(man => man.died - man.born)
    .reduce((prev, age) => prev + age, 0);

  return menAgeSum / men.length;
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
  const mothers = people.map(person => person.mother);
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && mothers.includes(person.name)
    : person.sex === 'f');

  const womenAgeSum = women
    .map(woman => woman.died - woman.born)
    .reduce((prev, age) => prev + age, 0);

  return womenAgeSum / women.length;
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
  const allWomen = people.filter(person => person.sex === 'f');
  const allWomenNames = allWomen.map(woman => woman.name);

  const peopleWithMothers = people.filter(person => onlyWithSon
    ? allWomenNames.includes(person.mother) && person.sex === 'm'
    : allWomenNames.includes(person.mother));

  const ageDifferences = peopleWithMothers.map(person => {
    const mother = allWomen.find(woman => person.mother === woman.name);

    return person.born - mother.born;
  });

  const ageDifferencesSum = ageDifferences.reduce((prev, age) => prev + age, 0);

  return ageDifferencesSum / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
