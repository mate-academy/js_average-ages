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
  const menArray = people.filter(
    person =>
      person.sex === 'm'
      && (Math.ceil(person.died / 100) === century || century === undefined),
  );

  const allMenAge = menArray.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return Math.round(allMenAge / menArray.length * 100) / 100;
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
  const womenArray = people.filter(person => person.sex === 'f');

  const withMoms = womenArray.filter(woman =>
    people.find(person => person.mother === woman.name)
    || withChildren === undefined);

  const allWomenAge = withMoms.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return Math.round(allWomenAge / withMoms.length * 100) / 100;
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
  const womenArray = people.filter(woman => woman.sex === 'f');

  const momsArray = womenArray.filter(mom =>
    people.find(person => person.mother === mom.name)
  );

  const arrayChilds = people.filter(child =>
    momsArray.find(mother => mother.name === child.mother) && (child.sex === 'm'
    || onlyWithSon === undefined));

  const agesDifference = arrayChilds.map(child =>
    child.born - momsArray.find(mother => child.mother === mother.name).born);

  const sumOfAge = agesDifference.reduce((sum, age) => sum + age, 0);

  return Math.round(sumOfAge / agesDifference.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
