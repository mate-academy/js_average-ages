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

function averageReturn(arrayOfPeople) {
  const sum = arrayOfPeople.reduce(
    (total, person) => total + (person.died - person.born), 0
  );

  return sum / arrayOfPeople.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return averageReturn(men);
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
  const filteredWomen = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => person.name === child.mother)
    : person.sex === 'f'
  );

  return averageReturn(filteredWomen);
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
  const filteredWomen = people.filter(person =>
    person.sex === 'f' && people.some(child => person.name === child.mother)
  );

  let countOfOperations = 0;

  const sum = filteredWomen.reduce(
    (total, mother) => {
      // looking for all the children of the mother
      const children = people.filter(child => onlyWithSon
        ? child.mother === mother.name && child.sex === 'm'
        : child.mother === mother.name
      );

      // calculate sum of age difference between mother and each of her child
      return total + children.reduce((totalOfMother, childOfMother) => {
        countOfOperations++;

        return totalOfMother
          + childOfMother.born
          - (people.find(person => person.name === childOfMother.mother).born);
      }, 0
      );
    }, 0
  );

  return sum / countOfOperations;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
