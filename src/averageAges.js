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
  const filterMan = (!century)
    ? people.filter((human) => human.sex === 'm')
    : people.filter((human) =>
      Math.ceil(human.died / 100) === century && human.sex === 'm');

  const averAgeMan = filterMan.map(human => human.died - human.born);

  const manResult = averAgeMan.reduce((a, b) => a + b) / filterMan.length;

  return manResult;
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
  const allMoms = people.map(human => human.mother);
  const actualMoms = people.filter(human => allMoms.includes(human.name));

  const filterWoman = (!withChildren)
    ? people.filter((human) => human.sex === 'f')
    : actualMoms;

  const averAgeWoman = filterWoman.map(human => human.died - human.born);

  const womanResult = averAgeWoman.reduce((a, b) => a + b) / filterWoman.length;

  return womanResult;
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
  const allMoms = people.map(human => human.mother);
  const actualMom = people.filter(human => allMoms.includes(human.name));
  const actualMomNames = actualMom.map(human => human.name);

  const kidsHasMoms = (!onlyWithSon)
    ? people.filter(human => actualMomNames.includes(human.mother))
    : people.filter(human => actualMomNames.includes(human.mother)
        && human.sex === 'm');

  const momObj = {};

  actualMom.map(function(human) {
    momObj[human.name] = human.born;
  });

  const averAgeResult = kidsHasMoms.map(human =>
    human.born - momObj[human.mother]);

  return averAgeResult.reduce((a, b) => a + b) / averAgeResult.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
