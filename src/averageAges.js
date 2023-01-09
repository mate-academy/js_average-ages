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

function getAverageAge(select) {
  const averageAge = select.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  ) / select.length;

  return Math.round(averageAge * 100) / 100;
}

function calculateMenAverageAge(people, century) {
  const getMen = century !== undefined
    ? people.filter(
      person => {
        return person.sex === 'm' && Math.ceil(person.died / 100) === century;
      }
    )
    : people.filter(person => person.sex === 'm');

  return getAverageAge(getMen);
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
  const getWomen = withChildren === undefined
    ? people.filter(person => person.sex === 'f')
    : people.filter(
      person => person.sex === 'f'
      && people.some(child => child.mother === person.name)
    );

  return getAverageAge(getWomen);
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
  const getChildren = onlyWithSon === undefined
    ? people.filter(person =>
      people.find(mother => mother.name === person.mother)
    )
    : people.filter(person =>
      person.sex === 'm'
      && people.find(mother => mother.name === person.mother)
    );

  const getDifferenceAge = getChildren.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born
  );

  const averageAge = (getDifferenceAge.reduce(
    (sum, age) => sum + age, 0)
  ) / getDifferenceAge.length;

  return Math.round(averageAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
