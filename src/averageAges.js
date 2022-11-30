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
function calculateAverageAge(humans) {
  const sumOfAges
    = humans.reduce((sum, person) => sum + (person.died - person.born), 0);

  return sumOfAges / humans.length;
};

function calculateMenAverageAge(people, century) {
  const men = !century
    ? people.filter(man => man.sex === 'm')
    : people.filter(man => man.sex === 'm'
      && century === Math.ceil(man.died / 100));

  return calculateAverageAge(men);
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
  const women = people.filter(person =>
    withChildren
      ? people.some(child => person.name === child.mother)
      : person.sex === 'f'
  );

  return calculateAverageAge(women);
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
  const children = people.filter(child => onlyWithSon
    ? people.find(person => child.mother === person.name && child.sex === 'm')
    : people.find(person => child.mother === person.name));

  const sumOfAges = children
    .map(child =>
      (child.born - people.find(mother => mother.name === child.mother).born))
    .reduce((sum, age) => sum + age, 0);

  return sumOfAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
