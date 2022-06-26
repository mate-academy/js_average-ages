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

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getPeopleByCentury(people, century) {
  return century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;
}

function getAverageAge(people) {
  return people.reduce(
    (prev, person) => prev + person.died - person.born, 0)
    / people.length;
}

function getWomenWithChildren(women, people, withChildren) {
  return withChildren
    ? women.filter(woman => people.some(person => person.mother === woman.name))
    : women;
}

function calculateMenAverageAge(people, century) {
  const men = getPeopleBySex(people, 'm');
  const targetMen = getPeopleByCentury(men, century);

  return getAverageAge(targetMen);
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
  const women = getPeopleBySex(people, 'f');
  const targetWomen = getWomenWithChildren(women, people, withChildren);

  return getAverageAge(targetWomen);
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
  const ageDifferents = [];
  const potencialChildrens = onlyWithSon
    ? getPeopleBySex(people, 'm')
    : people;

  for (const mother of people) {
    for (const child of potencialChildrens) {
      if (child.mother === mother.name) {
        ageDifferents.push(child.born - mother.born);
      }
    }
  }

  return ageDifferents.reduce((sum, age) => sum + age, 0)
    / ageDifferents.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
