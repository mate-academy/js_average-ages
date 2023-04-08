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
  const men = people
    .filter(man => man.sex === 'm');

  const ageOfMen = century !== undefined
    ? men.filter(year => Math.ceil(year.died / 100) === century)
      .map(age => age.died - age.born)
    : men.map(age => age.died - age.born);

  return ageOfMen.reduce((prev, cur) =>
    prev + cur) / ageOfMen.length;
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
  // all women:
  const women = people.filter(person => person.sex === 'f');
  // all mothers:
  const mothers = people
    .map(person => person.mother)
    .filter((mother, index, arrayOfMothers) =>
      arrayOfMothers.indexOf(mother) === index && mother !== null);
  // if they have chilren:
  const avgAgeOfWomen = withChildren
    ? women.filter(womenName => mothers.includes(womenName.name))
    : women;

  return avgAgeOfWomen
    .map(age => age.died - age.born)
    .reduce((prevAge, currAge) => (prevAge + currAge)) / avgAgeOfWomen.length;
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
// filtered all mothers names from people, without repetitions
  const mothers = people
    .map(person => person.mother)
    .filter((mother, index, arrayOfMothers) =>
      arrayOfMothers.indexOf(mother) === index
      && mother !== null
      && people.find(mothersName => mothersName.name === mother));

  // sons or all children filtered
  const kids = people.filter(kid => mothers.includes(kid.mother));

  const children = onlyWithSon
    ? kids.filter(sons => sons.sex === 'm')
    : kids;

  return children
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born)
    .reduce((ages, age) => ages + age) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
