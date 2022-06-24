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
  let men = people.filter(person => person.sex === 'm');

  if (century !== 0) {
    men = men.filter((person) => Math.ceil(person.died / 100) === century);
  }

  const years = men.map((person) => person.died - person.born);

  return years.reduce((a, b) => a + b) / years.length;
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
  let women = people.filter((person) => person.sex === 'f');
  const mothers = women
    .filter(person => people.some(prsn => prsn.mother === person.name));

  if (withChildren) {
    women = mothers;
  }

  const years = women.map(person => person.died - person.born);

  return years.reduce((a, b) => a + b) / years.length;
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
function getYears(childrenList, parentsList) {
  const years = childrenList
    .map(
      child => (child.born - parentsList.find(
        mother => mother.name === child.mother).born));

  return years.reduce((a, b) => a + b) / years.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people
    .filter(
      person => people.some(
        child => child.name === person.mother
      )
    );
  const mothers = people
    .filter(
      person => children.some(
        mother => mother.mother === person.name
      )
    );

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  return getYears(children, mothers);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
