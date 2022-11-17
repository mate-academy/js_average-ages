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

const isMale = (person) => person.sex === 'm';
const isFemale = (person) => person.sex === 'f';
const calculateAverage = (sumAges, array) => {
  return Math.round((sumAges / array.length) * 100) / 100;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) =>
    century
      ? isMale(person) && Math.ceil(person.died / 100) === century
      : isMale(person),
  );

  const sumAges = men.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  return calculateAverage(sumAges, men);
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
  const women = people.filter((person) =>
    withChildren
      ? isFemale(person) && people.some((child) => child.mother === person.name)
      : isFemale(person),
  );

  const sumAges = women.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );

  return calculateAverage(sumAges, women);
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
  const children = people.filter((child) =>
    onlyWithSon
      ? people.some((person) => person.name === child.mother && isMale(child))
      : people.some((person) => person.name === child.mother),
  );

  const totalAge = children.reduce((differenceSum, child) => {
    const mother = people.find((person) => person.name === child.mother);

    return differenceSum + (child.born - mother.born);
  }, 0);

  return calculateAverage(totalAge, children);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
