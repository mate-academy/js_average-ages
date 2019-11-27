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
      .filter(person => person.sex === 'm')
      .filter(man => !century || getCentury(man) === century)
      .map(person => person.died - person.born)
  );
}

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getAvarage(numbers) {
  const sum = numbers.reduce((a, b) => a + b);

  return sum / numbers.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  return getAvarage(
    people
      .filter(person => person.sex === 'f')
      .filter(woman => !withChildren || getChildren(people, woman).length > 0)
      .map(person => person.died - person.born)
  );
}

function getChildren(people, person) {
  return people.filter(child => child.mother === person.name
    || child.father === person.name);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  return getAvarage(
    people
      .filter(person => !onlyWithSon || person.sex === 'm')
      .map(child => [child, getMother(people, child)])
      .filter(([, mother]) => mother)
      .map(([child, mother]) => child.born - mother.born)
  );
}

function getMother(people, child) {
  return people.find(mother => mother.name === child.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
