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
const MAN_SEX = 'm';
const CENTURY = 100;
const isMan = person => person.sex === MAN_SEX;

function calculateMenAverageAge(people, century) {
  const peopleOfNeededCentury = century
    ? people.filter(person => Math.ceil(person.died / CENTURY) === century)
    : people;

  const men = peopleOfNeededCentury.filter(isMan);

  const sumOfAges = men.reduce((sum, man) => sum + (man.died - man.born), 0);
  const averageAge = sumOfAges / men.length;

  return averageAge;
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
  const peopleWeNeed = withChildren
    ? people.filter(person => people.some(p => p.mother === person.name))
    : people;

  const women = peopleWeNeed.filter(person => person.sex === 'f');

  const sumOfAges = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);
  const averageAge = sumOfAges / women.length;

  return averageAge;
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
  const peopleWithMothers = people.filter(currentChild =>
    onlyWithSon
      ? people.some((person) => (currentChild.mother === person.name)
          && isMan(currentChild))
      : people.some((person) => (currentChild.mother === person.name)));

  const sumOfAgeDiffs = peopleWithMothers.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);
    const ageDiff = child.born - mother.born;

    return sum + ageDiff;
  }, 0);

  return sumOfAgeDiffs / peopleWithMothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
