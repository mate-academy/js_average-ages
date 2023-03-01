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
function calculateAverage(numbers, decimalPlaces) {
  const total = numbers.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0);
  const average = total / numbers.length;
  const roundedAverage = Number(average.toFixed(decimalPlaces));

  return roundedAverage;
}

function calculateAge(person) {
  return person.died - person.born;
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(man => Math.ceil(man.died / 100)
    === century && man.sex === 'm')
    : people.filter(man => man.sex === 'm');

  const newMen = men.map((item) => calculateAge(item));

  const result = calculateAverage(newMen, 2);

  return result;
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
  const women = people.filter(woman => woman.sex === 'f');
  const mothers = withChildren ? women.filter(woman =>
    people.some(person => person.mother === woman.name)) : women;

  const newWomen = mothers.map((item) => calculateAge(item));

  const result = calculateAverage(newWomen, 2);

  return result;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm') : people;

  const motherAgeDiffs = filteredPeople.reduce((acc, person) =>
    !people.find(p => p.name === person.mother) ? acc
      : (acc.push(person.born - people.find(p =>
        p.name === person.mother).born), acc), []);

  const result = calculateAverage(motherAgeDiffs, 2);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
