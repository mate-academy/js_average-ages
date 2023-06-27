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
  const men = century
    ? people.filter(
      person => person.sex === 'm' && century === Math.ceil(person.died / 100)
    )
    : people.filter(person => person.sex === 'm');

  const ages = men.map(person => person.died - person.born);
  const totalAge = ages.reduce((prev, age) => prev + age, 0);
  const averageAge = totalAge / men.length;

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
  const women = withChildren
    ? people.filter(
      person => person.sex === 'f'
      && people.some(p => p.mother === person.name)
    )
    : people.filter(person => person.sex === 'f');

  const ages = women.map(person => person.died - person.born);
  const totalAge = ages.reduce((prev, age) => prev + age, 0);
  const averageAge = totalAge / women.length;

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
  const motherChildPairs = onlyWithSon
    ? people.filter(person => person.sex === 'm'
    && people.find(p => p.name === person.mother))
    : people.filter(person => person.mother
    && people.find(p => p.name === person.mother));

  const ageDiffs = motherChildPairs.map(person => {
    const mother = people.find(p => p.name === person.mother);

    return person.born - mother.born;
  });

  const totalAgeDiff = ageDiffs.reduce((prev, ageDiff) => prev + ageDiff, 0);
  const averageAgeDiff = totalAgeDiff / motherChildPairs.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
