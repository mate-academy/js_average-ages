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
  let men = people.filter((person) => person.sex === 'm');

  if (century) {
    men = men.filter(person => century === Math.ceil(person.died / 100));
  }

  const yearMen = men.map(person => person.died - person.born);

  const averageAgeOfMen = yearMen.reduce((a, b) => (a + b)) / men.length;

  return averageAgeOfMen;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = undefined) {
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter((woman) =>
      people.find(person => person.mother === woman.name)
    );
  }

  const yearW = women.map(person => person.died - person.born);

  const averageAgeOfWomen = yearW.reduce((a, b) => (a + b)) / yearW.length;

  return averageAgeOfWomen;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = undefined) {
  const arrayOfDif = [];

  people.forEach((person) => {
    if (person.mother === null) {
      return;
    }

    people.forEach((mother) => {
      if (mother.name === person.mother) {
        if (onlyWithSon !== undefined) {
          if (person.sex === 'm') {
            arrayOfDif.push((person.born - mother.born));
          }
        } else {
          arrayOfDif.push((person.born - mother.born));
        }
      }
    });
  });

  const averAge = arrayOfDif.reduce((a, b) => a + b) / arrayOfDif.length;

  return averAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
