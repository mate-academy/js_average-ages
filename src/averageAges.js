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
  const males = getPeopleBySex(people, 'm');

  const neededMales = century
    ? males.filter(male => Math.ceil(male.died / 100) === century)
    : males;

  return getAverageAge(neededMales);
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
  const females = getPeopleBySex(people, 'f');

  const neededFemales = withChildren
    ? females.filter(female => people.find(
      person => female.name === person.mother))
    : females;

  return getAverageAge(neededFemales);
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
  const children = people.filter(child => people.find(
    person => person.name === child.mother));

  const neededChildren = onlyWithSon
    ? getPeopleBySex(children, 'm')
    : children;

  const ageDiff = neededChildren.reduce(
    (sum, child) => sum + child.born - people.find(
      person => person.name === child.mother).born, 0)
    / neededChildren.length;

  return ageDiff;
}

const getAverageAge = (people) => {
  return people.reduce(
    (sum, person) => (person.died - person.born) + sum, 0)
    / people.length;
};

const getPeopleBySex = (people, sex) => {
  return people.filter(person => person.sex === sex);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
