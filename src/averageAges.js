'use strict';

const MALE = 'm';
const FEMALE = 'f';
const CENTURY = 100;

function getAverengeAge(people) {
  const sumAge = people.reduce((acc, { died, born }) => acc + (died - born), 0);

  return sumAge / people.length;
}
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
  const filteredMen = people.filter(({ sex, died }) => century
    ? Math.ceil(died / CENTURY) === century && sex === MALE
    : sex === MALE);

  return getAverengeAge(filteredMen);
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
  const filteredWomen = people.filter(person => withChildren
    ? person.sex === FEMALE
      && people.some(({ mother }) => mother === person.name)
    : person.sex === FEMALE);

  return getAverengeAge(filteredWomen);
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
  const peopleWhitMother = people.filter(person =>
    people.find(women => person.mother === women.name
      && (onlyWithSon ? person.sex === MALE : true)));

  const mothers = people.filter(mother =>
    (peopleWhitMother.some((child) => mother.name === child.mother))
  );

  const sumOfDifference = peopleWhitMother
    .reduce((acc, child) => {
      const motherOfPerson = mothers.find(({ name }) => name === child.mother);
      const diference = child.born - motherOfPerson.born;

      return acc + diference;
    }, 0);

  return sumOfDifference / peopleWhitMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
