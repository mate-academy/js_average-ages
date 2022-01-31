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
  const men = people.filter(person => (
    person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true
    )
  ));

  const personAges = men.map(man => man.died - man.born);
  const totalAges = personAges.reduce((prevValue, currentValue) => (
    prevValue + currentValue
  ));

  return Math.round(totalAges / personAges.length * 100) / 100;
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
  // write code here
  const women = people.filter(person => (
    person.sex === 'f'
    && (withChildren
      ? people.some(child => child.mother === person.name)
      : true
    )
  ));

  const personAges = women.map(woman => woman.died - woman.born);
  const totalAges = personAges.reduce((prevValue, currentValue) => (
    prevValue + currentValue
  ));

  return Math.round(totalAges / personAges.length * 100) / 100;
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
  // write code here
  const children = people.filter(person => (
    people.some(mother => mother.name === person.mother) && (
      (onlyWithSon)
        ? person.sex === 'm'
        : true
    )
  ));

  const personAges = children.map(child => (
    child.born - people.find(mother => mother.name === child.mother).born
  ));

  const totalAges = personAges.reduce((prevValue, currentValue) => (
    prevValue + currentValue
  ));

  return Math.round(totalAges / personAges.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
