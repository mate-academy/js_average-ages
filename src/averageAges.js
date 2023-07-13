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
  const filterMan = people.filter(el => el.sex === 'm');
  const filterManWithCentureArg
    = people.filter(el => Math.ceil(el.died / 100) === century
    && el.sex === 'm');

  const averageAgesForAllMan
    = filterMan.map(el => el.died - el.born)
      .reduce((acum, curVal) => acum + curVal, 0)
      / filterMan.length;

  const averageAgesWithCentureArg
    = filterManWithCentureArg.map(el => el.died - el.born)
      .reduce((acum, curVal) => acum + curVal, 0)
      / filterManWithCentureArg.length;

  return arguments.length === 2
    ? averageAgesWithCentureArg
    : averageAgesForAllMan;
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
  const filterWomanWithChild
    = people.filter(woman => woman.sex === 'f'
      && people.some(el => el.mother === woman.name));

  const filterWoman = people.filter(woman => woman.sex === 'f');

  const averageAgesForWomanWithChild
    = filterWomanWithChild.map(el => el.died - el.born)
      .reduce((acum, curVal) => acum + curVal, 0)
    / filterWomanWithChild.length;

  const averageAgesForWoman
  = filterWoman.map(el => el.died - el.born)
    .reduce((acum, curVal) => acum + curVal, 0)
  / filterWoman.length;

  return arguments.length === 2
    ? averageAgesForWomanWithChild
    : averageAgesForWoman;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  const filterAllChilds = people.filter(child =>
    people.some(mother => child.mother === mother.name
    ));
  const filterChildsOnlySon = filterAllChilds.filter(el => el.sex === 'm');

  const averageAgesChildAndMother
    = filterAllChilds.map(el =>
      el.born - people[people.findIndex(obj => obj.name === el.mother)].born);

  const averageAgesSonAndMother
    = filterChildsOnlySon.map(el =>
      el.born - people[people.findIndex(obj => obj.name === el.mother)].born);

  return arguments.length === 2
    ? averageAgesSonAndMother.reduce((acum, curVal) =>
      acum + curVal, 0) / filterChildsOnlySon.length
    : averageAgesChildAndMother.reduce((acum, curVal) =>
      acum + curVal, 0) / filterAllChilds.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
