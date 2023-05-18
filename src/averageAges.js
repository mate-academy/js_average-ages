'use strict';

const getAverage = (people, keyA, keyB) => {
  return people.reduce((sum, person) => (
    sum + person[keyA] - person[keyB]
  ), 0)
  / people.length;
};

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
  const targetSelector = person => (
    person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100))
  );

  const men = people.filter(targetSelector);

  return getAverage(men, 'died', 'born');
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
  const isMother = name => (
    people.some(person => person.mother === name)
  );

  const targetSelector = withChildren
    ? person => isMother(person.name)
    : person => person.sex === 'f';

  const women = people.filter(targetSelector);

  return getAverage(women, 'died', 'born');
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
  const children = people.filter(child => (
    people.some(person => person.name === child.mother)
    && (!onlyWithSon || child.sex === 'm')
  ));

  const childMotherPairs = children.map(child => {
    child.motherBorn = people
      .find(person => person.name === child.mother)
      .born;

    return child;
  });

  return getAverage(childMotherPairs, 'born', 'motherBorn');
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
