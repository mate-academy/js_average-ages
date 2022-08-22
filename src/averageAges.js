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
  const mens = people.filter(person => person.sex === 'm');

  const mensWithCentury = century

    ? mens.filter(men => Math.ceil((men.died / 100)) === century)

    : mens;

  if (mensWithCentury.length === 0) {
    return 0;
  }

  const sum = mensWithCentury.reduce((acc, person) => {
    return acc + person.died - person.born;
  }, 0) / mensWithCentury.length;

  return sum;
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
  const women = people.filter(person => person.sex === 'f');

  const filteredW = withChildren

    ? women.filter(woman => people.some(obj => woman.name === obj.mother))

    : women;

  if (filteredW.length === 0) {
    return 0;
  }

  const sum = filteredW.reduce((acc, person) => {
    return acc + person.died - person.born;
  }, 0) / filteredW.length;

  return sum;
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
  const kids = people.filter(child =>
    onlyWithSon
      ? child.sex === 'm' && people.some(mom => mom.name === child.mother)
      : people.some(mom => mom.name === child.mother));

  return kids.reduce((sum, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return sum + child.born - mother.born;
  }, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
