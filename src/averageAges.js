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
  const men = people.filter(person =>
    person.sex === 'm' && (!century
      || Math.ceil(person.died / 100) === century));

  const totalAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return men.length === 0 ? 0 : totalAge / men.length;
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
  const women = people.filter(person =>
    person.sex === 'f' && (!withChildren || people.some(child =>
      child.mother === person.name)));

  const totalAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return women.length === 0 ? 0 : totalAge / women.length;
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
  const ageDifferences = people.reduce((result, person) => {
    const mother = people.find(p => p.name === person.mother);

    if ((onlyWithSon && person.sex === 'm' && mother) || !onlyWithSon) {
      const ageDiff = mother ? person.born - mother.born : 0;

      result.push(ageDiff);
    }

    return result;
  }, []);

  const filteredAgeDifferences = ageDifferences.filter(ageDiff => ageDiff > 0);

  if (filteredAgeDifferences.length === 0) {
    return 0;
  }

  return filteredAgeDifferences.reduce((sum, ageDiff) =>
    sum + ageDiff) / filteredAgeDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
