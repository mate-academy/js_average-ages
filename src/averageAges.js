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
  const men = people.filter((person) => person.sex === 'm');

  const menInCentury = century
    ? men.filter((person) => Math.ceil(person.died / 100) === century)
    : men;

  const totalAge = menInCentury.reduce((sum, person) =>
    sum + person.died - person.born, 0);

  return totalAge / menInCentury.length;
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
  const women = people.filter((person) => person.sex === 'f');

  const womenWithChildren = withChildren
    ? women.filter(woman => people
      .some(person => person.mother === woman.name))
    : women;

  const totalAge = womenWithChildren.reduce((sum, woman) =>
    sum + woman.died - woman.born, 0);

  return totalAge / womenWithChildren.length;
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
  const children = people.filter((person) => (
    people.some((woman) => woman.name === person.mother) && (
      onlyWithSon
        ? person.sex === 'm'
        : true
    )
  ));

  const differencesSum = children.reduce((acc, child) => {
    const mother = people.find((mom) => mom.name === child.mother);

    return acc + (child.born - mother.born);
  }, 0);

  return differencesSum / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
