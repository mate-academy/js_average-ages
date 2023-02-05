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
 *
 */

function calculateAgeDiff(people, womenWithChildren) {
  const ageDiff = people.map(person => {
    const personMother = womenWithChildren.find(woman =>
      woman.name === person.mother);

    const presentInList = !personMother;

    return (presentInList) ? false : person.born - personMother.born;
  }).filter(mother => mother);

  return ageDiff.reduce((sum, a) => (sum + a)) / ageDiff.length;
}

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAverageAge(people) {
  return people.reduce((sum, person) =>
    (sum + person.died - person.born), 0) / people.length;
}

function hasChildren(woman, people) {
  return people.some(person => person.mother === woman.name);
}

function calculateMenAverageAge(people, century) {
  const chooseMen = (century)
    ? people.filter(person =>
      Math.ceil(person.died / 100) === century && person.sex === 'm'
    )
    : getPeopleBySex(people, 'm');

  return getAverageAge(chooseMen);
};

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
  const choosenWomen = (withChildren)
    ? people.filter(person =>
      hasChildren(person, people) && person.sex === 'f'
    )
    : getPeopleBySex(people, 'f');

  return getAverageAge(choosenWomen);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at childbirth)
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
  const women = getPeopleBySex(people, 'f');
  const men = getPeopleBySex(people, 'm');

  const womenWithChildren = (onlyWithSon)
    ? women.filter(woman => hasChildren(woman, men))
    : women.filter(woman => hasChildren(woman, people));

  const ageDiff = (onlyWithSon)
    ? calculateAgeDiff(men, womenWithChildren)
    : calculateAgeDiff(people, womenWithChildren);

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
