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
  const array = people
    .filter(person => {
      if (
        century && Math.ceil(person.died / 100) === century
        && person.sex === 'm') {
        return person;
      }

      if (century === undefined && person.sex === 'm') {
        return person;
      }
    })
    .map(person => person.died - person.born);

  const avarage = array.reduce((prev, curr) => prev + curr) / array.length;

  return avarage;
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
  const array = people.filter(person => person.sex === 'f');

  const avarage = (women) => {
    return women
      .map(person => person.died - person.born)
      .reduce((prev, curr) => prev + curr) / women.length;
  };

  let parent;

  if (withChildren) {
    parent = array.filter(female => {
      const mother = people.find(child =>
        female.name === child.mother
      );

      if (mother) {
        return mother;
      }
    });

    return avarage(parent);
  } else {
    return avarage(array);
  }
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
  // write code here
  const diffArray = [];

  const search = (arr) => {
    arr.map(child => {
      const parents = people.find(parent =>
        parent.name === child.mother
      );

      if (parents) {
        diffArray.push(child.born - parents.born);
      }
    });
  };

  if (onlyWithSon) {
    const male = people.filter(person => person.sex === 'm');

    search(male);
  } else {
    search(people);
  }

  const avarage = diffArray.reduce((prev, curr) => prev + curr)
  / diffArray.length;

  return avarage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
