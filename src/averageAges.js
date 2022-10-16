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
  let menList = people.filter((person) => person.sex === 'm');

  if (century) {
    menList = menList.filter((person) =>
      Math.ceil(person.died / 100) === century
    );
  }

  menList = menList.map((person) => person.died - person.born);
  menList = menList.reduce((sum, person) => sum + person, 0) / menList.length;

  return menList;
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
  let womenList = people.filter((person) => person.sex === 'f');

  if (withChildren) {
    womenList = womenList.filter((person) => {
      return people.some((name) => name.mother === person.name);
    });
  }

  womenList = womenList.map((person) => person.died - person.born);

  womenList = womenList.reduce((sum, person) =>
    sum + person, 0) / womenList.length;

  return womenList;
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
  let peopleWithMom = people.filter((person) => person.mother);
  let count = 0;

  if (onlyWithSon) {
    peopleWithMom = peopleWithMom.filter((person) => person.sex === 'm');
  }

  const totalDifference = peopleWithMom.reduce((sum, person) => {
    const mama = people.find(momName => momName.name === person.mother);

    if (mama) {
      count++;

      return person.born - mama.born + sum;
    }

    return sum;
  }, 0);

  return totalDifference / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
