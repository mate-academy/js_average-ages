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
  const men = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm'
  );

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
  const women = people.filter((person) => {
    const isFemale = person.sex === 'f';
    const isMother = people.some((child) => child.mother === person.name);

    if (withChildren) {
      return isFemale && isMother;
    }

    return isFemale;
  });

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
  let children = people
    .filter(child => child.mother !== null)
    .map(child => {
      const isMother = people.find(person => person.name === child.mother);

      if (isMother) {
        return {
          ...child,
          motherBorn: isMother.born,
        };
      }
    })
    .filter(child => child !== undefined);

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const childrenNumber = children.length;
  const ages = children
    .map(child => child.born - child.motherBorn);

  const avgAge = ages.reduce((prev, next) => prev + next, 0) / childrenNumber;

  return Math.round(avgAge * 100) / 100;
}

function calculateAverageAge(array) {
  const avgAge = array
    .reduce((acc, person) => acc
      + (person.died - person.born), 0)
      / array.length;

  return Math.round(avgAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
