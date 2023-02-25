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
  const men = people.filter(
    person => century
      ? getPersonGender(person, 'm')
      && getDateOfDied(person, century)
      : getPersonGender(person, 'm'));

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
  const women = people.filter(
    person => withChildren
      ? getChildren(people, person)
      : getPersonGender(person, 'f'));

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
  const children = people.filter(
    child => onlyWithSon
      ? getPersonGender(child, 'm')
      && getMother(people, child)
      : getMother(people, child));

  return diffChildAndMother(children, people);
}

function getPersonGender(person, sex) {
  return person.sex === sex;
}

function getDateOfDied(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function getAverageAge(people) {
  return people.reduce(
    (acc, person) => acc + (person.died - person.born), 0) / people.length;
}

function getChildren(people, person) {
  return people.some(children => children.mother === person.name);
}

function getMother(people, person) {
  return people.some(woman => woman.name === person.mother);
}

function diffChildAndMother(children, people) {
  const total = children.reduce((acc, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return (acc + (child.born - mother.born));
  }, 0);

  return total / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
