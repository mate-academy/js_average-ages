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
  const men = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => (
      person.sex === 'm' && (Math.ceil(person.died / 100) === century)
    ));

  const sumOfAges = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  return sumOfAges / men.length;
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
      (person, index, peopleList) => (
        peopleList.some(potentialChild => (
          potentialChild.mother === `${person.name}`
        ))
      )
    )
    : people.filter(person => person.sex === 'f');

  const sumOfAges = women.reduce((sum, woman) => (
    sum + (woman.died - woman.born)
  ), 0);

  return sumOfAges / women.length;
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
  const childrenWithMotherHere = onlyWithSon
    ? people.filter((child, index, currentList) => (
      child.sex === 'm'
      && currentList.some(person => person.name === child.mother)
    ))
    : people.filter((child, index, currentList) => (
      currentList.some(person => person.name === child.mother)
    ));

  const ageDiffs = childrenWithMotherHere.map(child => (
    child.born - people.find(person => person.name === child.mother).born
  ));

  const sumOfAgeDiffs = ageDiffs.reduce((sum, ageDiff) => sum + ageDiff, 0);

  return sumOfAgeDiffs / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
