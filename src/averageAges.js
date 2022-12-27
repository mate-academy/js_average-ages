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
function calculateMenAverageAge(people, century = null) {
  const men = people.filter(man => {
    return man.sex === 'm'
    && (century === null
      ? true
      : Math.ceil(man.died / 100) === century);
  });

  const ages = men.map(getAge());

  return ages.reduce((x, y) => x + y, 0) / ages.length;
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
  const women = people.filter(woman => {
    return woman.sex === 'f'
    && (withChildren === true
      ? people.some(child => child.mother === woman.name)
      : true);
  });

  const ages = women.map(getAge());

  return ages.reduce((x, y) => x + y, 0) / ages.length;
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
  const children = people.filter(child => {
    return people.some(mother => child.mother === mother.name)
      && (onlyWithSon
        ? child.sex === 'm'
        : true);
  });

  const ageDifferences = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return ageDifferences.reduce((x, y) => x + y, 0) / ageDifferences.length;
}

function getAge() {
  return person => person.died - person.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
