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
function calculateMenAverageAge(people, century = 0) {
  const men = (century)
    ? people.filter((man) => man.sex === 'm'
    && Math.ceil(man.died / 100) === century)
    : people.filter((man) => man.sex === 'm');

  return averageAge(men);
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter((woman) => woman.sex === 'f');
  const age = (withChildren)
    ? women.filter(woman => {
      return people.some(child => child.mother === woman.name);
    })
    : [...women];

  return averageAge(age);
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
  const motherArr = (onlyWithSon)
    ? people.filter((person) => {
      return people.find(mother => person.mother === mother.name
        && person.sex === 'm');
    })
    : people.filter((person) => {
      return people.find(mother => person.mother === mother.name);
    });

  return averageAge(motherArr, people);
}

// separate function for get average age
const averageAge = (arr, people = []) => {
  const result = (!people.length)
    ? arr.map(person => person.died - person.born)
      .reduce((prev, current) => prev + current, 0)
    : arr.reduce((prev, current) => {
      const child = people.find(mother => current.mother === mother.name);

      return prev + (current.born - child.born);
    }, 0);

  return result / arr.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
