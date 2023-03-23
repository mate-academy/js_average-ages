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
  const resultPeople = people.filter(person =>
    person.sex === 'm' && (!century
      || Math.ceil(person.died / 100) === century));

  const arrayOfAges = resultPeople.map(person => {
    return person.died - person.born;
  });

  return arrayOfAges.reduce((acc, el) =>
    acc + el, 0) / arrayOfAges.length;
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
  const resultPeople = people.filter(person =>
    person.sex === 'f' && (withChildren ? people.some(human =>
      human.mother === person.name) : true));

  const arrayOfAges = resultPeople.map(person => person.died - person.born);

  return arrayOfAges.reduce((acc, el) => acc + el, 0) / arrayOfAges.length;
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
  const resultPeople = people.filter((person) => {
    const hasMother = people.some((mother) => mother.name === person.mother);

    return onlyWithSon ? hasMother && person.sex === 'm' : hasMother;
  });

  const arrayOfDiffAges = resultPeople.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return arrayOfDiffAges.reduce((acc, el) =>
    acc + el, 0) / arrayOfDiffAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
