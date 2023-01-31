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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people.filter(person => {
    return (century)
      ? ((person.sex === 'm')
        && (Math.ceil(person.died / 100) === century))
      : (person.sex === 'm');
  });

  const ageOfMen = men.map(person => person.died - person.born);

  const averageAge = ageOfMen.reduce((sum, person) =>
    sum + person, 0) / ageOfMen.length;

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
  const women = people.filter(person => {
    return (withChildren)
      ? ((person.sex === 'f')
        && people.find(somePerson => somePerson.mother === person.name))
      : (person.sex === 'f');
  });

  const ageOfWomen = women.map(person => person.died - person.born);

  const averageAge = ageOfWomen.reduce((sum, person) =>
    sum + person, 0) / ageOfWomen.length;

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
  const mothers = people.filter(person => {
    return (onlyWithSon)
      ? ((person.sex === 'f')
        && people.find(somePerson =>
          somePerson.mother === person.name
        && somePerson.sex === 'm'))
      : ((person.sex === 'f')
        && people.find(somePerson => somePerson.mother === person.name));
  });

  const children = people.filter(person => {
    return (onlyWithSon)
      ? (person.sex === 'm'
        && mothers.find(woman => person.mother === woman.name))
      : (mothers.find(woman => person.mother === woman.name));
  });

  const ageDifferences = children.map(child => {
    const motherIndex = people.findIndex(somePerson =>
      somePerson.name === child.mother);

    return child.born - people[motherIndex].born;
  });

  const averageDifference = ageDifferences.reduce((sum, value) =>
    sum + value, 0) / ageDifferences.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
