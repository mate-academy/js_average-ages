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
  const male = people.filter((person) => person.sex === 'm');
  const isMaleDied = century
    ? male.filter((person) => Math.ceil(person.died / 100) === century)
    : male;

  const years = isMaleDied.map((person) => person.died - person.born);
  const averageMaleAge = years.reduce((sum, age) => sum + age)
    / years.length;

  return averageMaleAge;
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
  const female = people.filter((person) => person.sex === 'f');
  const someoneMother = people.map((person) => person.mother);
  const isSheMother = withChildren
    ? female.filter((person) => someoneMother.includes(person.name))
    : female;

  const years = isSheMother.map((person) => person.died - person.born);
  const averageFemaleAge = years.reduce((sum, age) => sum + age)
    / years.length;

  return averageFemaleAge;
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
  const haveMother = people.filter((person) => person.mother);
  const isOnlySon = onlyWithSon
    ? haveMother.filter((person) => person.sex === 'm')
    : haveMother;

  const female = people.filter((person) => person.sex === 'f');
  const femaleDateOfBirth = female.reduce((result, person) => ({
    ...result,
    [person.name]: person.born,
  }), {});

  const difference = isOnlySon.map((person) => {
    return person.born - femaleDateOfBirth[person.mother];
  });

  const filterDiff = difference.filter((age) => age);
  const averageDifference
    = filterDiff.reduce((sum, age) => sum + age) / filterDiff.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
