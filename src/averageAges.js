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
  return getAvarage(
    people
      .filter(per => per.sex === 'm')
      .filter(man => !century || getCentury(man) === century)
      .map(e => e.died - e.born)
  );
}

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getAvarage(number) {
  const sum = number.reduce((a, b) => a + b);

  return sum / number.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  // write code here
  return getAvarage(
    people
      .filter(per => per.sex === 'f')
      .filter(w => !withChildren || getChildren(people, w).length > 0)
      .map(e => e.died - e.born)
  );
}

function getChildren(people, person) {
  return people
    .filter(c => c.mother === person.name || c.father === person.name);
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
  // write code here
  return getAvarage(
    people
      .filter(per => !onlyWithSon || per.sex === 'm')
      .map(child => [child, getMother(people, child)])
      .filter(([, mother]) => mother)
      .map(([child, mother]) => child.born - mother.born)
  );
}

function getMother(people, child) {
  return people.find(m => m.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
