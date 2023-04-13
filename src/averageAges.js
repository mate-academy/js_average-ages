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
  const men = century
    ? people.filter((e) => e.sex === 'm' && Math.ceil(e.died / 100) === century)
    : people.filter((e) => e.sex === 'm');

  const sumOfAges = men.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  return sumOfAges / men.length;
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
  const reducer = (arrs) => arrs.reduce((elem, total) => elem + total, 0);

  let arr;

  if (withChildren) {
    arr = people.filter((e) => e.sex === 'f' && people
      .find(s => s.mother === e.name))
      .map((e) => e.died - e.born);
  } else {
    arr = people.filter((e) => e.sex === 'f')
      .map((e) => e.died - e.born);
  }

  return reducer(arr) / arr.length;
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
  const mothers = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const sons = onlyWithSon
    ? people
      .filter(child => child.sex === 'm' && mothers
        .find(mother => mother.name === child.mother))
    : people
      .filter(child => mothers
        .find(mother => mother.name === child.mother));

  return sons.reduce((total, boy) => {
    const boyMother = mothers.find(mother => mother.name === boy.mother);

    return total + (boy.born - boyMother.born);
  }, 0) / sons.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
