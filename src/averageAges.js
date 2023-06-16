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
  const filteredMale = century
    ? people.filter(
      (person) =>
        Math.ceil(person.died / 100) === century && person.sex === 'm'
    )
    : people.filter(
      (person) => person.sex === 'm'
    );

  const maleAge = filteredMale.map((person) => person.died - person.born);
  const totalAge = maleAge.reduce((total, num) => total + num, 0);
  const average = totalAge / filteredMale.length;

  return average;
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
  const filteredFemale = withChildren
    ? people.filter(
      (person) =>
        people.some((child) => child.mother === person.name)
        && person.sex === 'f'
    )
    : people.filter(
      (person) => person.sex === 'f'
    );

  const femaleAge = filteredFemale.map((person) => person.died - person.born);
  const totalAge = femaleAge.reduce((total, num) => total + num, 0);
  const average = totalAge / filteredFemale.length;

  return average;
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
  const mothers = people.filter((person) => {
    return people.some((child) => child.mother === person.name);
  });

  const children = people.filter((child) => {
    return people.some((mother) => {
      const onlySon = onlyWithSon
        ? (child.mother === mother.name) && child.sex === 'm'
        : child.mother === mother.name;

      return onlySon;
    });
  });

  const averageAgeDifference = children.reduce((totalAges, child) => {
    const mother = mothers.find((person) => person.name === child.mother);
    const ageDifference = child.born - mother.born;

    return totalAges + ageDifference;
  }, 0) / children.length;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
