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

function getAverageAge(humans) {
  const agesMap = humans.map(person => person.died - person.born);
  const averageAges = agesMap.reduce(
    (prev, next) => prev + next,
    0) / agesMap.length;

  return averageAges;
}

function calculateMenAverageAge(people, century) {
  const toFilterMan = (person) => {
    const isMan = person.sex === 'm';
    const isCentury = Math.ceil(person.died / 100) === century;

    return century ? isMan && isCentury : isMan;
  };

  const filteredMan = people.filter(person => toFilterMan(person));

  return getAverageAge(filteredMan);
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
  const toFilterWomen = (person) => {
    const isWoman = person.sex === 'f';

    const isWithChildren = people.some(
      human => person.name === human.mother
    );

    return withChildren ? isWoman && isWithChildren : isWoman;
  };

  const filteredWomen = people.filter(person => toFilterWomen(person));

  return getAverageAge(filteredWomen);
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
  const children = onlyWithSon
    ? people.filter(person =>
      person.sex === 'm' && people.some(woman =>
        woman.name === person.mother))
    : people.filter(person =>
      people.some(woman => woman.name === person.mother));

  const averageDiff = children.reduce((sum, person) => {
    const mother = people.find(woman => woman.name === person.mother);

    return sum + (person.born - mother.born);
  }, 0) / children.length;

  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
