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
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const sumOfAges = men.reduce((sum, person) =>
    sum + (person.died - person.born), 0);
  const averageAge = sumOfAges / men.length;

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
  const womenWithChild = people.filter(person => withChildren
    ? people.some(anotherPerson => person.name === anotherPerson.mother)
    : person.sex === 'f'
  );

  const sumOfAges = womenWithChild.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );
  const averageAge = sumOfAges / womenWithChild.length;

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
  const children = people.filter(person => onlyWithSon
    ? people.find(anotherPerson =>
      anotherPerson.name === person.mother && person.sex === 'm'
    )
    : people.find(anotherPerson => anotherPerson.name === person.mother)
  );

  const averageAgeDiff = children
    .reduce((sum, child) => (
      sum
      + (child.born - people.find(person => person.name === child.mother).born)
       / children.length)
    , 0);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
