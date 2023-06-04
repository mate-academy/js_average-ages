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
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const totalAge = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
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
  const women = people.filter(person => person.sex === 'f');

  const filteredWomen = withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;

  const totalAge = filteredWomen.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);
  const averageAge = totalAge / filteredWomen.length;

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
  const mothers = people.filter(person =>
    !onlyWithSon
      ? people.find(mother => mother.mother === person.name)
      : person.sex === 'f' && people.find(mother =>
        mother.mother === person.name)
  );
  const children = people.filter(person =>
    !onlyWithSon
      ? people.find(child => child.name === person.mother)
      : person.sex === 'm' && people.find(child => child.name === person.mother)
  );
  const ageDiffs = children.map(child => {
    const mother = mothers.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  const averageAge = ageDiffs.reduce((sum, current) =>
    sum + current, 0) / ageDiffs.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
