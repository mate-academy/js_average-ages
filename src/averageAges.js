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
  let filteredMen = people.filter(person => person.sex === 'm');

  if (century) {
    filteredMen = filteredMen.filter(
      person => Math.ceil(person.died / 100) === century
    );
  }

  const sum = filteredMen.reduce(
    (total, person) => total + (person.died - person.born), 0
  );

  return sum / filteredMen.length;
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
  let filteredWomen = people.filter(person => person.sex === 'f');

  if (withChildren) {
    filteredWomen = filteredWomen.filter(person =>
      people.some(child => person.name === child.mother)
    );
  }

  const sum = filteredWomen.reduce(
    (total, person) => total + (person.died - person.born), 0
  );

  return sum / filteredWomen.length;
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

  let countOfChildren = 0;

  const sum = filteredWomen.reduce(
    (total, mother) => {
      // looking for all the children of the mother
      let allChildren = people.filter(child => child.mother === mother.name);

      if (onlyWithSon) {
        allChildren = allChildren.filter(child => child.sex === 'm');
      }

      // calculate the sum of all age differences for each child
      return total + allChildren.reduce((totalOfMother, childOfMother) => {
        countOfChildren++;

        return totalOfMother
          + childOfMother.born
          - (people.find(person => person.name === childOfMother.mother).born);
      }, 0
      );
    }, 0
  );

  return sum / countOfChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
