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
 *
 * @return {number}
 * @param filteredList
 */

function getAverageAge(filteredList) {
  const sumAge = filteredList.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return sumAge / filteredList.length;
}

function calculateMenAverageAge(people, century) {
  const filteredMans = people.filter(century
    ? person => Math.ceil(person.died / 100) === century
      && person.sex === 'm'
    : person => person.sex === 'm'
  );

  return getAverageAge(filteredMans);
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
  const moms = people.map(person => person.mother);
  const filteredWomen = people.filter(withChildren
    ? person => moms.some(mom => mom === person.name) && person.sex === 'f'
    : person => person.sex === 'f');

  return getAverageAge(filteredWomen);
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
  const child = people.reduce((arr, person) => {
    arr.push(
      {
        ...person,
        mother: people.find(mother => mother.name === person.mother),
      },
    );

    return arr;
  }, []);

  const agesList = child
    .filter(onlyWithSon
      ? person => person.sex === 'm' && person.mother !== undefined
      : person => person.mother !== undefined)
    .map(person => person.born - person.mother.born);

  return agesList.reduce(
    (accumulator, age) => accumulator + age / agesList.length, 0
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
