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
  const men = people.filter(({ sex }) => sex === 'm');

  const filteredByCentury = men.filter(
    ({ died }) => Math.ceil(died / 100) === century
  );

  const createArrayOfAges = (data) =>
    data.map((person) => person.died - person.born);

  const avarageAge = (data) => data.reduce((a, b) => a + b, 0) / data.length;

  return century
    ? Number(avarageAge(createArrayOfAges(filteredByCentury)).toFixed(2))
    : Number(avarageAge(createArrayOfAges(men)).toFixed(2));
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
  const women = people.filter(({ sex }) => sex === 'f');

  const womenWithChildren = women.filter(woman => (
    people.some(child => child.mother === woman.name)));

  const createArrayOfAges = (data) =>
    data.map((person) => person.died - person.born);

  const avarageAge = (data) => data.reduce((a, b) => a + b, 0) / data.length;

  return withChildren
    ? Number(avarageAge(createArrayOfAges(womenWithChildren)).toFixed(2))
    : Number(avarageAge(createArrayOfAges(women)).toFixed(2));
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
  let childrenWithMother = people.filter(child => (
    people.some(person => person.name === child.mother)
  ));

  childrenWithMother = onlyWithSon
    ? childrenWithMother.filter((child) => child.sex === 'm')
    : childrenWithMother;

  const agesDiff = childrenWithMother.reduce((agesDiffSum, child) => {
    const mother = people.find((person) => person.name === child.mother);
    const difference = child.born - mother.born;

    return agesDiffSum + difference;
  }, 0) / childrenWithMother.length;

  return agesDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
