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
  const summedAge = people
    .filter(person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
    )
    .map(a => a.died - a.born);

  return averageValue(summedAge);
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
  const femaleAge = people
    .filter(({ name, sex }) => sex === 'f' && (
      !withChildren || people.some(person => name === person.mother)
    ))
    .map(person => person.died - person.born);

  return averageValue(femaleAge);
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
  const motherAndSon = people.filter(({ mother, sex }) =>
    people.some(mom => mom.name === mother && (
      !onlyWithSon || sex === 'm'
    )));

  const averageAgeDiff = motherAndSon.map(({ born, mother }) => {
    const kidMom = people.find(mom => mom.name === mother);

    return born - kidMom.born;
  });

  return averageValue(averageAgeDiff);
}

const averageValue = (numbers) => {
  const numbersSum = numbers.reduce((sum, num) => sum + num);

  return numbersSum / numbers.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
