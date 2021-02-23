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
  const isMan = (person) => person.sex === 'm';
  const isManBornThisCentury = (person) => person.sex === 'm'
    && Math.ceil(person.died / 100) === century;

  const filteredMen = people.filter(century ? isManBornThisCentury : isMan);

  const averageAgeMen = filteredMen
    .reduce((sumOfAge, person) =>
      sumOfAge + (person.died - person.born), 0);

  return (averageAgeMen / filteredMen.length);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  const isWoman = (person) => person.sex === 'f';
  const isWomanWithChildren = (person) => person.sex === 'f'
    && people.some(human => human.mother === person.name);

  const filteredWomen = people.filter(
    withChildren ? isWomanWithChildren : isWoman
  );

  const womenAverageAge = filteredWomen.reduce((sumOfAge, person) =>
    sumOfAge + (person.died - person.born), 0);

  return (womenAverageAge / filteredWomen.length);
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
  const hasChildren = (person) =>
    people.some(human => human.name === person.mother);
  const hasSons = (person) => person.sex === 'm'
    && people.some(human => human.name === person.mother);

  const filteredChildren = people.filter(
    onlyWithSon ? hasSons : hasChildren
  );

  const womenAverageAgeDiff = filteredChildren.reduce((sumOgAgeDiff, child) => {
    const isMotherOfChild = people.find(human => human.name === child.mother);

    return sumOgAgeDiff + (child.born - isMotherOfChild.born);
  }, 0);

  return (womenAverageAgeDiff / filteredChildren.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
