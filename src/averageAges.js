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
const maleSex = 'm';
const femaleSex = 'f';
const centuryValue = 100;

function calculateAverage(arrayPeople) {
  return arrayPeople.reduce((sumAges, person) => {
    const age = person.died - person.born;

    return sumAges + age;
  }, 0) / arrayPeople.length;
}

function calculateMenAverageAge(people, century) {
  const diedMenFilter = people
    .filter(person => {
      const diedCentury = Math.ceil(person.died / centuryValue);

      const isCenturyDeclared = century
        ? person.sex === maleSex && century === diedCentury
        : person.sex === maleSex;

      return isCenturyDeclared;
    });

  return calculateAverage(diedMenFilter);
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
  const womenFilter = people
    .filter(person => {
      const haveMother = people.some(woman => person.name === woman.mother);

      const isWithChildrenDeclared = withChildren
        ? person.sex === femaleSex && withChildren === haveMother
        : person.sex === femaleSex;

      return isWithChildrenDeclared;
    });

  return calculateAverage(womenFilter);
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
  const haveMother = people.filter(person => {
    return onlyWithSon
      ? people.find(woman => person.sex === maleSex
      && person.mother === woman.name)
      : people.find(woman => person.mother === woman.name);
  });

  return haveMother.reduce((acc, child) => {
    const womanAge = people.find(woman => {
      return child.mother === woman.name;
    }).born;

    return acc + child.born - womanAge;
  }, 0) / haveMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
