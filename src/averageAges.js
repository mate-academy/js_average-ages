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
  const man = people.filter(person => {
    return century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm';
  });

  const averageManAge = man.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / man.length;

  return averageManAge;
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
  const women = people.filter(person => {
    return withChildren
      ? people.some(children => children.mother === person.name)
      : person.sex === 'f';
  });

  const averageWomenAge = women.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / women.length;

  return averageWomenAge;
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
  const parentsAndChild = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm' && people.some(child => child.name === person.mother)
      : people.some(mom => mom.name === person.mother);
  });

  const age = parentsAndChild.map(kid => {
    const mother = people.find(human => human.name === kid.mother);

    return -(mother.born - kid.born);
  });

  const averageDifferenceAge
    = age.reduce((prev, curr) => prev + curr, 0) / age.length;

  return averageDifferenceAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
