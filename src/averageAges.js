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
  const men = people.filter(person => person.sex === 'm' && (
    !century || Math.ceil(person.died / 100) === century)
  );

  return averageAge(men);
}

const averageAge = peopleFilter =>
  peopleFilter.reduce((sumAge, person) =>
    sumAge + person.died - person.born, 0) / peopleFilter.length;
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
  const filteredWomen = people.filter(person => person.sex === 'f');

  const filteredByChildren = withChildren
    ? filteredWomen.filter(woman =>
      people.some(person => person.mother === woman.name))
    : filteredWomen;

  return getAverageAge(filteredByChildren);
}

function getAverageAge(people) {
  const ages = people.map(person => person.died - person.born);

  return ages.length ? ages.reduce((acc, age) => acc + age) / ages.length : 0;
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
  function hasSon(person) {
    return people.find(woman => woman.name === person.mother)
      && person.sex === 'm';
  }

  const children = people.filter(person => onlyWithSon
    ? hasSon(person)
    : people.find(woman => woman.name === person.mother));

  return children.map(person =>
    person.born - people.find(mother => person.mother === mother.name).born)
    .reduce((a, b) => a + b, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
