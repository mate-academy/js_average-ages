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
  let males = people.filter(person => person.sex === 'm');

  males = century
    ? males.filter(person => Math.ceil(person.died / 100) === century)
    : males;

  const ageSum = males
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  return ageSum / males.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  let females = people.filter(person => person.sex === 'f');

  females = withChildren
    ? females.filter(person => people
      .map(child => child.mother)
      .filter(women => women).includes(person.name))
    : females;

  const ageSum = females
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  return ageSum / females.length;
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
  let haveMother = people.filter(child => child.mother
    && people.find(parent => parent.name === child.mother));

  haveMother = onlyWithSon
    ? haveMother.filter(child => child.sex === 'm')
    : haveMother;

  const ageDifferents = haveMother
    .map(person => person.born - people
      .find(parent => parent.name === person.mother).born);

  return ageDifferents
    .reduce((sum, ageDif) => sum + ageDif, 0) / ageDifferents.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
