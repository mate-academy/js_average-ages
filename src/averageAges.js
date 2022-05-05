/* eslint-disable max-len */
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
  const male = century ? people
    .filter(person => person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people
      .filter(person => person.sex === 'm');

  return (male.reduce((prev, curr) => (curr.died - curr.born) + prev, 0)) / male.length;
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
  const female = withChildren ? people.filter(woman => isMother(woman))
    : people.filter(person => person.sex === 'f');

  function isMother(woman) {
    return people.some(person => person.mother === woman.name);
  }

  return (female.reduce((prev, curr) => (curr.died - curr.born) + prev, 0)) / female.length;
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
  const children = onlyWithSon ? people
    .filter(child => people
      .some(person => child.sex === 'm' && child.mother === person.name))
    : people
      .filter(child => people
        .some(person => child.mother === person.name));
  const childrenWithMom = children.map(child => {
    const mom = people.find(person => person.name === child.mother);

    return {
      ...child,
      motherObj: mom,
    };
  });

  const averageAge = childrenWithMom.reduce((sum, child) => {
    const age = child.born - child.motherObj.born;

    return sum + age;
  }, 0);

  return Math.round((averageAge / childrenWithMom.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
