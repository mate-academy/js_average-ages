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
  let result = 0;

  const male = people.filter(person => person.sex === 'm');

  if (century) {
    const specifiedMale = male.filter(person => Math.ceil(person.died / 100) === century);

    result = specifiedMale.reduce((prev, curr) => (curr.died - curr.born) + prev, 0);

    return result / specifiedMale.length;
  }

  result = male.reduce((prev, curr) => (curr.died - curr.born) + prev, 0);

  return Math.round((result / male.length) * 100) / 100;
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
  let result = 0;
  const female = people.filter(person => person.sex === 'f');

  function isMother(woman) {
    return people.some(person => person.mother === woman.name);
  }

  const mothers = female.filter(woman => isMother(woman));

  if (withChildren) {
    result = mothers.reduce((prev, curr) => (curr.died - curr.born) + prev, 0);

    return Math.round((result / mothers.length) * 100) / 100;
  }

  result = female.reduce((prev, curr) => (curr.died - curr.born) + prev, 0);

  return Math.round((result / female.length) * 100) / 100;
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
  const children = people.filter(child => people.some(person => child.mother === person.name));
  const sons = people.filter(boy => people.some(person => boy.sex === 'm' && boy.mother === person.name));

  const childrenWithMom = onlyWithSon ? sons.map(child => {
    const mom = people.find(person => person.name === child.mother);

    return {
      ...child,
      motherObj: mom,
    };
  })
    : children.map(child => {
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
