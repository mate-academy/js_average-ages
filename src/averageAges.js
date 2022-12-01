'use strict';

/**
 * Helper function to get the average age of an array of persons
 * @param {object[]} people
 * @return {number}
 */
const calculateAverageAge = (ppl) => {
  const len = ppl.length || 1;

  return ppl.reduce((a, b) => a + b.died - b.born, 0) / len;
};

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
      && (!century
        || Math.ceil(p.died / 100) === century
      )
    );

  return calculateAverageAge(selectedPeople);
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
      && (!withChildren
        || (people.findIndex(person => person.mother === p.name) !== -1)
      )
    );

  return calculateAverageAge(selectedPeople);
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
    ? people.filter(p => p.sex === 'm')
    : people;

  let count = 0;
  let mother;

  const totalDifference = filteredPeople
    .reduce((accumulation, currentPerson) => {
      mother = people.find(person => person.name === currentPerson.mother);

      if (mother) { // mother was found
        count++;

        return accumulation + currentPerson.born - mother.born;
      } else {
        return accumulation;
      }
    }, 0);

  return totalDifference / (count || 1);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
