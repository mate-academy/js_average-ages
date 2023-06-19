'use strict';

function averageAgeCalculator(array) {
  return (
    array.reduce((sum, person) => sum + (person.died - person.born), 0)
      / array.length || 0
  );
}

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
  const men = people.filter((person) =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return averageAgeCalculator(men);
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter((person) =>
    withChildren
      ? people.some((peop) => person.name === peop.mother) && person.sex === 'f'
      : person.sex === 'f'
  );

  return averageAgeCalculator(women);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = onlyWithSon
    ? people.filter((person) => person.sex === 'm')
    : people;

  let length = 0;

  const sumOfAgeDiffs = children.reduce((sum, child) => {
    const mother = people.find((person) => person.name === child.mother);

    if (mother !== undefined) {
      length++;
    }

    return mother === undefined ? sum : sum + (child.born - mother.born);
  }, 0);

  return sumOfAgeDiffs / length || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
