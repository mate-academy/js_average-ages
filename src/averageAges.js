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
function isWoman(person) {
  return person.sex === 'f';
}

function isMan(person) {
  return person.sex === 'm';
}

const CENTURY = 100;

function calculateMenAverageAge(people, century) {
  const filteredMen = people
    .filter(person => isMan(person)
    && (century === undefined || century === Math.ceil(person.died / CENTURY)));

  const averageAgesMen = filteredMen
    .map(men => (men.died - men.born))
    .reduce((prev, age) => prev + age, 0) / filteredMen.length;

  return averageAgesMen * 100 / 100;
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
  const filteredWomen = people
    .filter(person => isWoman(person)
    && (withChildren === undefined
    || (withChildren && people.some(child => child.mother === person.name))));

  const averageAgesWomen = filteredWomen.reduce((prev, age) =>
    prev + (age.died - age.born), 0) / filteredWomen.length;

  return averageAgesWomen;
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
  const differenceAge = people.reduce((total, person) => {
    const findedMother = people.find(p => p.name === person.mother);
    const filteredDifference = findedMother
      && (!onlyWithSon || isMan(person));

    if (filteredDifference) {
      const difference = Math.abs(findedMother.born - person.born);

      total.push(difference);
    }

    return total;
  }, []);

  const avarageAgeDifference = differenceAge
    .reduce((sum, diff) => sum + diff, 0) / differenceAge.length;

  return avarageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
