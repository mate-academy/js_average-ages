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
  const filteredMale = people.filter((person) => person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true));

  const maleAge = filteredMale.map((person) => person.died - person.born);

  return countAverageAge(maleAge);
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
  const filteredFemale = people.filter((person) => person.sex === 'f'
    && (withChildren ? people.some((child) =>
      child.mother === person.name) : true));

  const femaleAge = filteredFemale.map((person) => person.died - person.born);

  return countAverageAge(femaleAge);
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
    const onlySon = onlyWithSon
      ? child.sex === 'm'
      : true;

    return onlySon && people.some((mother) => {
      return child.mother === mother.name;
    });
  });

  const ageDifference = children.map((child) => {
    return child.born - mothers.find(
      (person) => person.name === child.mother).born;
  });

  return countAverageAge(ageDifference);
}

function countAverageAge(ageArr) {
  const averageAge = ageArr.reduce((totalAges, age) => {
    return totalAges + age;
  }, 0) / ageArr.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
