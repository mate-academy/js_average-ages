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
  const selectedPeople = people
    .filter(p => p.sex === 'm'
      && (century ? Math.ceil(p.died / 100) === century : true));
  const count = selectedPeople.length;

  return selectedPeople
    .reduce((a, b) => a + b.died - b.born, 0) / (count > 0 ? count : 1);
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
  const selectedPeople = people
    .filter(p => p.sex === 'f'
      && (withChildren
        ? (people.findIndex(person => person.mother === p.name) !== -1)
        : true));
  const count = selectedPeople.length;

  return selectedPeople
    .reduce((a, b) => a + b.died - b.born, 0) / (count > 0 ? count : 1);
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
  const selectedPeople = people
    .filter(p => onlyWithSon ? p.sex === 'm' : true);
  let count = 0;
  let mother;

  const total = selectedPeople.reduce((a, b) => {
    mother = people.find(p => p.name === b.mother);

    if (mother) { // mother was found
      count++;

      return a + b.born - mother.born;
    } else {
      return a;
    }
  }, 0);

  return total / (count > 0 ? count : 1);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
