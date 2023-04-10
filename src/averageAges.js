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

  let ages = men.map(person => person.died - person.born);

  const centuryPersons = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  if (century) {
    ages = centuryPersons.map(person => person.died - person.born);
  }

  const count = ages.reduce((sum, age) => sum + age, 0);

  return count / ages.length;
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
  const wemen = people.filter(person => person.sex === 'f');

  let ages = wemen.map(person => person.died - person.born);

  if (withChildren) {
    const womenWithChildren = wemen.filter(person =>
      people.some(p => p.mother === person.name)
    );

    ages = womenWithChildren.map(person => person.died - person.born);
  }

  const count = ages.reduce((sum, age) => sum + age, 0);

  return count / ages.length;
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
  // const wemen = people.filter(person => person.sex === 'f');

  const children = people.filter(person =>
    onlyWithSon
      ? people.some(item => item.name === person.mother && person.sex === 'm')
      : people.some(item => item.name === person.mother)
  );

  const agesDifferences = children.reduce((sum, child) => {
    const mother = people.find(
      mom => (mom.name === child.mother)
    );

    const difference = child.born - mother.born;

    return sum + difference;
  }, 0);

  return agesDifferences / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
