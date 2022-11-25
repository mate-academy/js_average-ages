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
  const menOnly = people.filter(person =>
    !century
      ? person.sex === 'm'
      : person.sex === 'm' && century === Math.ceil(person.died / 100)
  );

  return calculateAverageAge(menOnly);
}

function calculateAverageAge(people) {
  const age = people.map(person => person.died - person.born);
  const sumOfAges = age.reduce((a, b) => a + b);
  const averageAge = sumOfAges / people.length;

  return averageAge;
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
  const mothers = people.map(person => person.mother);

  const womenOnly = people.filter(person =>
    !withChildren
      ? person.sex === 'f'
      : mothers.includes(person.name)
  );

  return calculateAverageAge(womenOnly);
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
  let children = people.filter(person =>
    people.find(mother => mother.name === person.mother)
  );

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const diff = children.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born
  );

  const averageDiff = diff.reduce((a, b) => a + b) / diff.length;

  return averageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
