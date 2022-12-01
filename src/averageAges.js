'use strict';

// #region calculateMenAverageAge
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
    ? people.filter(person => century === Math.ceil(person.died / 100)
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');
  const menAgesSum = getAgesSum(men);
  const menAverageAge = getAverageAge(menAgesSum, men.length);

  return menAverageAge;
};
// #endregion

// #region calculateWomenAverageAge
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
  const women = withChildren
    ? people.filter(mother =>
      people.find(child => mother.name === child.mother))
    : people.filter(person => person.sex === 'f');
  const womenAgesSum = getAgesSum(women);
  const womenAverageAge = getAverageAge(womenAgesSum, women.length);

  return womenAverageAge;
}
// #endregion

// #region calculateAverageAgeDiff
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
  // write code here
}
// #endregion

function getAgesSum(filtratedPeople) {
  return filtratedPeople.reduce(
    (sum, year) => (sum + year.died - year.born), 0
  );
};

function getAverageAge(sum, peopleAmount) {
  return Math.round(sum / peopleAmount * 100) / 100;
};

// WRITE GETSUM AND GETAVERAGE

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
