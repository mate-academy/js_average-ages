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
  const ageOfMen = century !== undefined
    ? people.filter(year => Math.ceil(year.died / 100) === century)
      .filter(manOrWhat => manOrWhat.sex === 'm')
      .map(age => age.died - age.born)
    : people
      .filter(manOrWhat => manOrWhat.sex === 'm')
      .map(age => age.died - age.born);

  return Math.round((ageOfMen.reduce((prev, cur) =>
    prev + cur) / ageOfMen.length) * 100) / 100;
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
  const mothers = people
    .map(mother => mother.mother)
    .map((mother, index, arrayOfMothers) =>
      arrayOfMothers.indexOf(mother) === index ? mother : null)
    .filter(mother => mother !== null);

  const mothersAge = people
    .filter(mothersName => mothers.includes(mothersName.name))
    .map(year => year.died - year.born);

  const avarageAgeWoman = people
    .filter(woman => woman.sex === 'f')
    .map(year => year.died - year.born);

  return withChildren !== undefined
    ? Math.round((mothersAge
      .reduce((prev, cur) => prev + cur) / mothersAge.length) * 100) / 100
    : Math.round((avarageAgeWoman
      .reduce((prev, cur) => prev + cur) / avarageAgeWoman.length) * 100) / 100;
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
  const mothers = people
    .map(mother => mother.mother)
    .filter((mother, index, arrayOfMothers) =>
      arrayOfMothers.indexOf(mother) === index ? mother : null)
    .filter(mother => mother !== null)
    .filter(mother => people.find(mothersName => mothersName.name === mother));

  const children = onlyWithSon
    ? people
      .filter(boys => boys.sex === 'm')
      .filter(sons => mothers.includes(sons.mother))
    : people
      .filter(kid => mothers.includes(kid.mother));

  const avgAgeDiff = children
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born)
    .reduce((prev, curr) => prev + curr) / children.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
