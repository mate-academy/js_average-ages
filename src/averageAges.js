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
  let men = getPeopleBySex(people, 'm');

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  return getAverageAgeOf(men);
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
  let women = getPeopleBySex(people, 'f');

  if (withChildren) { // O(N^2) :(
    women = women.filter(
      woman => people.some(person => person.mother === woman.name)
    );
  }

  return getAverageAgeOf(women);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at childbirth)
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
  const getMotherByName
    = (motherName) => people.find(person => person.name === motherName);

  const children = people.filter( // O(N^2) :(
    ({ mother, sex }) =>
      getMotherByName(mother) && (!onlyWithSon || sex === 'm')
  );

  const ageDiffList
    = children.map(child => child.born - getMotherByName(child.mother).born);

  return getAverage(ageDiffList);
}

function getAverage(numbers) {
  return numbers
    .reduce((agesSum, nextAge) => agesSum + nextAge, 0) / numbers.length;
}

function getAverageAgeOf(people) {
  return getAverage(people.map(person => getAge(person)));
}

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAge(person) {
  return person.died - person.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
