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
  const men = people.filter(person => person.sex === 'm');

  const filteredMen = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const averageAge = filteredMen.reduce((sum, man) =>
    sum + (man.died - man.born), 0) / filteredMen.length || 0;

  return averageAge;
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = withChildren
    ? women.filter(woman => people.some(person => woman.name === person.mother))
    : women;

  const averageAge = womenWithChildren.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0) / womenWithChildren.length || 0;

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
  const mothersWithChild = people.filter(person => {
    const mother = people.find(m => m.name === person.mother);

    return onlyWithSon
      ? mother && person.sex === 'm'
      : mother;
  });

  const totalAgeDiff = mothersWithChild.reduce((sum, person) => {
    const mother = people.find(m => m.name === person.mother);

    return sum + (person.born - mother.born);
  }, 0);

  const averageAgeDiff = totalAgeDiff / mothersWithChild.length || 0;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
