'use strict';

/**
 * Implement calculateMenAverageAge function
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 * @param {object[]} people
 * @param {number} century - optional
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const filteredMen = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return averageAge(filteredMen);
}

function averageAge(people) {
  return people
    .reduce((age, person) =>
      age + (person.died - person.born), 0) / people.length;
}
/**
 * Implement calculateWomenAverageAge function
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(woman => woman.sex === 'f');
  const filteredWomen = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;

  return averageAge(filteredWomen);
}
/**
 * Implement calculateAverageAgeDiff function.
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(woman =>
    people.some(person => person.mother === woman.name));

  const children = people.filter(person =>
    mothers.some(woman => woman.name === person.mother));

  const sons = onlyWithSon !== undefined
    ? children.filter(son => son.sex === 'm')
    : children;

  const ageDifference = sons.reduce((diff, child) => {
    const findMother = mothers.find(woman => woman.name === child.mother);

    return diff + child.born - findMother.born;
  }, 0) / sons.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
