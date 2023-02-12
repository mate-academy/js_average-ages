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

/* Global function */
const calcAverage = function(peopleData) {
  const BornYear = peopleData
    .reduce((bornSum, { born }) => bornSum + born, 0);
  const DiedYear = peopleData
    .reduce((diedSum, { died }) => diedSum + died, 0);

  return ((DiedYear - BornYear) / peopleData.length);
};

function calculateMenAverageAge(people, century) {
  const men = people
    .filter(({ sex, died }) => sex === 'm'
    && (!century || Math.ceil(died / 100) === century));

  return calcAverage(men);

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(el => el.sex === 'f');

  /* This function is looking if the .name of the element
  has been mentioned as a mother in other elements. */

  const isMother = function(momName, array) {
    return array.find(el => el.mother === momName);
  };

  const mothers = people.filter(el => isMother(el.name, people));

  return (withChildren ? calcAverage(mothers) : calcAverage(women));
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
  const findRelative = function(momName, array) {
    return array.find(el => el.name === momName);
  };

  /* This function is looking for known .mothers in elements
  and if they exists as a names in other elements */

  const findRelatives = people.reduce((acc, el) => {
    const mother = findRelative(el.mother, people);

    if (mother) {
      return [...acc, {
        ...el, motherBirth: mother.born,
      }];
    }

    return acc;
  }, []);

  const findRelativesSon = findRelatives.filter(el => el.sex === 'm');

  const calcAverageAge = function(peopleArray) {
    const children = peopleArray
      .reduce((bornSum, { born }) => bornSum + born, 0);
    const moms = peopleArray
      .reduce((bornSum, { motherBirth }) => bornSum + motherBirth, 0);

    const result = (children - moms) / peopleArray.length;

    return result;
  };

  return (onlyWithSon
    ? calcAverageAge(findRelativesSon) : calcAverageAge(findRelatives));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
