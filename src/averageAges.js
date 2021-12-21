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
  const choiceMan = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'),
  );

  return choiceMan.reduce((x = 0, { born, died }) =>
    x + (died - born), 0) / choiceMan.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const choiceMother = (all, mother) =>
    all.some(child => child.mother === mother.name);

  const motherSort = people.filter(person => (
    withChildren
      ? person.sex === 'f' && choiceMother(people, person)
      : person.sex === 'f'),
  );

  return motherSort.reduce((x = 0, { born, died }) =>
    x + (died - born), 0) / motherSort.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = (all, child) =>
    all.some(mother => child.mother === mother.name);

  const findMother = (all, mother) =>
    all.find(person => person.name === mother);

  const peopleSort = people.filter(person => (
    onlyWithSon
      ? person.sex === 'm' && mothers(people, person)
      : mothers(people, person)),
  );

  return peopleSort.reduce((x = 0, person) =>
    x + (person.born - findMother(people, person.mother).born), 0)
    / peopleSort.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
