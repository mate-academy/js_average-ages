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
    ? getPeopleBySex(people, 'm').filter(person =>
      century === Math.ceil(person.died / 100))
    : getPeopleBySex(people, 'm');

  return calculateAvgAge(men);

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
    ? getPeopleBySex(people, 'f')
      .filter(mother => people.find(child => child.mother === mother.name))
    : getPeopleBySex(people, 'f');

  return calculateAvgAge(women);
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
  const womenAndChildren = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const ageDifference = womenAndChildren.map(child => (
    child.born - people.find(mother => child.mother === mother.name).born)
  );

  const calcAgeDiff = ageDifference.reduce((a, b) =>
    a + b, 0) / ageDifference.length;

  return calcAgeDiff;
}

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
};

function calculateAvgAge(filteredPeople) {
  return filteredPeople.reduce((sum, person) =>
    person.died - person.born + sum, 0) / filteredPeople.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
