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
  const men = people.filter(({ sex, died }) => (
    century > 0
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm'
  ));

  const menAverage = men.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  return menAverage / men.length;
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
    person.sex === 'f'
    && (withChildren
      ? people.some(samePerson => samePerson.mother === person.name)
      : true)
  );

  const womenAverage = women.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  return womenAverage / women.length;
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
  const children = people.filter(({ sex, mother }) => {
    return onlyWithSon
      ? sex === 'm' && people.find(({ name }) => name === mother)
      : people.find(({ name }) => name === mother);
  });

  const ageDifference = children.map(({ born, mother }) => {
    return born - motherBorn(people, mother);
  });

  return ageDifference.reduce((sum, age) => sum + age) / ageDifference.length;

  function motherBorn(persons, mother) {
    return (persons.find(({ name }) => name === mother)).born;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
