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
  const menLeng = (people
    .filter((i) => arguments.length < 2
      ? i.sex === 'm'
      : i.sex === 'm' && Math.ceil(i.died / 100) === century))
    .length;

  const age = +(people
    .filter((i) => arguments.length < 2
      ? i.sex === 'm'
      : i.sex === 'm' && Math.ceil(i.died / 100) === century)
    .map((index) => index.died - index.born)
    .reduce((sum, i) => sum + i, 0)
    / menLeng)
    .toFixed(2);

  return age;
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
  let totalAge = 0;
  let numWomen = 0;

  for (const person of people) {
    if (person.sex === 'f') {
      if (!withChildren || people.some(p => p.mother === person.name)) {
        totalAge += person.died - person.born;
        numWomen++;
      }
    }
  }

  return totalAge / numWomen;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const filteredPeople = onlyWithSon
    ? people
      .filter(person => person.sex === 'm' && people
        .find(mother => mother.name === person.mother))
    : people
      .filter(person => people
        .find(mother => mother.name === person.mother));

  const diffArr = filteredPeople.map(person =>
    person.born - people
      .find(mother => mother.name === person.mother).born);

  function getAverageAge(input) {
    return input.reduce((sum, age) => sum + age, 0) / input.length;
  }

  return getAverageAge(diffArr);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
