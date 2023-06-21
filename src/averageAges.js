'use strict';

function averageAge(ageArray) {
  const average = ageArray.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / ageArray.length;

  return average;
}

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
  const ageArray = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  return averageAge(ageArray);
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
  const ageArray = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f');

  return averageAge(ageArray);
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
  const children = people.filter(child => {
    const withSon = onlyWithSon ? child.sex === 'm' : true;
    const withMother = people.some(mother => child.mother === mother.name);

    return withSon && withMother;
  });

  const ageDifference = children.map((child) => {
    const mother = people.find((person) => person.name === child.mother);

    return child.born - mother.born;
  });

  const avgAge = ageDifference.reduce(
    (prev, curr) => prev + curr) / ageDifference.length;

  return avgAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
