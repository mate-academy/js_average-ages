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
    ? (isMan(person) && isFromCentury(person, century))
    : isMan(person)
  );

  return getAverageAge(men);
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
  const women = people.filter(person => withChildren
    ? hasChildren(people, person)
    : isWoman(person)
  );

  return getAverageAge(women);
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
    ? isMan(person) && hasSon(people, person)
    : hasSon(people, person)
  );

  const total = children.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return mother
      ? sum + (child.born - mother.born)
      : sum;
  }, 0);

  return total / children.length;
}

function getAverageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

function isMan(person) {
  return person.sex === 'm';
}

function isFromCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function isWoman(person) {
  return person.sex === 'f';
}

function hasChildren(people, person) {
  return people.some(child => child.mother === person.name);
}

function hasSon(people, person) {
  return people.some(woman => woman.name === person.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
