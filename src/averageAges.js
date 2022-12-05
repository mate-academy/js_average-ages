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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = century
    ? people.filter(person => isMale(person) && bornInCentury(person, century))
    : people.filter(person => isMale(person));

  const ages = men.map(man => calculateAge(man));

  return calculateAverageAge(ages);
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
  const women = people.filter(person => !isMale(person));

  const ages = withChildren
    ? women
      .filter(mother => people.some(person => mother.name === person.mother))
      .map(woman => calculateAge(woman))
    : women.map(woman => calculateAge(woman));

  return calculateAverageAge(ages);
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
  const children = people.filter(child => (
    onlyWithSon
      ? people.find(mother => mother.name === child.mother && isMale(child))

      : people.find(mother => mother.name === child.mother)
  ));

  const mothers = people.filter(mother => (
    children.some(child => child.mother === mother.name)
  ));

  const difference = children.map(child => {
    const mother = mothers.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return calculateAverageAge(difference);
}

function isMale(person) {
  return person.sex === 'm';
}

function bornInCentury(person, century) {
  return Math.ceil(person.died / 100) === century;
}

function calculateAge(person) {
  return person.died - person.born;
}

function calculateAverageAge(ages) {
  return ages.reduce((total, current) => total + current) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
