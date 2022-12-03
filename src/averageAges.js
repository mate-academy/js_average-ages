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
  const men = getPeopleBySex('m', people);

  const averageForMen = century
    ? men.filter(person => (century === Math.ceil(person.died / 100)))
    : men;

  return calculateAverageAge(averageForMen);
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
  const women = getPeopleBySex('f', people);
  const averageForWomen = withChildren
    ? women
      .filter(woman => (
        people.some(kid => kid.mother === woman.name)
      ))
    : women;

  return calculateAverageAge(averageForWomen);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const kids = people.filter(kid => (
    people.find(woman =>
      kid.mother === woman.name)
  ));

  const averageForWomenDIffSon = onlyWithSon
    ? getPeopleBySex('m', kids)
    : kids;

  const totalAge = averageForWomenDIffSon.reduce(
    (total, kid) => total + kid.born - people.find(
      woman => (kid.mother === woman.name)).born, 0);

  return totalAge / averageForWomenDIffSon.length;
}

function getPeopleBySex(sex, people) {
  return people.filter(person => person.sex === sex);
};

function calculateAverageAge(people) {
  const totalAges = people.reduce((total, person) => (
    total + (person.died - person.born)
  ), 0);

  return totalAges / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
