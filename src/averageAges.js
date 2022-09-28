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
  const listOfPeople = people.filter(person => (
    century === undefined
      ? person.sex === 'm'
      : person.sex === 'm' && Math.ceil(person.died / 100) === century
  ));

  const ageDiff = ageDifference(listOfPeople);

  return calculateAverageAge(ageDiff);
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
  const listOfPeople = people.filter(person => (
    withChildren === undefined
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(some => some.mother === person.name)
  ));

  const ageDiff = ageDifference(listOfPeople);

  return calculateAverageAge(ageDiff);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `withSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} withSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, withSon) {
  const ageDiff = [];

  people.forEach((person, index, list) => {
    const motherIndex = list.findIndex(some => some.name === person.mother);

    if (motherIndex !== -1) {
      if ((withSon && person.sex === 'm') || (withSon === undefined)) {
        ageDiff.push(person.born - list[motherIndex].born);
      }
    }
  });

  return calculateAverageAge(ageDiff);
}

function calculateAverageAge(data) {
  const averageAge = data.reduce((accumulator, current) => (
    accumulator + current
  ), 0);

  return averageAge / data.length;
}

function ageDifference(list) {
  const ageDiff = [];

  list.forEach(person => {
    ageDiff.push(person.died - person.born);
  });

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
