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
  const averageAge = peopleData
    .reduce((ageSum, { born, died }) =>
      ageSum + (died - born), 0) / peopleData.length;

  return (averageAge);
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
  /* This function is looking if the .name of the element
  has been mentioned as a mother in other elements. */

  const isMother = function(momName, array) {
    return array.find(({ mother }) => mother === momName);
  };

  const women = people.filter(({ sex, name }) =>
    sex === 'f' && (!withChildren || isMother(name, people)));

  return calcAverage(women);
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
    return array.find(({ name }) => name === momName);
  };

  /* This function is looking for known .mothers in elements
  and if they exists as a names in other elements */

  const findRelatives = people.reduce((acc, person) => {
    const mother = findRelative(person.mother, people);

    if (mother && ((onlyWithSon) ? person.sex === 'm' : [])) {
      return [...acc, {
        ...person, motherBirth: mother.born,
      }];
    }

    return acc;
  }, []);

  const calcAverageAge = function(peopleArray) {
    const averageDifference = peopleArray
      .reduce((ageDifference, { motherBirth, born }) =>
        ageDifference + (born - motherBirth), 0) / peopleArray.length;

    return averageDifference;
  };

  return calcAverageAge(findRelatives);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
