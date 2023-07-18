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
  const men = people.filter((person) => {
    const MAN = 'm';
    const CENTURY = 100;
    const isMan = (human) => human.sex === MAN;
    const getCentury = (human) => Math.ceil(human.died / CENTURY);

    return century
      ? isMan(person) && century === getCentury(person)
      : isMan(person);
  });

  const sumAges = men.reduce((prev, person) => {
    return (prev + (person.died - person.born));
  }, 0);

  const avarageAges = sumAges / men.length;

  return avarageAges;
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
  const women = people.filter((person) => {
    const WOMAN = 'f';
    const isWoman = (human) => human.sex === WOMAN;
    const hasChildren = people.find(child => child.mother === person.name);

    return withChildren
      ? isWoman(person) && hasChildren
      : isWoman(person);
  });

  const sumAges = women.reduce((prev, person) => {
    return (prev + (person.died - person.born));
  }, 0);

  const avarageAges = sumAges / women.length;

  return avarageAges;
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
  const mothers = people.filter((person) => {
    const MAN = 'm';
    const isBoy = (human) => human.sex === MAN;
    const mother = people.find((woman) => woman.name === person.mother);

    return onlyWithSon
      ? isBoy(person)
      && mother
      : mother;
  });

  const difference = mothers.reduce((prev, person) => prev
  + (person.born - people.find((woman) =>
    woman.name === person.mother).born), 0);

  const averageAges = difference / mothers.length;

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
