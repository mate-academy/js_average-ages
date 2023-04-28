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
  const men = people.filter((person) => person.sex === 'm');
  const deathsInterval = century
    ? men.filter((person) => Math.ceil(person.died / 100) === century)
    : men;
  const ages = deathsInterval.map((person) => person.died - person.born);
  const averageAge = ages.reduce((sum, age) => sum + age) / ages.length;

  return averageAge;
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
  const women = people.filter((person) => person.sex === 'f');
  const peopleMothers = people.map((person) => person.mother);
  const mothersOrNot = withChildren
    ? women.filter((woman) => peopleMothers.includes(woman.name))
    : women;
  const ages = mothersOrNot.map((person) => person.died - person.born);
  const averageAge = ages.reduce((sum, age) => sum + age) / ages.length;

  return averageAge;
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
  const peopleWithMothers = people.filter((person) => person.mother);
  const onlySonsOrNot = onlyWithSon
    ? peopleWithMothers.filter((person) => person.sex === 'm')
    : peopleWithMothers;
  const women = people.filter((person) => person.sex === 'f');
  const womenBirthDate = women.reduce((acc, person) => ({
    ...acc,
    [person.name]: person.born,
  }), {});
  const agesDifference = onlySonsOrNot.map((person) => {
    return person.born - womenBirthDate[person.mother];
  });
  const filteredDiff = agesDifference.filter((age) => age);
  const averageAgeDiff
    = filteredDiff.reduce((sum, age) => sum + age) / filteredDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
