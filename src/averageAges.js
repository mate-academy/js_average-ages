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
    ? (genderIs(person, 'm') && getPersonCentury(person, century))
    : (genderIs(person, 'm')));

  return getAvarageAge(men);
}

function genderIs(person, sex) {
  return person.sex === sex;
}

function getPersonCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function getAvarageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
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
    ? genderIs(person, 'f') && hasChildren(person, people)
    : genderIs(person, 'f'));

  return getAvarageAge(women);
}

function hasChildren(person, people) {
  return people.some(woman => woman.mother === person.name);
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
    ? genderIs(person, 'm') && hasMother(people, person)
    : hasMother(people, person));

  const sumOfAges = children.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return (sum + (child.born - mother.born));
  }, 0);

  return sumOfAges / children.length;
}

function hasMother(people, person) {
  return people.some(woman => woman.name === person.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
